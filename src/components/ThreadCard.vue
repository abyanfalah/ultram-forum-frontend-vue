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
import { useStore } from '../stores/store';
import { computed, onMounted } from 'vue';

const store = useStore();
const props = defineProps(['thread', 'showAuthor', 'showSubForum']);
const threadViewerRoute = computed(() => {
	if (props?.thread.sub_forum_id == null) {
		return { name: 'thread.view', params: { slug: props?.thread.slug } };
	}

	return {
		name: 'sub.thread.view',
		params: {
			threadSlug: props?.thread.slug,
			subSlug: props?.thread.sub_forum.slug
		}
	};
});


function setCurrentSubForum() {
	store.currentSubForum = Object.assign({}, props?.thread.sub_forum);
}

</script>

<template>
	<div>
		<NCard :key="thread.id"
			hoverable>
			<!-- user detail and time -->
			<NSpace v-if="thread?.user"
				justify="space-between"
				class="mb-4">

				<UserAvatarWithName :user="thread?.user" />

				<NSpace vertical
					align="end">
					<span class="ms-auto text-neutral-400">{{ timesAgo(thread?.created_at) }}</span>


				</NSpace>
			</NSpace>



			<NSpace class="mt-4">

				<RouterLink @click="thread.sub_forum_id ? setCurrentSubForum : null"
					:to="threadViewerRoute"
					class="text-xl">
					{{ thread.title }}
				</RouterLink>


			</NSpace>




			<template #footer>
				<NSpace align="center"
					justify="start">
					<LikeDislikeThreadButton :thread="thread" />
					<div class="transition hover:scale-110 ease-out">
						<NButton text
							@click="router.push({ name: 'thread.view', params: { slug: thread.slug } })"
							:render-icon="() => renderIcon('octicon:comment-24')">
							{{ thread.posts_count }}
						</NButton>
					</div>

					<p v-if="showSubForum">
						<!-- <p v-if="thread?.sub_forum_id && !hideSubForum"> -->
						posted on:
						<RouterLink :to="{
							name: 'sub.view',
							params: {
								slug: thread?.sub_forum.slug
							}
						}">
							<span :class="store.getHoverPrimaryBgColor"
								class="transition ease-out font-bold p-1 rounded">
								<span class="hidden">sub/</span>
								{{ thread.sub_forum.name }}</span>
						</RouterLink>
					</p>

				</NSpace>
			</template>
		</NCard>
	</div>
</template>