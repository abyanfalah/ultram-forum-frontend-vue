<script setup>
import {
	NForm,
	NInput,
	NFormItem,
	NButton,
	useMessage,
	useLoadingBar,
} from 'naive-ui';
import { ref, computed, watch, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import renderIcon from '../services/renderIcon';
import postApi from '../services/apis/backend/postApi';
import router from '../router';
import { useAuthStore } from '../stores/authStore';


const msg = useMessage();
const loading = useLoadingBar();

const props = defineProps(['parentPost']);
const emmits = defineEmits(['createdNewReply', 'replyValueChange']);

const inputRef = ref();

const formRef = ref();
const formModel = ref({
	content: '',
});
const formRules = {
	content: {
		required: true,
		message: 'Reply is required!',
		trigger: ['input']
	}
};



function handleSendReply() {
	formRef.value?.validate(async (err) => {
		loading.start();
		if (err) {
			msg.error('Invalid reply');
			loading.error();
			return;
		}

		try {
			let commentLevel = props.parentPost?.level + 1;
			let parentPostId = props.parentPost.id;

			// limit to only level 2
			if (commentLevel > 2) {
				commentLevel = 2;
				parentPostId = props.parentPost.parent_post_id;
			}

			const reply = {
				threadId: props.parentPost.thread_id,
				topParentPostId: props.parentPost.top_parent_post_id ?? props.parentPost.id,
				parentPostId: parentPostId,
				level: commentLevel,
				content: formModel.value.content,
			};
			const { data } = await postApi.store(reply);
			// console.log(data);


			// const newReply = {
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

			emmits('createdNewReply');

			formModel.value.content = '';
			msg.success('Reply sent');
			loading.finish();
		} catch (e) {
			msg.error(`Failed sending reply`);
			console.error(e);
			loading.error();
		}
	});
}

emmits('replyValueChange', 0);

onMounted(() => {
	console.log(inputRef.value.focus());
});


watch(() => formModel.value.content, (newVal) => {
	emmits('replyValueChange', newVal.length);
});
</script>

<template>
	<NForm ref="formRef"
		:model="formModel"
		:rules="formRules">
		<NFormItem class="p-0"
			path="content">
			<NInput ref="inputRef"
				type="textarea"
				v-model:value="formModel.content"
				placeholder="Type your reply here">
			</NInput>
		</NFormItem>

		<div class="flex justify-start space-x-2">

			<NButton type="primary"
				@click="handleSendReply"
				:render-icon="() => renderIcon('fe:paper-plane')">Send reply</NButton>

			<!-- <NButton @click="replyMode = false"
				type="tertiary"
				:render-icon="() => renderIcon('fe:close')">Cancel</NButton> -->


		</div>


	</NForm>
</template>