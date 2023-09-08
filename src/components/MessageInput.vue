<script setup>
import {
	NButton,
	NInput,
	useMessage
} from 'naive-ui';
import renderIcon from '../services/renderIcon';
import { ref } from 'vue';
import { useChatStore } from '../stores/chatStore';
import { useAuthStore } from '../stores/authStore';
import messageApi from '../services/apis/backend/messageApi';

const msg = useMessage();
const emits = defineEmits(['sentNewMessage']);
const chatStore = useChatStore();
const authStore = useAuthStore();
const message = ref('');
let id = 0;
async function sendMessage() {
	if (!message.value) return msg.info("Bruh at least say something...");

	try {

		const newMessage = {
			conversation_id: chatStore.conversationId,
			user_id: authStore.myId,
			content: message.value,
		};

		// send mesage to server
		const res = await messageApi.sendMessage(newMessage);
		// console.log(res);

		// emit disabled. new message retrieved from broadcast instead
		// emits('sentNewMessage', newMessage);
		message.value = '';
	} catch (error) {
		msg.error('Failed sending your message');
		console.error(error);
	}

}


function handleKeydown(evt) {
	const isPressedEnter = evt.keyCode === 13;
	if (isPressedEnter) return sendMessage();
}
</script>

<template>
	<div class="flex items-center justify-between space-x-2 p-4 w-full">

		<NInput v-model:value="message"
			@keydown="handleKeydown"
			placeholder="Type your message here"></NInput>

		<NButton type="primary"
			:disabled="false"
			@click="sendMessage"
			:render-icon="() => renderIcon('fe:paper-plane')">Send</NButton>

	</div>
</template>