<script setup>
import { NButton, NSpace, NTabPane, NTabs } from 'naive-ui';
import { useAuthStore } from '../stores/authStore';
import { useStore } from '../stores/store';
import renderIcon from '../services/renderIcon';
import { computed, onMounted, ref } from 'vue';
import threadApi from '../services/apis/backend/threadApi';
import postApi from '../services/apis/backend/postApi';
import ThreadCard from '../components/ThreadCard.vue';

const authStore = useAuthStore();
const store = useStore();
const user = authStore.user;

const myThreads = ref([]);
const myPosts = ref([]);

onMounted(async () => {
	myThreads.value = (await threadApi.getByUserId(user.id)).data;
	myPosts.value = (await postApi.getByUserId(user.id)).data;

	// console.log('threads', myThreads.value);
	console.log('posts', myPosts.value);
});
</script>

<template>
	<!-- cover image -->
	<div class="relative mb-[5rem]">
		<img class="w-full h-[30%] object-cover rounded"
			src="/img/cover/default.jpg"
			alt="">

		<div class="absolute -bottom-[3rem] w-full  flex justify-start px-4">
			<div class="rounded-full overflow-clip p-[4px] transition ease-out duration-500"
				:class="[store.isBrightTheme ? 'bg-white' : 'bg-dark']">
				<img src="/img/miku.jpg"
					class=" w-[8rem] h-[8rem] rounded-full object-cover"
					alt="">
				<!-- <div class="  w-[8rem] h-[8rem] "></div> -->
			</div>

		</div>

	</div>


	<NSpace justify="space-between">
		<p class="text-2xl">{{ user.name }}</p>

		<!-- profile btns -->
		<div>
			<NButton :render-icon="() => renderIcon('fe:edit')">Edit profile</NButton>
		</div>
	</NSpace>

	<!-- thread / post history -->

	<NTabs animated>
		<NTabPane name="Threads">

			<NSpace v-if="myThreads.length < 1">
				You haven't make any thread yet...
			</NSpace>

			<ThreadCard v-else
				v-for="thread in myThreads"
				:key="thread.id"
				:thread="thread"
				class="my-4" />

		</NTabPane>

		<NTabPane name="Posts">

			<NSpace v-if="myPosts.length < 1">
				You haven't make any post yet...
			</NSpace>

			<div v-else>
				you got a post
			</div>

		</NTabPane>
	</NTabs>
</template>