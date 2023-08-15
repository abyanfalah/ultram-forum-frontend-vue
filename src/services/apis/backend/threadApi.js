import backendApi from "./api";
import axios from 'axios';
const api = backendApi;
const baseApiUrl = api.defaults.baseURL + "/api";
const url = baseApiUrl + "/thread";
const categoryEndpoint = baseApiUrl + "/category";

axios.defaults.withCredentials = true;

export default {
	getAll() {
		return api.get(url);
	},
	async get(threadId) {
		await axios.get(`${api.defaults.baseURL}/sanctum/csrf-cookie`);
		return api.get(`${url}/${threadId}`);
	},

	async store(thread) {
		await axios.get(`${api.defaults.baseURL}/sanctum/csrf-cookie`);
		return api.post(url, thread);
	},

	async getAllCategories() {
		return api.get(categoryEndpoint);

	},

};