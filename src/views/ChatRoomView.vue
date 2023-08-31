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
	<NLayout position="absolute">

		<NLayoutContent position="absolute"
			:native-scrollbar="false"
			style="margin-bottom: 4rem;">
			<div class="p-4">
				<p v-for="i in 100"
					:class="i % 2 == 0 ? 'text-right' : null">content</p>
			</div>




		</NLayoutContent>

		<NLayoutFooter position="absolute">
			<MessageInput />
		</NLayoutFooter>
	</NLayout>
</template>