<script setup>
import { onMounted, ref } from 'vue';
import Tiptap from '../components/TiptapTexteditor.vue';
import renderIcon from '../services/renderIcon';
import threadApi from '../services/apis/backend/threadApi';


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

const msg = useMessage();
const loading = useLoadingBar();

const newThreadFormRef = ref();
const newThreadFormModel = ref({
	title: '',
	content: '',
	categoryId: null,
});
const newThreadFormRules = {
	title: [
		{
			required: true,
			message: "Title is required",
			trigger: ['input', 'blur',]
		}
	],
	content: {
		required: true,
		message: "Thread content is required",
		trigger: ['input', 'blur',]
	},
	category: {
		required: true,
		message: "Category is required",
		trigger: ['input', 'blur',]
	}
};

const categories = ref([]);
let categoryList = [];

function handleSubmitNewThread() {

	newThreadFormRef.value?.validate(async (err) => {

		if (err) return msg.error('Form is Invalid');

		loading.start();
		try {
			const thread = newThreadFormModel.value;
			await threadApi.store(thread);
			msg.success('Thread created');
			loading.finish();
		} catch (err) {
			loading.error();
			msg.error('Failed to submit');
		}


	});

}



async function getCategories() {
	const res = await threadApi.getAllCategories();
	categoryList = res.data;

	categories.value = categoryList.map(cat => {
		return {
			label: cat.name,
			value: cat.id.toString(),
		};
	});
}

onMounted(async () => {
	getCategories();
});
</script>

<template>
	<h1 class="text-3xl">New thread</h1>

	<NForm ref="newThreadFormRef"
		:model="newThreadFormModel"
		:rules="newThreadFormRules"
		class="flex-col space-y-4 mt-4">

		<NFormItem label="Title"
			path="title">
			<NInput type="text"
				v-model:value="newThreadFormModel.title"
				placeholder="Thread title" />
		</NFormItem>

		<NFormItem label="Category"
			path="category">
			<NSelect placeholder="Select category"
				v-model:value="newThreadFormModel.categoryId"
				:options="categories"
				filterable />
		</NFormItem>

		<NFormItem label="Content"
			path="content">
			<NInput type="textarea"
				v-model:value="newThreadFormModel.content"
				:autosize="{
					minRows: 10
				}"
				placeholder="Thread content" />
		</NFormItem>

		<NSpace justify="end">
			<NButton :render-icon="() => renderIcon('fe:plus')"
				@click="handleSubmitNewThread">
				Create new thread
			</NButton>
		</NSpace>





	</NForm>


	<!-- editor -->
	<!-- <Tiptap /> -->
</template>