<script setup>
import { ref } from 'vue';
import {
	NButton,
	NCard,
	NAvatar,
	NDivider,
	NSpace,
	useMessage,
	useDialog,
} from 'naive-ui';
import { threadDate, timesAgo } from '../services/humanTime';
import LikeDislikePostButton from './LikeDislikePostButton.vue';
import UserAvatar from './UserAvatar.vue';
import CommentReplyInput from './CommentReplyInput.vue';
import renderIcon from '../services/renderIcon';

const dialog = useDialog();
const msg = useMessage();

const props = defineProps(['post', 'showAuthor']);
const replyMode = ref(false);
const replyLength = ref(0);
const replyCancelRequiresConfirmation = ref(false);

function toggleReplyInput() {
	if (!replyMode.value) {
		return replyMode.value = true;
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



</script>

<template>
	<!-- alt post format layout -->
	<NSpace vertical>

		<NSpace justify="space-between">
			<div class="flex items-center space-x-2">
				<UserAvatar :user="post.user" />
				<span class="font-bold">{{ post.user.name }}</span>
			</div>
			<span class="text-neutral-400">{{ threadDate(post.updated_at) }}</span>
		</NSpace>

		<NSpace>
			<p class="mt-4">{{ post.content }}</p>
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
			<!-- reply comment comp if reply mode == true -->
		</NSpace>
		<CommentReplyInput v-if="replyMode"
			:parentPost="post"
			@reply-value-change="setReplyLength" />

		<NDivider />
	</NSpace>
</template>