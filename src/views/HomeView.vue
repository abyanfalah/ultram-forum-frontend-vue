<script setup>
import { onMounted, ref } from 'vue';
import threadApi from '../services/apis/backend/threadApi';
import { NCard, NSpace } from 'naive-ui';
import { threadDate } from '../services/humanTime';
import ThreadCard from '../components/ThreadCard.vue';

const threads = ref();

async function getAllThreads() {
	const data = (await threadApi.getAll()).data;
	threads.value = data;
	// console.log(threads.value);
}




onMounted(() => {
	getAllThreads();
})


</script>

<template>
	<h1 class="text-3xl">Home</h1>

	<ThreadCard v-for="thread in threads"
		:key="thread.id"
		:thread="thread" />
</template>
