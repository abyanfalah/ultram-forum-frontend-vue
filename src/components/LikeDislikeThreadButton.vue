<script setup>
import {
	NSpace,
	NButton,
	NSpin,
	useMessage
} from 'naive-ui';
import { computed, h, onBeforeMount, onMounted, ref } from 'vue';
import { Icon } from '@iconify/vue';
import reactionApi from '../services/apis/backend/reactionApi';

const msg = useMessage();

const props = defineProps(['thread']);
const busy = ref(false);


function updateReactionsCount(reactionsCountData) {
	props.thread.likes_count = reactionsCountData.likes_count;
	props.thread.dislikes_count = reactionsCountData.dislikes_count;
	props.thread.my_reaction = reactionsCountData.my_reaction;
}




onBeforeMount(() => {
	// getReactionsCount();
	// console.log(props.thread);
});


async function reactToThread(isLiking) {
	try {
		busy.value = true;
		const { data } = await reactionApi.submitThreadReaction(props.thread.id, isLiking);
		// console.log('thisss', data);
		updateReactionsCount(data);
	} catch (err) {
		msg.error('Failed submitting reaction');
		console.error(err);
	} finally {
		busy.value = false;
	}
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
				@click="reactToThread(true)"
				:render-icon="() => h(Icon, { icon: (thread.my_reaction?.is_liking === 1 ? 'ant-design:like-filled' : 'ant-design:like-outlined') })">
				{{ thread.likes_count }}
			</NButton>
		</div>

		<div class="transition hover:scale-110 ease-out">
			<NButton text
				@click="reactToThread(false)"
				:render-icon="() => h(Icon, { icon: (thread.my_reaction?.is_liking === 0 ? 'ant-design:like-filled' : 'ant-design:like-outlined'), verticalFlip: true })">
				{{ thread.dislikes_count }}
			</NButton>
		</div>

	</NSpace>
</template>