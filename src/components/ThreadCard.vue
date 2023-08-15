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
import LikeDislikeButton from './LikeDislikeButton.vue';

const props = defineProps(['thread']);

</script>

<template>
	<NCard :key="thread.id"
		class="my-4"
		hoverable>


		<template #header>
			<RouterLink :to="{ name: 'thread.view', params: { id: thread.id } }">
				{{ thread.title }}
			</RouterLink>

		</template>


		<template #footer>
			<NSpace justify="space-between">

				<!-- likes/dislikes -->
				<!-- <NSpace class="text-neutral-400">
					<div class="transition hover:scale-110 ease-out">
						<NButton text
							:render-icon="() => h(Icon, { icon: 'ant-design:like-outlined' })">
							{{ thread.likes }}
						</NButton>
					</div>

					<div class="transition hover:scale-110 ease-out">
						<NButton text
							:render-icon="() => h(Icon, { icon: 'ant-design:like-outlined', verticalFlip: true })">
							{{ thread.dislikes }}
						</NButton>
					</div>

				</NSpace> -->
				<LikeDislikeButton :thread="thread" />


				<!-- date -->
				<div>
					<span class="text-neutral-400">{{ threadDate(thread.created_at) }}</span>
				</div>
			</NSpace>
		</template>
	</NCard>
</template>