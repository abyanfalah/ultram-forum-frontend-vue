import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_API_URL;

const backendApi = axios.create({
	baseURL: baseURL,
	withCredentials: true,
});

// backendApi.interceptors.request.use(async function () {
// 	axios.defaults.withCredentials = true;
// 	await axios.get(baseURL + '/sanctum/csrf-cookie');
// });

export default backendApi;