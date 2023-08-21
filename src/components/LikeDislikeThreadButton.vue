<script setup>
import {
	NSpace,
	NButton,
	NSpin,
	useMessage
} from 'naive-ui';
import { h, onBeforeMount, onMounted, ref } from 'vue';
import { Icon } from '@iconify/vue';
import reactionApi from '../services/apis/backend/reactionApi';

const msg = useMessage();

const props = defineProps(['thread']);
const busy = ref(false);


const threadReactions = ref({
	likes: 0,
	dislikes: 0,
});

let reactions = [];

onBeforeMount(() => {
	reactions = props.thread.thread_reactions;
	// console.log(reactions);

	if (reactions.length) {
		reactions.forEach(r => {
			r.is_liking ? threadReactions.value.likes++ : threadReactions.value.dislikes++;
		});
	} else {
		console.log('no reactions yet');
	}
});


async function reactToThread(isLiking) {
	busy.value = true;
	try {
		const reactionResponse = (await reactionApi.threadReactions(props.thread.id, isLiking)).data;

		if (reactionResponse == 'stored') {
			return isLiking ? threadReactions.value.likes++ : threadReactions.value.dislikes++;
		}

		if (reactionResponse == 'updated') {
			if (isLiking) { threadReactions.value.likes++; threadReactions.value.dislikes--; }
		}


	} catch (err) {
		msg.error('Failed submitting reaction');
		console.error(err);
	}
	busy.value = false;
}

</script>

<template>
	<!-- likes/dislikes -->
	<NSpace class="text-neutral-400">
		<div class="transition hover:scale-110 ease-out">
			<NSpin v-if="busy" />

			<NButton v-else
				text
				@click="reactToThread(true)"
				:render-icon="() => h(Icon, { icon: 'ant-design:like-outlined' })">
				{{ threadReactions.likes }}
			</NButton>
		</div>

		<div class="transition hover:scale-110 ease-out">
			<NButton text
				@click="reactToThread(false)"
				:render-icon="() => h(Icon, { icon: 'ant-design:like-outlined', verticalFlip: true })">
				{{ threadReactions.dislikes }}
			</NButton>
		</div>

	</NSpace>
</template>