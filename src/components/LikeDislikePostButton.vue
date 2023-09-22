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

	props.post.likes_count = reactionsCountData.likes_count;
	props.post.dislikes_count = reactionsCountData.dislikes_count;
	props.post.my_reaction = reactionsCountData.my_reaction;
}

onBeforeMount(() => {
	// getReactionsCount();
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
	<NSpin v-if="false"
		size="small" />

	<NSpace v-else
		class="text-neutral-400">
		<div class="transition hover:scale-110 ease-out">
			<NButton text
				@click="reactToPost(true)"
				:render-icon="() => h(Icon, { icon: (post.my_reaction?.is_liking === 1 ? 'ant-design:like-filled' : 'ant-design:like-outlined') })">
				{{ post.likes_count }}
			</NButton>
		</div>

		<div class="transition hover:scale-110 ease-out">
			<NButton text
				@click="reactToPost(false)"
				:render-icon="() => h(Icon, { icon: (post.my_reaction?.is_liking === 0 ? 'ant-design:like-filled' : 'ant-design:like-outlined'), verticalFlip: true })">
				{{ post.dislikes_count }}
			</NButton>
		</div>

	</NSpace>
</template>