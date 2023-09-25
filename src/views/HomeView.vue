<script setup>
import { onMounted, ref } from 'vue';
import threadApi from '../services/apis/backend/threadApi';
import { threadDate } from '../services/humanTime';
import ThreadCard from '../components/ThreadCard.vue';
import RightSidebarVue from '../components/HomeView/RightSidebar.vue';
import LeftSidebarVue from '../components/HomeView/LeftSidebar.vue';

import {
	NLayout,
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
		// console.log(data);
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

	<!-- container -->
	<div class="flex justify-center space-x-4">

		<!-- left -->
		<div class="hidden lg:block w-1/5 ">

			<NSpace vertical
				class="sticky top-4">
				<LeftSidebarVue />
			</NSpace>
		</div>

		<!-- center -->
		<div class="grow ">
			<ThreadCard v-for="thread in threads"
				:key="thread.id"
				:thread="thread"
				:showAuthor="true"
				:showSubForum="true && thread.sub_forum_id"
				class="mb-2" />
		</div>

		<!-- right -->
		<div class="hidden sm:block  w-1/4 ">
			<NSpace vertical
				class="sticky top-4">
				<RightSidebarVue />
				<!-- <RightSidebarVue v-for="i in 2" /> -->
			</NSpace>
		</div>



	</div>
</template>
