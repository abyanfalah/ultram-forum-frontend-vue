import backendApi from "./api";
import axios from 'axios';
const api = backendApi;
const baseApiUrl = api.defaults.baseURL + "/api";
const url = baseApiUrl + "/react";

axios.defaults.withCredentials = true;

export default {

	async getThreadReactions(threadId) {
		await axios.get(`${api.defaults.baseURL}/sanctum/csrf-cookie`);
		return api.get(`${url}/thread/${threadId}`);
	},

	async threadReactions(threadId, isLiking) {
		await axios.get(`${api.defaults.baseURL}/sanctum/csrf-cookie`);
		return api.post(`${url}/thread`, { threadId, isLiking });
	},






};