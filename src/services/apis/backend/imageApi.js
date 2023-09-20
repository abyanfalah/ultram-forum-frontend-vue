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
		// console.log(formData);
		// return api.postForm(`${url}/profile_pic`, {
		// 	the_fucking_image: imageFile,
		// });
		return api.post(`${url}/profile_pic`, formData);
	},


	// profileImageUploadEndpoint: () => `${url}/profile_pic`,
	// coverImageUploadEndpoint: () => `${url}/cover_pic`,

	// retrieving
	profileImageEndpoint: (userId) => `${url}/profile_pic/${userId}?timestamp=${new Date().getTime()}`,
	coverImageEndpoint: (userId) => `${url}/cover_pic/${userId}?timestamp=${new Date().getTime()}`,



};