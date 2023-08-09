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
	login(credential) {
		return api.post(`${url}/login`, credential);
	}
};