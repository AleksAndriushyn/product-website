import React from 'react';
import { useProductsWithFilters } from '../../hooks/useProductsWithFilters';
import { Cookie } from '../../utils/Cookie';
import Spinner from '../common/Spinner';
import FilterForm from './FilterForm';
import Pagination from './Pagination';
import Product from './Product';

const Products = () => {
	const {
		products,
		isLoading,
		paginationData,
		page,
		filters,
		handleFiltersChange,
		filterProducts,
		setPage,
	} = useProductsWithFilters();

	if (isLoading) return <Spinner />;

	return (
		<div>
			{Cookie.get('token') ? (
				<>
					<FilterForm
						submitFunc={filterProducts}
						filters={filters}
						onChange={handleFiltersChange}
					/>
					<div className='products'>
						{products.length ? (
							products.map((product) => (
								<Product product={product} key={product.id} />
							))
						) : (
							<div className='tac'>No products found</div>
						)}
					</div>
					<Pagination
						currentPage={page}
						lastPage={paginationData?.last_page}
						setPage={setPage}
					/>
				</>
			) : (
				<h2 className='m10 tac'>Authorize first</h2>
			)}
		</div>
	);
};

export default Products;
