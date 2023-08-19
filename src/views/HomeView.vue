<script setup>
import { onMounted, ref } from 'vue';
import threadApi from '../services/apis/backend/threadApi';
import { threadDate } from '../services/humanTime';
import ThreadCard from '../components/ThreadCard.vue';

import {
	NCard,
	NSpace,
	useLoadingBar,
} from 'naive-ui';

const loading = useLoadingBar();

const threads = ref();

async function getAllThreads() {
	try {
		loading.start();
		const data = (await threadApi.getAll()).data;
		threads.value = data;
		loading.finish();

	} catch (error) {
		loading.error();
	}
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
		:thread="thread"
		class="my-4" />
</template>
