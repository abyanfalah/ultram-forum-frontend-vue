<script setup>
import {
	NLayout,
	NLayoutContent,
	NLayoutFooter,
	useDialog,
	useMessage,
} from 'naive-ui';
import { useChatStore } from '../stores/chatStore';
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import router from '../router';
import { onBeforeRouteLeave } from 'vue-router';
import conversationApi from '../services/apis/backend/conversationApi';
import messageApi from '../services/apis/backend/messageApi';
import MessageInput from '../components/MessageInput.vue';
import { useAuthStore } from '../stores/authStore';
import MessageBubble from '../components/MessageBubble.vue';


const dialog = useDialog();
const msg = useMessage();
const chatStore = useChatStore();
const authStore = useAuthStore();

const messages = ref([]);
// const conversation = ref();
const conversationChannel = `conversation-${chatStore.conversationId}`;


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
		// console.log(res);
		messages.value = res.data;
	} catch (error) {
		msg.error('Unable retrieving messages');
		console.error(error);
	}
}

function pushNewMessage(message) {
	messages.value.push(message);
	// console.log(messages.value);`
}
onMounted(() => {
	checkConversationId();
	getMessages();

	console.log({
		conversationChannel,
		convId: chatStore.conversationId,
	});

	window.Echo.channel(conversationChannel)
		.listen('MessageSent', (e) => {
			// console.clear();
			console.log(e);
			pushNewMessage(e.message);
		});

	// window.Echo.channel('message-sent')
	// 	.listen('MessageSent', (e) => {
	// 		console.log(e);
	// 		pushNewMessage(e.message);
	// 	});
});

onUnmounted(() => {
	leaveChatRoom();
});

onBeforeRouteLeave(() => {
	leaveChatRoom();
});

function leaveChatRoom() {
	chatStore.conversationId = null;
	window.Echo.leaveChannel(conversationChannel);
	// window.Echo.leaveChannel('message-sent');
}



</script>

<template>
	<NLayout position="absolute">
		<NLayoutContent position="absolute"
			:native-scrollbar="false"
			style="margin-bottom: 4rem;">
			<div class="p-4">

				<MessageBubble v-if="messages.length"
					v-for="message in messages"
					:message="message" />

				<div v-else>
					<p class="mx-auto block text-center text-neutral-500">You haven't talk to this guy just yet.</p>
					<p class="mx-auto block text-center text-neutral-500">Try to say hi...</p>
					<p class="mx-auto block text-center text-neutral-500">(i mean, why not?)</p>
				</div>

			</div>
		</NLayoutContent>

		<NLayoutFooter position="absolute">
			<MessageInput @sent-new-message="pushNewMessage" />
		</NLayoutFooter>
	</NLayout>
</template>