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

		<!-- user detail and time -->
		<NSpace v-if="thread?.user"
			justify="space-between"
			class="mb-4">

			<NButton text>
				<RouterLink :to="{
					name: 'profile',
					params: { username: thread?.user?.username }
				}"
					class=" flex space-x-2 items-center ">
					<NAvatar src="/img/miku.jpg"
						fallback-src="/img/user-default.svg"
						size="small"
						role="button"
						round
						@click=""></NAvatar>
					<span class="">{{ thread?.user?.name }}</span>

				</RouterLink>
			</NButton>



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