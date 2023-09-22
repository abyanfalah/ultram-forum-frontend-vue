<script setup>
import {
	NButton,
	NLayout,
	NLayoutContent,
	NLayoutFooter,
	useDialog,
	useMessage,
	NSpin,
	NSpace,
} from 'naive-ui';
import { useChatStore } from '../stores/chatStore';
import { computed, nextTick, onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
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
const messageContainerRef = ref(null);
const nLayoutContentRef = ref();
const busy = ref(false);

const messages = ref([]);
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
		// busy.value = true;
		const res = await messageApi.getConversationMessages();
		// console.log(res);
		messages.value = res.data;

	} catch (error) {
		msg.error('Unable retrieving messages');
		console.error(error);
	} finally {
		setTimeout(() => {
			scrollToBottom();
		}, 0);
		// busy.value = false;
	}
}

function pushNewMessage(message) {
	messages.value.push(message);
	scrollToBottom();
}

function scrollToBottom(isSmooth) {
	nLayoutContentRef.value.scrollTo({ top: messageContainerRef.value.scrollHeight + 1000, behavior: isSmooth ? 'smooth' : 'auto' });
}

onMounted(() => {
	checkConversationId();
	getMessages();

	// console.clear();
	// console.log(nLayoutContentRef.value);


	// listening to broadcast
	window.Echo.channel(conversationChannel)
		.listen('MessageSent', (e) => {
			pushNewMessage(e.message);
		});

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
	<NLayout class="mx-auto max-w-4xl"
		position="absolute">
		<NLayoutContent position="absolute"
			:native-scrollbar="false"
			ref="nLayoutContentRef"
			style="margin-bottom: 4rem;">

			<!-- <NSpace justify="center"
				align="center"
				class="h-[80vh]"
				v-show="false">
				<NSpin></NSpin>
			</NSpace> -->

			<!-- messages container -->
			<div v-show="!busy"
				class="px-4 pt-4 pb-14"
				ref="messageContainerRef">

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