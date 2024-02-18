import axios from 'axios';
import { refreshToken } from './services';
import { Cookie } from './Cookie';

export const baseURL = 'https://dummy-api.d0.acom.cloud/api/';

const Api = axios.create({
	baseURL,
	headers: {
		Authorization: `Bearer ${Cookie.get('token')}`,
	},
});

Api.interceptors.request.use(
	(config) => {
		if (Cookie.get('token')) {
			config.headers.Authorization = `Bearer ${Cookie.get('token')}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

Api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry && Cookie.get('token')) {
			originalRequest._retry = true;

			try {
				const response = await refreshToken();
				const { access_token } = response.data;

				originalRequest.headers.Authorization = `Bearer ${access_token}`;
				return axios(originalRequest);
			} catch (error) {
				console.log(error);
			}
		}

		return Promise.reject(error);
	}
);

export default Api;
