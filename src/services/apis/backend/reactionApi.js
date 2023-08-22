import backendApi from "./api";
import axios from 'axios';
const api = backendApi;
const baseApiUrl = api.defaults.baseURL + "/api";
const url = baseApiUrl + "/react";

axios.defaults.withCredentials = true;

export default {

	async getThreadReactions(threadSlug) {
		await axios.get(`${api.defaults.baseURL}/sanctum/csrf-cookie`);
		return api.get(`${url}/thread/${threadSlug}`);
	},

	async submitThreadReaction(threadId, isLiking) {
		await axios.get(`${api.defaults.baseURL}/sanctum/csrf-cookie`);
		return api.post(`${url}/thread`, { threadId, isLiking });
	},

	async getPostReactions(postId) {
		await axios.get(`${api.defaults.baseURL}/sanctum/csrf-cookie`);
		return api.get(`${url}/post/${postId}`);
	},

	async submitPostReaction(postId, isLiking) {
		await axios.get(`${api.defaults.baseURL}/sanctum/csrf-cookie`);
		return api.post(`${url}/post`, { postId, isLiking });
	},






};