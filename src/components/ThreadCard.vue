<script setup>
import {
	NButton,
	NCard,
	NSpace,
	useMessage,
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
			<div>
				<span>user</span>
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