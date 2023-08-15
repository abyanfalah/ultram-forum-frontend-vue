import axios from 'axios';
// axios.defaults.withCredentials = true;

const baseURL = import.meta.env.VITE_BACKEND_API_URL;
const tokenURL = import.meta.env.VITE_BACKEND_API_TOKEN_URL;

const backendApi = axios.create({
	baseURL: baseURL,
	withCredentials: true,
});

// backendApi.interceptors.request.use(async () => {
// 	await axios.get(tokenURL);
// });

// backendApi.interceptors.request.use(async function () {
// 	axios.defaults.withCredentials = true;
// 	await axios.get(baseURL + '/sanctum/csrf-cookie');
// });

export default backendApi;