<script setup>
import {
	NButton,
	NCard,
	NAvatar,
	NSpace,
	useMessage,
} from 'naive-ui';
import { threadDate } from '../services/humanTime';
import LikeDislikePostButton from './LikeDislikePostButton.vue';
import { timesAgo } from '../services/humanTime';

const props = defineProps(['post', 'showAuthor']);

</script>

<template>
	<NCard :key="post.id"
		class="my-4"
		:bordered="false">
		<NSpace justify="space-between">
			<div class="flex items-center space-x-2">
				<NAvatar size="small"
					round></NAvatar>
				<span class="font-bold">user</span>
				<!-- <span v-if="showAuthor == true">user</span> -->
			</div>
			<span class="text-neutral-400">{{ timesAgo(post.updatedAt) }}</span>
		</NSpace>

		<p class="mt-4">
			{{ post.content }}
		</p>




		<template #footer>
			<NSpace justify="space-between">
				<LikeDislikePostButton :post="post" />
				<NButton>Reply</NButton>
			</NSpace>
		</template>
	</NCard>
</template>