<script setup>
import {
	NButton,
	NCard,
	NAvatar,
	NSpace,
	useMessage,
} from 'naive-ui';
import { threadDate, timesAgo } from '../services/humanTime';
import LikeDislikePostButton from './LikeDislikePostButton.vue';
import UserAvatar from './UserAvatar.vue';


const props = defineProps(['post', 'showAuthor']);

</script>

<template>
	<NCard :key="post.id"
		class="my-4"
		:bordered="false">
		<NSpace justify="space-between">
			<div class="flex items-center space-x-2">
				<UserAvatar :user="post.user" />
				<span class="font-bold">{{ post.user.name }}</span>
			</div>
			<span class="text-neutral-400">{{ threadDate(post.updated_at) }}</span>
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