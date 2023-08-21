<script setup>
import {
	NSpace,
	NButton,
} from 'naive-ui';
import { h, onBeforeMount, ref } from 'vue';
import { Icon } from '@iconify/vue';
import reactionApi from '../services/apis/backend/reactionApi';



const props = defineProps(['post']);
const postReactions = ref({
	likes: 0,
	dislikes: 0,
});

let reactions = [];

onBeforeMount(() => {
	reactions = props.post.post_reactions;
	// console.log(reactions);

	if (reactions.length) {
		reactions.forEach(r => {
			console.log(r);
		});
	} else {
		console.log('no reactions yet');
	}
});

function likeThisPost() {
	reactionApi.postReactions();
}

</script>


<template>
	<!-- likes/dislikes -->
	<NSpace class="text-neutral-400">
		<div class="transition hover:scale-110 ease-out">
			<NButton text
				:render-icon="() => h(Icon, { icon: 'ant-design:like-outlined' })">
				{{ post?.likes }}
			</NButton>
		</div>

		<div class="transition hover:scale-110 ease-out">
			<NButton text
				:render-icon="() => h(Icon, { icon: 'ant-design:like-outlined', verticalFlip: true })">
				{{ post?.dislikes }}
			</NButton>
		</div>

	</NSpace>
</template>