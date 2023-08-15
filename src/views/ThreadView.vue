<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import threadApi from '../services/apis/backend/threadApi';
import { threadDate } from '../services/humanTime';
import NewCommentInput from '../components/NewCommentInput.vue';
import LikeDislikeButton from '../components/LikeDislikeButton.vue';

import {
	NSpace,
	NAvatar,
	NDivider
} from 'naive-ui';
import { useAuthStore } from '../stores/authStore';

const props = defineProps(['id']);
const authStore = useAuthStore();

const thread = ref();

async function getThread() {
	const data = (await threadApi.get(props.id)).data;
	thread.value = data;
}

onBeforeMount(() => {
	getThread();
})


</script>

<template>
	<!-- user detail and time -->
	<NSpace justify="space-between"
		class="mb-4">
		<div class=" flex space-x-2 items-center text-neutral-400">
			<NAvatar src="/img/miku.jpg"
				fallback-src="/img/user-default.svg"
				size="small"
				role="button"
				round
				@click=""></NAvatar>
			<span>{{ authStore.user.name }}</span>
		</div>
		<span class="text-neutral-400">{{ threadDate(thread?.created_at) }}</span>
	</NSpace>

	<!-- thread -->
	<h1 class="text-xl">{{ thread?.title }}</h1>
	<p class="my-4">{{ thread?.content }}</p>
	<LikeDislikeButton :thread="thread" />
	<!---->

	<NDivider></NDivider>

	<!-- comment input -->
	<NewCommentInput />

	<!-- comments -->
</template>