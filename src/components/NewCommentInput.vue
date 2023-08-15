<script setup>
import {
	NForm,
	NInput,
	NFormItem,
	NButton,
} from 'naive-ui';
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import renderIcon from '../services/renderIcon';

const formRef = ref();
const formModel = ref({
	comment: ''
});
const formRules = {
	comment: {
		required: true,
		message: 'Comment is required!',
		// trigger: ['input', 'blur']
	}
};

const commentMode = ref(false)

</script>

<template>
	<NForm ref="formRef"
		:model="formModel"
		:rules="formRules">
		<NFormItem path="comment">
			<NInput type="textarea"
				v-model:value="formModel.comment"
				placeholder="Type your comment here"
				:rows="(commentMode ? 8 : 1)"
				@focus="commentMode = true">
			</NInput>
		</NFormItem>

		<div class="flex justify-end space-x-2">
			<NButton v-show="commentMode"
				@click="commentMode = false"
				type="tertiary"
				:render-icon="() => renderIcon('fe:close')">Cancel</NButton>
			<NButton v-show="commentMode"
				type="primary"
				:render-icon="() => renderIcon('fe:paper-plane')">Send comment</NButton>
		</div>


	</NForm>
</template>