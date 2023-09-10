<script setup>
import { computed, onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import threadApi from '../services/apis/backend/threadApi';
import { threadDate, timesAgo } from '../services/humanTime';
import NewCommentInput from '../components/NewCommentInput.vue';
import LikeDislikeThreadButton from '../components/LikeDislikeThreadButton.vue';
import PostCard from '../components/PostCard.vue';
import UserAvatarWithName from '../components/UserAvatarWithName.vue';

import {
	NSpace,
	NAvatar,
	NSpin,
	NDivider,
	NCard,
	useMessage,
	NButton
} from 'naive-ui';
import { useAuthStore } from '../stores/authStore';
import postApi from '../services/apis/backend/postApi';
import { onBeforeRouteLeave } from 'vue-router';

const props = defineProps(['slug']);
const authStore = useAuthStore();
const msg = useMessage();

const commentInputRef = ref(null);
const thread = ref({});
const posts = ref([]);
const isLoadingPost = ref(false);
const isLoadingThread = ref(false);
const threadChannel = computed(() => `comment-thread-${thread.value?.id}`);

function listenCommentBroadcast() {
	// listening to broadcast
	window.Echo.channel(threadChannel.value)
		.listen('NewCommentSent', (e) => {
			// console.log(e.post);
			pushPost(e.post);
		});
}

function leaveBroadcastChannel() {
	window.Echo.leaveChannel(threadChannel.value);
}



async function getThread() {
	try {
		isLoadingThread.value = true;
		const { data } = await threadApi.get(props.slug);
		thread.value = data;
		listenCommentBroadcast();
	} catch (error) {
		console.error(error);
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
	} catch (error) {
		msg.error('Failed retrieving comments');
	} finally {
		isLoadingPost.value = false;
	}
}

function pushPost(post) {
	if (post.level === 0) return posts.value.push(post);

	const topParentPostIndex = posts.value.findIndex(p => p.id == post.top_parent_post_id);
	if (post.level === 1) {
		return posts.value[topParentPostIndex].post_replies.push(post);
	}

	const parentPostIndex = posts.value[topParentPostIndex].post_replies.findIndex(p => p.id == post.parent_post_id);
	posts.value[topParentPostIndex].post_replies[parentPostIndex].post_replies.push(post);
}


// TODO: maybe delete this
function focusToCommentInput() {
	// console.log(commentInputRef.value);
	// commentInputRef.value.scrollIntoView();
}

onBeforeMount(() => {
	getThread();
	getThreadParentPosts();
});

onUnmounted(() => {
	leaveBroadcastChannel();
});

onBeforeRouteLeave(() => {
	leaveBroadcastChannel();
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
		<NSpace v-if="thread?.user"
			justify="space-between"
			class="mb-4">
			<UserAvatarWithName :user="thread?.user" />
			<span class="text-neutral-400">{{ timesAgo(thread?.created_at) }}</span>
		</NSpace>

		<!-- thread -->
		<h1 class="text-xl">{{ thread.title }}</h1>
		<p class="my-4 whitespace-pre-line">{{ thread.content }}</p>

		<!-- <pre>{{ thread }}</pre> -->

		<!-- lorem -->
		<div class="hidden">
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora natus at, qui delectus, minima praesentium iure
				est corrupti accusantium ab mollitia dignissimos voluptate explicabo odit deleniti repellendus atque nemo quae in
				perspiciatis, laborum molestiae. At corrupti sapiente optio voluptas, modi, quam culpa consequatur ipsam ut atque
				doloribus corporis ipsa iste in omnis reprehenderit ex quos provident eligendi officiis alias, rem tempora
				deserunt?
				Temporibus, modi accusamus! Ab cupiditate deleniti quaerat, eius iusto modi quasi accusantium aliquam itaque
				expedita ex minima nostrum totam non obcaecati quos perspiciatis consequatur. Consequuntur unde debitis fuga
				accusantium quibusdam quos! Repellat ipsam quisquam reprehenderit laborum animi, dolores saepe ullam voluptatem
				soluta, hic corporis laudantium numquam illo incidunt facilis id, blanditiis quae officiis vitae? Id, esse commodi
				alias animi optio eaque. Minus, molestias nesciunt perspiciatis earum dolore consequuntur cupiditate dolor animi
				dicta molestiae itaque, fugit voluptate recusandae beatae totam eius rerum. Accusantium aliquam consectetur
				dolore,
				voluptatibus iure nemo cum praesentium doloremque placeat libero totam repellendus veritatis quod distinctio ut
				id.
				Dolor odio, omnis, iste eius repellat blanditiis labore excepturi enim corrupti, soluta repellendus possimus.
				Quibusdam, officiis accusantium error, veniam in provident quae velit maxime voluptates amet debitis dicta
				repellendus! Pariatur facilis laborum perferendis doloribus maxime accusamus et cupiditate!</p>
		</div>


		<LikeDislikeThreadButton v-if="thread?.id"
			:thread="thread" />
		<!---->
	</div>
	<!--  -->

	<NDivider></NDivider>

	<!-- comment input -->
	<NewCommentInput class="mb-10"
		ref="commentInputRef"
		:threadId="thread.id"
		@created-new-post="pushPost"
		@comment-mode="focusToCommentInput" />
	<!--  -->

	<!-- comment section -->
	<div class="block text-center"
		v-show="isLoadingPost">
		<NSpin></NSpin>
	</div>

	<PostCard v-for="post in posts"
		:post="post" />
	<!--  -->

	<!-- bottom spacer -->
	<!-- <div class="my-[500px]"></div> -->
</template>