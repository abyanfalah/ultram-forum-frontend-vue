<script setup>
import {
	NForm,
	NInput,
	NFormItem,
	NButton,
	useMessage,
	useLoadingBar,
} from 'naive-ui';
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import renderIcon from '../services/renderIcon';
import postApi from '../services/apis/backend/postApi';
import router from '../router';
import { useAuthStore } from '../stores/authStore';
import { useStore } from '../stores/store';


const msg = useMessage();
const loading = useLoadingBar();
const store = useStore();
const props = defineProps(['threadId', 'parentPostId']);
const emits = defineEmits(['createdNewPost', 'commentMode']);

const commentMode = ref(false);
const commentInputElement = document.querySelector("#newCommentInput");


const formWrapperRef = ref();
const formRef = ref();
const formModel = ref({
	content: '',
	threadId: '',
	parentPostId: '',
});
const formRules = {
	content: {
		required: false,
		message: 'Comment is required!',
		trigger: ['blur']
	}
};

function handleSendComment() {
	formModel.value.threadId = props.threadId;
	formModel.value.parentPostId = props.parentPostId ?? null;

	if (!formModel.value.content) {
		msg.error('Invalid comment');
		loading.error();
		return;
	}

	formRef.value?.validate(async (err) => {
		loading.start();
		if (err) {
			msg.error('Invalid comment');
			loading.error();
			return;
		}

		try {
			const comment = Object.assign({}, formModel.value);
			const data = (await postApi.store(comment)).data;
			// console.log(data);


			// const newPost = {
			// 	id: data.id,
			// 	thread_id: data.thread_id,
			// 	top_parent_post_id: data.top_parent_post_id,
			// 	parent_post_id: data.parent_post_id,
			// 	user_id: data.user_id,
			// 	content: data.content,
			// 	updated_at: data.updated_at,
			// 	user: useAuthStore().user,
			// 	post_replies: [],
			// 	likes_count: 0,
			// 	dislikes_count: 0,
			// 	my_reaction: null,
			// };
			// emits('createdNewPost', newPost);

			formModel.value.content = '';
			commentMode.value = false;
			msg.success('Comment sent');
			loading.finish();
		} catch (e) {
			msg.error(`Failed sending comment`);
			// msg.error(`Failed sending comment: ${e.message}`);
			console.log(e);
			loading.error();
		}
	});
}

function focusCommentInput() {
	commentMode.value = true;
	formWrapperRef.value.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function cancelComment() {
	// if (!formModel.value.content) {
	// 	formModel.value.content = '';
	// }
	commentMode.value = false;
}
</script>

<template>
	<div ref="formWrapperRef">
		<NForm ref="formRef"
			:model="formModel"
			:rules="formRules"
			id="newCommentInput">
			<NFormItem path="content">
				<NInput type="textarea"
					v-model:value="formModel.content"
					placeholder="Type your comment here"
					:rows="(commentMode ? 8 : 1)"
					@focus="focusCommentInput">
				</NInput>
			</NFormItem>

			<div class="flex justify-start space-x-2">

				<NButton v-show="commentMode"
					type="primary"
					:disabled="!formModel.content"
					@click="handleSendComment"
					:render-icon="() => renderIcon('fe:paper-plane')">Send comment</NButton>

				<NButton v-show="commentMode"
					@click="cancelComment"
					type="tertiary"
					:render-icon="() => renderIcon('fe:close')">Cancel</NButton>


			</div>
		</NForm>
	</div>
</template>