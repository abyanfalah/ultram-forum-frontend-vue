import { useAuthStore } from "../../../stores/authStore";
import backendApi from "./api";
import axios from 'axios';
const api = backendApi;
const baseApiUrl = api.defaults.baseURL + "/api";
const url = baseApiUrl + "/image";
axios.defaults.withCredentials = true;

export default {
	getAll() {
		return api.get(url);
	},

	async get(subId) {
		return api.get(`${url}/${subId}`);
	},

	async getProfileImage(userId) {
		return api.get(`${url}/profile_pic/${userId}`);
	},

	async getCoverImage(userId) {
		return api.get(`${url}/cover_pic/${userId}`);
	},

	async store(sub) {
		return api.post(url, sub);
	},

	async uploadProfileImage(formData) {
		return api.post(`${url}/profile_pic`, formData);
	},

	async uploadCoverImage(formData) {
		return api.post(`${url}/cover_pic`, formData);
	},

	// retrieving
	profileImageEndpoint: (userId) => `${url}/profile_pic/${userId}?timestamp=${new Date().getTime()}`,
	coverImageEndpoint: (userId) => `${url}/cover_pic/${userId}?timestamp=${new Date().getTime()}`,



};