<script setup>
import { onMounted, ref } from 'vue';
import threadApi from '../services/apis/backend/threadApi';
import { threadDate } from '../services/humanTime';
import ThreadCard from '../components/ThreadCard.vue';

import {
	NCard,
	NSpace,
	NSpin,
	useLoadingBar,
	useMessage,
} from 'naive-ui';

const loading = useLoadingBar();
const msg = useMessage();

const threads = ref();
const isLoadingThreads = ref(false);


async function getAllThreads() {
	try {
		loading.start();
		isLoadingThreads.value = true;
		const data = (await threadApi.getAll()).data;
		threads.value = data;
		loading.finish();

	} catch (error) {
		loading.error();
		msg.error('Failed loading threads');
	} finally {
		isLoadingThreads.value = false;
	}

	// console.log(threads.value);
}




onMounted(() => {
	getAllThreads();
})


</script>

<template>
	<!-- <h1 class="text-3xl">Home</h1> -->

	<div class="block text-center">
		<NSpin v-show="isLoadingThreads"></NSpin>
	</div>

	<ThreadCard v-for="thread in threads"
		:key="thread.id"
		:thread="thread"
		:showAuthor="true"
		class="my-4" />
</template>
