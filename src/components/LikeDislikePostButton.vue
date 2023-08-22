<script setup>
import {
	NSpace,
	NButton,
	useMessage,
	NSpin,
} from 'naive-ui';
import { h, onBeforeMount, ref } from 'vue';
import { Icon } from '@iconify/vue';
import reactionApi from '../services/apis/backend/reactionApi';

const busy = ref(false);
const msg = useMessage();



const props = defineProps(['post']);
const postReactions = ref({
	likes: 0,
	dislikes: 0,
	userReaction: null,
});

let reactions = [];

function updateReactionsCount(reactionsCountData) {
	postReactions.value.likes = reactionsCountData.likes;
	postReactions.value.dislikes = reactionsCountData.dislikes;
	postReactions.value.userReaction = reactionsCountData.userReaction ?? null;

	// console.log(reactionsCountData);
	// console.log(postReactions.value);
}

async function getReactionsCount() {
	const { data } = await reactionApi.getPostReactions(props.post.id);
	const res = await reactionApi.getPostReactions(props.post.id);
	updateReactionsCount(data);
}

onBeforeMount(() => {
	getReactionsCount();
});

async function reactToPost(isLiking) {
	busy.value = true;
	try {
		const { data } = await reactionApi.submitPostReaction(props.post.id, isLiking);
		updateReactionsCount(data);
	} catch (err) {
		msg.error('Failed submitting reaction');
		console.error(err);
	}
	busy.value = false;
}

</script>


<template>
	<!-- likes/dislikes -->
	<NSpin v-if="busy"
		size="small" />

	<NSpace v-else
		class="text-neutral-400">
		<div class="transition hover:scale-110 ease-out">
			<NButton text
				@click="reactToPost(true)"
				:render-icon="() => h(Icon, { icon: (postReactions.userReaction === 1 ? 'ant-design:like-filled' : 'ant-design:like-outlined') })">
				{{ postReactions.likes }}
			</NButton>
		</div>

		<div class="transition hover:scale-110 ease-out">
			<NButton text
				@click="reactToPost(false)"
				:render-icon="() => h(Icon, { icon: (postReactions.userReaction === 0 ? 'ant-design:like-filled' : 'ant-design:like-outlined'), verticalFlip: true })">
				{{ postReactions.dislikes }}
			</NButton>
		</div>

	</NSpace>
</template>