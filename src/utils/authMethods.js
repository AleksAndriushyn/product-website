import Api from './axiosInstance';

const authUrls = {
	loginUrl: 'auth/login',
	refreshUrl: 'auth/refresh',
	userProfileUrl: 'auth/user-profile',
	logoutUrl: 'auth/logout',
};

const sendRequest = async (url, data) => {
	return await Api.post(url, { ...data });
};

export const Auth = {
	login: async (data) => {
		return await sendRequest(authUrls.loginUrl, data);
	},

	refreshToken: async (data) => {
		return await sendRequest(authUrls.refreshUrl, data);
	},

	getUserInfo: async () => {
		return await Api.get(authUrls.userProfileUrl);
	},

	logout: async () => {
		return await Api.post(authUrls.logoutUrl);
	},
};
