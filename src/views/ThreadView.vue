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
	NSpin,
	NDivider,
	NCard,
	useMessage
} from 'naive-ui';
import { useAuthStore } from '../stores/authStore';
import postApi from '../services/apis/backend/postApi';

const props = defineProps(['slug']);
const authStore = useAuthStore();
const msg = useMessage();

const thread = ref({});
const posts = ref([]);
const isLoadingPost = ref(false);
const isLoadingThread = ref(false);

async function getThread() {
	try {
		isLoadingThread.value = true;
		const data = (await threadApi.get(props.slug)).data;
		thread.value = data;
	} catch (error) {
		msg.error('Failed retrieving thread');
	} finally {
		isLoadingThread.value = false;
	}
}

async function getThreadParentPosts() {
	try {
		isLoadingPost.value = true;
		const data = (await postApi.getParentByThreadSlug(props.slug)).data;
		posts.value = data;
		// console.log('posts value', posts.value);
	} catch (error) {
		msg.error('Failed retrieving comments');
	} finally {
		isLoadingPost.value = false;
	}
}

function pushPost(post) {
	posts.value.push(post);
}

onBeforeMount(() => {
	getThread();
	getThreadParentPosts();
})


</script>

<template>
	<!-- thread -->
	<div class="block text-center"
		v-show="isLoadingThread">
		<NSpin></NSpin>
	</div>

	<div>
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
	</div>
	<!--  -->

	<NDivider></NDivider>

	<!-- comment input -->
	<NewCommentInput class="mb-4"
		:threadId="thread.id"
		@created-new-post="pushPost" />
	<!--  -->

	<!-- comment section -->
	<div class="block text-center"
		v-show="isLoadingPost">
		<NSpin></NSpin>
	</div>

	<PostCard v-for="post in posts"
		:post="post" />
	<!--  -->
</template>