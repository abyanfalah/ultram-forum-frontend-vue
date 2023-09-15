import backendApi from "./api";
import axios from 'axios';
const api = backendApi;
const baseApiUrl = api.defaults.baseURL + "/api";
const url = baseApiUrl + "/subforum";

axios.defaults.withCredentials = true;

export default {
	getAll() {
		return api.get(url);
	},

	async get(subId) {
		return api.get(`${url}/${subId}`);
	},

	async getBySlug(slug) {
		return api.get(`${url}/${slug}`);
	},

	async getThreads(subForumId) {
		return api.get(`${url}/${id}/thread`);
	},

	async getThreadsBySlug(subForumSlug) {
		return api.get(`${url}/${subForumSlug}/thread`);
	},

	async getMembers(subForumId) {
		return api.get(`${url}/${id}/member`);
	},

	async store(sub) {
		return api.post(url, sub);
	},

	async toggleJoin(subForumId) {
		return api.post(`${url}/join`, { subForumId });
	}

};