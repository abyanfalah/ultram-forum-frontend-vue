import axios from "axios";
import backendApi from "./api";
import { useAuthStore } from "../../../stores/authStore";
import router from "../../../router";

const api = backendApi;
const url = api.defaults.baseURL;

export default {
	async checkAuth() {
		try {
			const res = await api.get(`${url}/api/userdata`);
			useAuthStore().user = res.data;
			// console.log(res);
			return true;
		} catch (err) {
			console.log('checkAuth: unauthorized');
			router.replace({ name: 'auth' });
			return false;
		}
	},

	async login(credential) {
		await axios.get(`${url}/sanctum/csrf-cookie`);
		return api.post(`${url}/login`, credential);
	},

	logout() {
		return api.post(`${url}/logout`);
	},

	register(credential) {
		return api.post(`${url}/register`, credential);
	},

	checkUsernameAvailability(username) {
		return api.post(`${url}/is-available-username`, { username });
	},

	checkEmailAvailability(email) {
		return api.post(`${url}/is-available-email`, { email });
	},

};