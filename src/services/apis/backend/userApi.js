import { useAuthStore } from "../../../stores/authStore";
import backendApi from "./api";
import axios from 'axios';
const api = backendApi;
const baseApiUrl = api.defaults.baseURL + "/api";
const url = baseApiUrl + "/user";
const authStore = useAuthStore();

axios.defaults.withCredentials = true;

export default {
	getAll() {
		return api.get(url);
	},

	getByUsername(username) {
		return api.get(`${url}/${username}`);
	},

	updateMyProfile(newData) {
		return api.put(`${url}/${authStore.user.id}`, newData);
	},








};