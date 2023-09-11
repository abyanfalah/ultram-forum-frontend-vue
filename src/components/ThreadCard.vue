<script setup>
import {
	NButton,
	NCard,
	NSpace,
	useMessage,
	NAvatar,
} from 'naive-ui';
import { threadDate, timesAgo } from '../services/humanTime';
import UserAvatarWithName from '../components/UserAvatarWithName.vue';
import LikeDislikeThreadButton from './LikeDislikeThreadButton.vue';
import renderIcon from '../services/renderIcon';
import router from '../router';

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

			<span class="text-neutral-400">{{ timesAgo(thread?.created_at) }}</span>
		</NSpace>



		<NSpace class="mt-4">

			<RouterLink :to="{ name: 'thread.view', params: { slug: thread.slug } }"
				class="text-xl">
				{{ thread.title }}
			</RouterLink>
		</NSpace>




		<template #footer>
			<NSpace align="center">
				<LikeDislikeThreadButton :thread="thread" />
				<div class="transition hover:scale-110 ease-out">
					<NButton text
						@click="router.push({ name: 'thread.view', params: { slug: thread.slug } })"
						:render-icon="() => renderIcon('octicon:comment-24')">
						{{ thread.posts_count }}
					</NButton>
				</div>

			</NSpace>
		</template>
	</NCard>
</template>