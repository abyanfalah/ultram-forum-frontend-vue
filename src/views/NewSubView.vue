<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import renderIcon from '../services/renderIcon';
import subForumApi from '../services/apis/backend/subForumApi';
import slugify from 'slugify';
import {
	NForm,
	NInput,
	NFormItem,
	NSelect,
	NButton,
	NSpace,
	useMessage,
	useLoadingBar,
} from 'naive-ui';
import router from '../router';

const msg = useMessage();
const loading = useLoadingBar();

const newSubFormRef = ref();
const newSubFormModel = ref({
	name: 'asdf',
	description: 'asdf',
	// categoryId: '1',
});
const newSubFormRules = {
	name: {
		required: true,
		message: "Sub forum name is required",
		trigger: ['input', 'blur',]
	},
	description: {
		required: true,
		message: "Please provide description about this sub",
		trigger: ['input', 'blur',]
	},
};


</script>

<template>
	<h1 class="text-3xl">New sub forum</h1>

	<NForm ref="newSubFormRef"
		:model="newSubFormModel"
		:rules="newSubFormRules"
		class="flex-col space-y-4 mt-4">

		<NFormItem label="Name"
			path="name">
			<NInput type="text"
				v-model:value="newSubFormModel.name"
				placeholder="Sub name" />
		</NFormItem>

		<NFormItem label="Description"
			path="description">
			<NInput type="textarea"
				v-model:value="newSubFormModel.description"
				:autosize="{
					minRows: 10
				}"
				placeholder="Sub description" />
		</NFormItem>

		<NSpace justify="end">
			<NButton type="primary"
				:render-icon="() => renderIcon('fe:plus')"
				@click="handleSubmitNewSub">
				Create new sub
			</NButton>
		</NSpace>





	</NForm>


	<!-- editor -->
	<!-- <Tiptap /> -->
</template>