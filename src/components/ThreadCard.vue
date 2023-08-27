<script setup>
import {
	NButton,
	NCard,
	NSpace,
	useMessage,
	NAvatar,
} from 'naive-ui';
import { threadDate } from '../services/humanTime';
import UserAvatarWithName from '../views/UserAvatarWithName.vue';
import LikeDislikeThreadButton from './LikeDislikeThreadButton.vue';

const props = defineProps(['thread', 'showAuthor']);

</script>

<template>
	<NCard :key="thread.id"
		hoverable>
		<!-- user detail and time -->
		<NSpace v-if="thread?.user"
			justify="space-between"
			class="mb-4">

			<UserAvatarWithName :user="thread?.user" />

			<span class="text-neutral-400">{{ threadDate(thread?.created_at) }}</span>
		</NSpace>



		<NSpace class="mt-4">

			<RouterLink :to="{ name: 'thread.view', params: { slug: thread.slug } }"
				class="text-xl">
				{{ thread.title }}
			</RouterLink>
		</NSpace>




		<template #footer>
			<LikeDislikeThreadButton :thread="thread" />
		</template>
	</NCard>
</template>