import backendApi from "./api";
import { useChatStore } from "../../../stores/chatStore";
const api = backendApi;
const baseApiUrl = api.defaults.baseURL + "/api";
const url = baseApiUrl + "/message";
const chatStore = useChatStore();

export default {
	getConversationMessages() {
		const conversationId = chatStore.conversationId;
		return api.get(`${url}/${conversationId}`);
	},

	sendMessage(message) {
		return api.post(`${url}`, message);
	}

};