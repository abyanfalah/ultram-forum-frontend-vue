<script setup>
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import {
	NButton,
	NCard,
	NAvatar,
	NDivider,
	NSpace,
	useMessage,
	useDialog,
	pProps,
} from 'naive-ui';
import { threadDate, timesAgo } from '../services/humanTime';
import LikeDislikePostButton from './LikeDislikePostButton.vue';
import UserAvatar from './UserAvatar.vue';
import CommentReplyInput from './CommentReplyInput.vue';
import renderIcon from '../services/renderIcon';
import ChildPostCard from './PostCard.vue';
import { useStore } from '../stores/store';
import UserAvatarWithName from '../components/UserAvatarWithName.vue';

const dialog = useDialog();
const msg = useMessage();
const store = useStore();

const CommentReplyInputWrapperRef = ref();

const props = defineProps(['post', 'showAuthor']);
const replyMode = ref(false);
const replyLength = ref(0);

const replies = ref([]);

function toggleReplyInput() {
	// console.clear();
	// console.log(props.post);

	if (!replyMode.value) {
		replyMode.value = true;
		CommentReplyInputWrapperRef.value.scrollIntoView({ behavior: 'smooth', block: 'center' });
		return;
	}

	if (replyLength.value > 0) {
		return dialog.warning({
			title: 'Cancel reply?',
			content: "You will lose what you've typed.",
			positiveText: 'Yes, no problem',
			negativeText: 'No, keep typing',
			onPositiveClick: () => {
				replyMode.value = false;
				msg.info('Reply canceled');
			},
		});
	}

	replyMode.value = false;
	replyLength.value = 0;
}

function setReplyLength(length) {
	replyLength.value = length;
}

const isParentPost = computed(() => props.post.parent_post_id === null);


onBeforeMount(() => {
	replies.value = props.post.post_replies;
});

onMounted(() => {
	// console.log(props.post);
});

function pushReply(reply) {
	// console.log('balesannya nih', reply);
	// replies.value.push(reply);
	replyMode.value = false;
}

</script>

<template>
	<!-- post -->

	<NSpace vertical
		class="ps-4 mt-4 border-l"
		:class="store.isBrightTheme ? 'border-l-neutral-100' : 'border-l-neutral-800'">

		<!-- post card header -->
		<NSpace justify="space-between">
			<div class="flex items-center space-x-2">
				<UserAvatarWithName :user="post?.user" />

				<span class="text-neutral-400 text-xs">{{ threadDate(post.updated_at) }}</span>

			</div>
		</NSpace>

		<NSpace>
			<p class="whitespace-pre-line">{{ post.content }}</p>
			<!-- <pre class="">{{ post.level }}</pre>
			<pre class="">{{ post.top_parent_post_id }}</pre>
			<pre class="">{{ post.parent_post_id }}</pre>
			<pre class="">{{ post.id }}</pre> -->
		</NSpace>

		<NSpace justify="">
			<LikeDislikePostButton :post="post" />

			<NButton quaternary
				size="small"
				:type="replyMode ? 'error' : 'default'"
				@click="toggleReplyInput"
				:render-icon="() => renderIcon((replyMode ? 'fe:close' : 'bx:reply'))">
				<span>{{ replyMode ? 'Cancel reply' : 'Reply' }}</span>
			</NButton>

			<!-- <NButton @click="checkdata">
				check data
			</NButton> -->
		</NSpace>


		<div ref="CommentReplyInputWrapperRef">
			<CommentReplyInput v-if="replyMode"
				:parentPost="post"
				@created-new-reply="pushReply"
				@reply-value-change="setReplyLength" />
		</div>


		<div class="ms-1">
			<ChildPostCard v-for="reply in replies"
				:post="reply" />
		</div>
	</NSpace>


	<!-- <NDivider v-if="isParentPost" /> -->
	<div v-if="isParentPost"
		class="my-10"></div>

	<!-- replies -->
</template>