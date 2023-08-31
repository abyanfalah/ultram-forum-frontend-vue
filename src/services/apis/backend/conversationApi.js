import axios from "axios";
import backendApi from "./api";
import { useAuthStore } from "../../../stores/authStore";
import router from "../../../router";
import { useChatStore } from "../../../stores/chatStore";
const api = backendApi;
const baseApiUrl = api.defaults.baseURL + "/api";
const url = baseApiUrl + "/conversation";
const chatStore = useChatStore();

export default {
	createNewConversation(participants) {
		return api.post(`${url}`, { participants });
	},

	getMyConversations() {
		return api.get(`${url}`);
	},


	getConversationMessages() {
		const conversationId = chatStore.conversationId;
		return api.get(`${url}/${conversationId}`);
	}




};