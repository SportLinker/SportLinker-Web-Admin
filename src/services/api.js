import axios from 'axios';
import {toast} from 'react-toastify';

const API = 'http://localhost:8080/v1/api';
// const API_URL = 'https://6531f3964d4c2e3f333d6d0e.mockapi.io/';
let accessToken =
	localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).token.accessToken;

let refreshToken =
	localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).token.refreshToken;

let userId = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).user.id;

// export const api_mockoi = axios.create({
// 	baseURL: API_URL,
// });
export const api = axios.create({
	baseURL: API,
	headers: {
		authentication: accessToken,
		'x-client-id': userId,
		refresh: refreshToken,
	},
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
