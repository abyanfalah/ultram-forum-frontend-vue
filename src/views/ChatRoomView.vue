<script setup>
import { useDialog, useMessage } from 'naive-ui';
import { useChatStore } from '../stores/chatStore';
import { onBeforeMount, onMounted, onUnmounted } from 'vue';
import router from '../router';
import { onBeforeRouteLeave } from 'vue-router';


const dialog = useDialog();
const msg = useMessage();
const chatStore = useChatStore();


function checkConversationId() {
	// console.log(chatStore.conversationId);
	if (!chatStore.conversationId) {
		msg.error('Who are you trying to chat with?');
		chatStore.conversationId = null;
		router.replace({ name: 'chat.list' });
	}
}

onMounted(() => {
	checkConversationId();
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