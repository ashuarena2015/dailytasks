/* global APP_URL */
import axios, { create } from 'axios';

export const config = {
	baseURL: 'http://localhost:4000'
};
const axiosInstance = create(config);

export const setupInterceptors = () => {
	axios.interceptors.response.use(
		response => response,
		(error) => {
			const { response: { status, data: { redirect_url } = {} } = {} } = error;

			if (status === 403) {
				if (redirect_url) window.location.replace(redirect_url);
				else window.location.reload();
			}

			return Promise.reject(error);
		}
	);
};

export default axiosInstance;
