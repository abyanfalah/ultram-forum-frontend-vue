import axios from "axios";
import backendApi from "./api";
const api = backendApi;
const url = api.defaults.baseURL;

export default {
	async checkAuth() {
		try {
			await api.get(`${url}/api/user`);
			return true;
		} catch (err) {
			// console.log('unauthorized');
			return false;
		}
	},

	async login(credential) {
		await axios.get(`${url}/sanctum/csrf-cookie`);
		return api.post(`${url}/login`, credential);
	},

	logout() {
		return api.post(`${url}/logout`);
	}

};