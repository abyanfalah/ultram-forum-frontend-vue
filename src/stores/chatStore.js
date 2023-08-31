import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import router from '../router';


export const useChatStore = defineStore(
	'chat',
	() => {

		const conversationId = ref(null);

		function goToConversation(convId) {
			conversationId.value = convId;
			router.push({ name: 'chat' });

		}


		return {
			conversationId,
			goToConversation,
		};
	},
	{
		persist: true
	}
);
