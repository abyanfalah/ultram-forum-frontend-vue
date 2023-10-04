import { useAuthStore } from "../../../stores/authStore";
import backendApi from "./api";
import axios from 'axios';
const api = backendApi;
const baseApiUrl = api.defaults.baseURL + "/api";
const url = baseApiUrl + "/test";

export default {
	test() {
		return api.get(url);
	}
};