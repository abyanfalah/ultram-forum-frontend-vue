<script setup>
import {
	NForm,
	NInput,
	NFormItem,
	NButton,
	useMessage,
	useLoadingBar,
} from 'naive-ui';
import { ref, computed, watch } from 'vue';
import { Icon } from '@iconify/vue';
import renderIcon from '../services/renderIcon';
import postApi from '../services/apis/backend/postApi';
import router from '../router';
import { useAuthStore } from '../stores/authStore';


const msg = useMessage();
const loading = useLoadingBar();

const props = defineProps(['parentPost']);
const emmits = defineEmits(['createdNewReply', 'replyValueChange']);

const commentMode = ref(false);

const formRef = ref();
const formModel = ref({
	content: '',
	threadId: '',
	parentPostId: '',
});
const formRules = {
	content: {
		required: true,
		message: 'Comment is required!',
		trigger: ['input']
	}
};



function handleSendComment() {
	formModel.value.threadId = props.threadId;
	formModel.value.parentPostId = props.parentPostId ?? null;

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
			console.log(data);

			const newPost = {
				id: data.id,
				threadId: data.thread_id,
				parentPostId: data.parent_post_id,
				userId: data.user_id,
				content: data.content,
				updatedAt: data.update_at,
				authorName: useAuthStore().user.name,
			};

			emmits('createdNewPost', newPost);
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

emmits('replyValueChange', 0);

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
			<NInput type="textarea"
				v-model:value="formModel.content"
				placeholder="Type your reply here"
				@focus="commentMode = true">
			</NInput>
		</NFormItem>

		<div class="flex justify-start space-x-2">

			<NButton type="primary"
				@click="handleSendComment"
				:render-icon="() => renderIcon('fe:paper-plane')">Send reply</NButton>

			<!-- <NButton @click="commentMode = false"
				type="tertiary"
				:render-icon="() => renderIcon('fe:close')">Cancel</NButton> -->


		</div>


	</NForm>
</template>