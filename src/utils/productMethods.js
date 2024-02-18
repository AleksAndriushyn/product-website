import Api, { baseURL } from './axiosInstance';

const productUrls = {
	productsUrl: 'products',
	productUrl: 'products/{id}',
};

export const Product = {
	getProducts: async (params) => {
		return await Api.get(baseURL + productUrls.productsUrl, { params });
	},
};
