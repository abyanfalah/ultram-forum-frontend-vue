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
import { replaceStep } from '@tiptap/pm/transform';

const msg = useMessage();

const props = defineProps(['thread']);
const busy = ref(false);


const threadReactions = ref({
	likes: 0,
	dislikes: 0,
});

let reactions = [];

function updateReactionsCount(reactionsCountData) {
	threadReactions.value.likes = reactionsCountData.likes;
	threadReactions.value.dislikes = reactionsCountData.dislikes;

	console.log(reactionsCountData);
}

async function getReactionsCount() {
	const { data } = await reactionApi.getThreadReactions(props.thread.slug);
	updateReactionsCount(data);

}


onBeforeMount(() => {
	getReactionsCount();
});


async function reactToThread(isLiking) {
	busy.value = true;
	try {

		const { data } = await reactionApi.submitThreadReaction(props.thread.id, isLiking);
		updateReactionsCount(data);
	} catch (err) {
		msg.error('Failed submitting reaction');
		console.error(err);
	}

	setTimeout(() => { busy.value = false; }, 500);
	// busy.value = false;
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