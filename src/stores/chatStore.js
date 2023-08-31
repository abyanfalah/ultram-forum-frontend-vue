import { ref, computed } from 'vue';
import { defineStore } from 'pinia';


export const useChatStore = defineStore(
	'chat',
	() => {
		const conversationId = ref(null);

		return {
			conversationId,
		};
	},
	{
		persist: true
	}
);
