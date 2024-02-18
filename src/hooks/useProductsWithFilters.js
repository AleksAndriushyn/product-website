import { useEffect, useState } from 'react';
import { Cookie } from '../utils/Cookie';
import { setValues } from '../utils/functions';
import { getProducts } from '../utils/services';

const defaultFilters = JSON.parse(
	localStorage.getItem('filters') ?? 'null'
) ?? {
	title: '',
	price_from: '',
	price_to: '',
	from: '',
	to: '',
};

const removeEmptyProperties = (obj) => {
	return Object.fromEntries(
		Object.entries(obj).filter(([key, value]) => {
			return value !== null && value !== undefined && value !== '';
		})
	);
};

export const useProductsWithFilters = () => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [paginationData, setPaginationData] = useState(null);
	const [page, setPage] = useState(1);
	const [filters, setFilters] = useState({
		...defaultFilters,
	});

	const getProductsWithParams = async () => {
		setIsLoading(true);
		try {
			const filtersData = removeEmptyProperties(filters);
			const data = {
				...filtersData,
				...(page > 1 ? { page } : {}),
			};
			const response = await getProducts(data);
			if (response.data.data.length) {
				setProducts(response.data.data);
			} else {
				setProducts([]);
			}
			setPaginationData(response.data);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const filterProducts = (e) => {
		e.preventDefault();
		if (page !== 1) {
			setPage(1);
		} else {
			getProductsWithParams();
		}
		localStorage.setItem('filters', JSON.stringify(filters));
	};

	useEffect(() => {
		if (Cookie.get('token')) {
			getProductsWithParams();
		}
	}, [page]);

	const handleFiltersChange = (e) => {
		setValues(setFilters, e.target.name, e.target.value);
	};

	return {
		products,
		isLoading,
		paginationData,
		page,
		filters,
		handleFiltersChange,
		filterProducts,
		setPage,
	};
};
