import axios from "axios";
import backendApi from "./api";
import { useAuthStore } from "../../../stores/authStore";
import router from "../../../router";
const api = backendApi;
const baseApiUrl = api.defaults.baseURL + "/api";
const url = baseApiUrl + "/conversation";

export default {
	createNewConversation(participants) {
		return api.post(`${url}`, { participants });
	},

	getMyConversations() {
		return api.get(`${url}`);
	},




};