<script setup>
import { onMounted, ref } from 'vue';
import conversationApi from '../services/apis/backend/conversationApi';
import ConversationCard from '../components/ConversationCard.vue';
import { NSpace } from 'naive-ui';
import { useChatStore } from '../stores/chatStore';
const conversations = ref();
const chatStore = useChatStore();

async function getConversations() {
	const { data } = await conversationApi.getMyConversations();
	conversations.value = data;
}



onMounted(() => {
	getConversations();
});
</script>

<template>
	<div class="max-w-screen-md mx-auto">
		<ConversationCard v-for="conversation in conversations"
			:conversation="conversation"
			:key="conversation.id"
			role="button"
			@click="() => chatStore.goToConversation(conversation.id)" />
	</div>
</template>