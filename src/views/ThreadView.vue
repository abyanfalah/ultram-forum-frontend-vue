<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import threadApi from '../services/apis/backend/threadApi';
import { threadDate } from '../services/humanTime';
import NewCommentInput from '../components/NewCommentInput.vue';
import LikeDislikeThreadButton from '../components/LikeDislikeThreadButton.vue';
import PostCard from '../components/PostCard.vue';

import {
	NSpace,
	NAvatar,
	NDivider,
	NCard
} from 'naive-ui';
import { useAuthStore } from '../stores/authStore';
import postApi from '../services/apis/backend/postApi';

const props = defineProps(['slug']);
const authStore = useAuthStore();

const thread = ref({});
const posts = ref([]);

async function getThread() {
	const data = (await threadApi.get(props.slug)).data;
	thread.value = data;
	console.log(thread.value);
}

async function getThreadPosts() {
	const data = (await postApi.getByThreadSlug(props.slug)).data;
	posts.value = data;
	// console.log(posts.value);
}

function pushPost(post) {
	posts.value.push(post);
}

onBeforeMount(() => {
	getThread();
	getThreadPosts();
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
	<h1 class="text-xl">{{ thread.title }}</h1>
	<p class="my-4">{{ thread.content }}</p>
	<LikeDislikeThreadButton v-if="thread?.id"
		:thread="thread" />
	<!---->

	<NDivider></NDivider>

	<!-- comment input -->
	<NewCommentInput class="mb-4"
		:threadId="thread.id"
		@created-new-post="pushPost" />

	<!-- comments -->
	<PostCard v-for="post in posts"
		:post="post" />
</template>