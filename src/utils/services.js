import { Cookie } from './Cookie';
import { Auth } from './authMethods';
import { Product } from './productMethods';

const token = Cookie.get('token');

export const login = async (data) => {
	const responseUserData = await Auth.login(data);
	Cookie.saveAccessToken(responseUserData.data);
	return responseUserData;
};

export const refreshToken = async () => {
	const response = await Auth.refreshToken({
		token,
	});
	Cookie.saveAccessToken(response.data);
	return response;
};

export const getUserInfo = async () => {
	return await Auth.getUserInfo();
};

export const logout = async () => {
	await Auth.logout();
	Cookie.deleteCookie('token');
	localStorage.removeItem('filters');
};

export const getProducts = async (params) => {
	return await Product.getProducts(params);
};
