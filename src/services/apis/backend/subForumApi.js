import backendApi from "./api";
import axios from 'axios';
const api = backendApi;
const baseApiUrl = api.defaults.baseURL + "/api";
const url = baseApiUrl + "/sub";

axios.defaults.withCredentials = true;

export default {
	getAll() {
		return api.get(url);
	},

	async get(subId) {
		return api.get(`${url}/${subId}`);
	},

	// async getByUserId(userId) {
	// 	return api.get(`${url}/user/${userId}`);
	// },

	async store(sub) {
		return api.post(url, sub);
	},

};