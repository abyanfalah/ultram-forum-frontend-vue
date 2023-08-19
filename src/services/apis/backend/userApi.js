import backendApi from "./api";
import axios from 'axios';
const api = backendApi;
const baseApiUrl = api.defaults.baseURL + "/api";
const url = baseApiUrl + "/user";

axios.defaults.withCredentials = true;

export default {
	// getAll() {
	// 	return api.get(url);
	// },









};