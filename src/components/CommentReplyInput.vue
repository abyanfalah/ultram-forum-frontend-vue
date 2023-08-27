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



const formRef = ref();
const formModel = ref({
	content: '',
	threadId: '',
	parentPostId: '',
});
const formRules = {
	content: {
		required: true,
		message: 'Reply is required!',
		trigger: ['input']
	}
};



function handleSendReply() {
	formModel.value.parentPostId = props.parentPost.id;
	formModel.value.threadId = props.parentPost.thread_id;



	formRef.value?.validate(async (err) => {
		loading.start();
		if (err) {
			msg.error('Invalid reply');
			loading.error();
			return;
		}

		try {
			const reply = Object.assign({}, formModel.value);

			console.log('formModel', formModel.value);
			console.log('reply', reply);
			console.log('props.parentpost', props.parentPost);

			const data = (await postApi.store(reply)).data;

			const newReply = {
				id: data.id,
				thread_id: data.thread_id,
				parent_post_id: data.parent_post_id,
				user_id: data.user_id,
				content: data.content,
				updated_at: data.updated_at,
				user: useAuthStore().user,
				post_replies: [],
				likes_count: 0,
				dislikes_count: 0,
				my_reaction: null,
			};

			emmits('createdNewReply', newReply);
			formModel.value.content = '';
			msg.success('Reply sent');
			loading.finish();
		} catch (e) {
			msg.error(`Failed sending reply`);
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