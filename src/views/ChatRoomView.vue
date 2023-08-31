<script setup>
import { useDialog, useMessage } from 'naive-ui';
import { useChatStore } from '../stores/chatStore';
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import router from '../router';
import { onBeforeRouteLeave } from 'vue-router';
import conversationApi from '../services/apis/backend/conversationApi';


const dialog = useDialog();
const msg = useMessage();
const chatStore = useChatStore();

const messages = ref([]);
const conversation = ref();

function checkConversationId() {
	if (!chatStore.conversationId) {
		msg.error('Who are you trying to chat with?');
		chatStore.conversationId = null;
		router.replace({ name: 'chat.list' });
	}
}

async function getConversations() {
	try {
		const res = conversationApi.getConversationMessages();
		console.log(res);
	} catch (error) {

	}
}

onMounted(() => {
	checkConversationId();
	getConversations();

});

onUnmounted(() => {
	chatStore.conversationId = null;
});

onBeforeRouteLeave(() => {
	chatStore.conversationId = null;
})

</script>

<template>
	chat room
</template>