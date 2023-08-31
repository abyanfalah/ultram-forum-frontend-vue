import backendApi from "./api";
import { useChatStore } from "../../../stores/chatStore";
const api = backendApi;
const baseApiUrl = api.defaults.baseURL + "/api";
const url = baseApiUrl + "/message";
const chatStore = useChatStore();

export default {
	getConversationMessages() {
		console.log('set conversationId to 1');
		chatStore.conversationId = 1;
		const conversationId = chatStore.conversationId;
		return api.get(`${url}/${conversationId}`);
	},

	sendMessage() {
		// console.log('set conversationId to 1');
		chatStore.conversationId = 1;
		const conversationId = chatStore.conversationId;
		return api.post(`${url}`, { conversationId });
	}

};