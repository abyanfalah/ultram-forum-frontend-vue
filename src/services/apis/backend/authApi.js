import axios from "axios";
import backendApi from "./api";
import { useAuthStore } from "../../../stores/authStore";
const api = backendApi;
const url = api.defaults.baseURL;

export default {
	async checkAuth() {
		try {
			const res = await api.get(`${url}/api/user`);
			useAuthStore().user = res.data;
			// console.log(res);
			return true;
		} catch (err) {
			console.log('checkAuth: unauthorized');
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


};