<script setup>
import { useDialog, useMessage } from 'naive-ui';
import { useChatStore } from '../stores/chatStore';
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import router from '../router';
import { onBeforeRouteLeave } from 'vue-router';
import conversationApi from '../services/apis/backend/conversationApi';
import messageApi from '../services/apis/backend/messageApi';
import MessageInput from '../components/MessageInput.vue';

const dialog = useDialog();
const msg = useMessage();
const chatStore = useChatStore();

const messages = ref([]);
// const conversation = ref();

function checkConversationId() {
	if (!chatStore.conversationId) {
		msg.error('Who are you trying to chat with?');
		chatStore.conversationId = null;
		router.replace({ name: 'chat.list' });
	}
}

async function getMessages() {
	try {
		const res = await messageApi.getConversationMessages();
		console.log(res);
		messages.value = res.data;
	} catch (error) {
		msg.error('Unable retrieving messages');
		console.error(error);
	}
}

onMounted(() => {
	checkConversationId();
	getMessages();

});

onUnmounted(() => {
	chatStore.conversationId = null;
});

onBeforeRouteLeave(() => {
	chatStore.conversationId = null;
})

</script>

<template>
	<!-- wrapper -->
	<div class="relative h-[90vh] bg-green-500">
		<!-- message displayer -->
		<div class="bg-blue-500">
			asdf
		</div>

		<div class="">
			<MessageInput />
		</div>
	</div>
</template>