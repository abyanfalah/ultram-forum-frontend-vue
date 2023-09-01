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
	// console.log(messages.value);
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
	<NLayout position="absolute">
		<NLayoutContent position="absolute"
			:native-scrollbar="false"
			style="margin-bottom: 4rem;">
			<div class="p-4">
				<MessageBubble v-for="message in messages"
					:message="message" />
			</div>
		</NLayoutContent>

		<NLayoutFooter position="absolute">
			<MessageInput @sent-new-message="pushNewMessage" />
		</NLayoutFooter>
	</NLayout>
</template>