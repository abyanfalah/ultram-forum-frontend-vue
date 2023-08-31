<script setup>
import { onMounted, ref } from 'vue';
import conversationApi from '../services/apis/backend/conversationApi';

const conversations = ref();


async function getConversations() {
	const { data } = await conversationApi.getMyConversations();
	const convs = data;
	console.log(convs);

	const a = convs.map((conv) => {

	});
	console.log(a);



}

onMounted(() => {
	getConversations();



});
</script>

<template>
	<p v-for="con in conversations">
		{{ con }}
	</p>
</template>