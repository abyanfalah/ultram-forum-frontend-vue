<script setup>
import {
	NButton,
	NCard,
	NSpace,
	useMessage,
	NAvatar,
} from 'naive-ui';
import { threadDate } from '../services/humanTime';
// import { Icon } from '@iconify/vue';
// import { h } from 'vue';
import LikeDislikeThreadButton from './LikeDislikeThreadButton.vue';

const props = defineProps(['thread', 'showAuthor']);

</script>

<template>
	<NCard :key="thread.id"
		hoverable>

		<!-- <template #header>
			<RouterLink :to="{ name: 'thread.view', params: { id: thread.id } }">
				{{ thread.title }}
			</RouterLink>
		</template> -->

		<NSpace justify="space-between">
			<div class=" flex space-x-2 items-center text-neutral-400">
				<NAvatar src="/img/miku.jpg"
					fallback-src="/img/user-default.svg"
					size="small"
					role="button"
					round
					@click=""></NAvatar>
				<span>{{ thread.user.name }}</span>
				<!-- <span v-if="showAuthor == true">user</span> -->
			</div>
			<span class="text-neutral-400">{{ threadDate(thread.created_at) }}</span>
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