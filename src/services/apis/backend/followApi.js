import { useAuthStore } from "../../../stores/authStore";
import backendApi from "./api";
import axios from 'axios';
const api = backendApi;
const baseApiUrl = api.defaults.baseURL + "/api";
const url = baseApiUrl + "/follow";
const authStore = useAuthStore();

axios.defaults.withCredentials = true;

export default {
	followByUserId(followeeId) {
		return api.post(`${url}`, { followeeId });
	},
};