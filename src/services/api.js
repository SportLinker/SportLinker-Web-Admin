import axios from 'axios';
import {toast} from 'react-toastify';

const API = 'http://localhost:8080/v1/api';
// let accessToken =
// 	localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).accessToken;
// let refreshToken =
// 	localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).refreshToken;
// let email = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).userMail;

export const api_mockoi = axios.create({
	baseURL: API_URL,
});
export const api = axios.create({
	baseURL: API,
	// headers: {
	// 	'x-authentication': accessToken,
	// 	'x-api-email': email,
	// 	'x-refresh-token': refreshToken,
	// },
});

// Axios response interceptor to handle token expiration and renewal
// api.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	async (error) => {
// 		if (error.response.status === 401) {
// 			console.log('401 error');
// 			window.location.href = '/login';
// 		}
// 		if (error.response.status === 403) {
// 			console.log('403 error');
// 			window.location.href = '/permission-denied';
// 			toast.error('403 error');
// 		}
// 		return Promise.reject(error);
// 	}
// );
