import axios from 'axios';

const backendApi = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_API_URL,
	withCredentials: true,
});

export default backendApi;