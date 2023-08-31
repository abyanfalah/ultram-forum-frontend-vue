<script setup>
import { useDialog, useMessage } from 'naive-ui';
import { useChatStore } from '../stores/chatStore';
import { onBeforeMount, onMounted } from 'vue';
import router from '../router';
import { onBeforeRouteLeave } from 'vue-router';


const dialog = useDialog();
const msg = useMessage();
const chatStore = useChatStore();


function checkConversationId() {
	if (!chatStore.conversationId) {
		msg.error('Who are you trying to chat with?');
		chatStore.conversationId = null;
		router.replace({ name: 'home' });
	}
}

onMounted(() => {
	checkConversationId();
});

onBeforeRouteLeave(() => {
	// chatStore.conversationId = null;
})

</script>

<template>
	chat room
</template>