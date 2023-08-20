import backendApi from "./api";
import axios from 'axios';
const api = backendApi;
const baseApiUrl = api.defaults.baseURL + "/api";
const url = baseApiUrl + "/post";

axios.defaults.withCredentials = true;

export default {
	getAll() {
		return api.get(url);
	},

	async get(postId) {
		await axios.get(`${api.defaults.baseURL}/sanctum/csrf-cookie`);
		return api.get(`${url}/${postId}`);
	},

	async getByUserId(userId) {
		await axios.get(`${api.defaults.baseURL}/sanctum/csrf-cookie`);
		return api.get(`${url}/user/${userId}`);
	},

	async store(post) {
		await axios.get(`${api.defaults.baseURL}/sanctum/csrf-cookie`);
		return api.post(url, post);
	},

	async getAllCategories() {
		return api.get(categoryEndpoint);

	},

};