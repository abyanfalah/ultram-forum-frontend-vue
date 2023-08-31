import axios from 'axios';
import router from '../../../router';
import { useAuthStore } from '../../../stores/authStore';

const baseURL = import.meta.env.VITE_BACKEND_API_URL;
// const tokenURL = import.meta.env.VITE_BACKEND_API_TOKEN_URL;

const backendApi = axios.create({
	baseURL: baseURL,
	withCredentials: true,
});


backendApi.interceptors.response.use(
	res => {
		// console.log('interceptors: ', res);
		return res;
	},
	res => {
		// console.log('interceptors failed: ', res);
		const authStore = useAuthStore();
		if (authStore.isLogin && res.response.status == 401) {
			authStore.clientSideLogout();
			return res;
		}
	}
);

export default backendApi;