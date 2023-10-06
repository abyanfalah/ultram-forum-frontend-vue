<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import Tiptap from '../components/TiptapTexteditor.vue';
import renderIcon from '../services/renderIcon';
import threadApi from '../services/apis/backend/threadApi';
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
import { useStore } from '../stores/store';

const msg = useMessage();
const loading = useLoadingBar();
const store = useStore();

const subForum = ref({});

const newThreadFormRef = ref();
const newThreadFormModel = ref({
	// title: '',
	// content: '',
	title: 'thread on a sub forum',
	content: `The data property of a dataset can be passed in various formats. By default, that data is parsed using the associated chart type and scales. If the labels property of the main data property is used, it has to contain the same amount of elements as the dataset with the most values. These labels are used to label the index axis (default x axes). The values for the labels have to be provided in an array. The provided labels can be of the type string or number to be rendered correctly. In case you want multiline labels you can provide an array with each line as one entry in the array.`,

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
};



function handleSubmitNewThread() {
	newThreadFormRef.value?.validate(async (err) => {

		if (err) return msg.error('Form is Invalid');

		loading.start();
		try {
			const thread = Object.assign({}, newThreadFormModel.value);
			thread.slug = slugify(
				thread.title,
				{
					lower: true,
					strict: true,
					trim: true,
				});
			thread.subForumId = store.currentSubForum.id;

			const res = await threadApi.store(thread);
			console.log(res);
			msg.success('Thread created');
			loading.finish();


			router.replace(
				{
					name: 'sub.thread.view',
					params: {
						threadSlug: res.data.slug,
						subSlug: res.data.sub_forum.slug
					}
				}
			);
		} catch (err) {
			loading.error();
			msg.error('Failed to submit');
			console.error("failed submit thread: ", err);
		}
	});
}



// async function getCategories() {
// 	const res = await threadApi.getAllCategories();
// 	categoryList = res.data;

// 	categories.value = categoryList.map(cat => {
// 		return {
// 			label: cat.name,
// 			value: cat.id.toString(),
// 		};
// 	});
// }

onMounted(() => {
	if (!store.currentSubForum) {
		msg.error('No selected sub forum!');
		return router.back();
	}
	subForum.value = Object.assign({}, store.currentSubForum);
});
</script>

<template>
	<div class="max-w-screen-md mx-auto">

		<div class="flex flex-col">
			<h1 class="text-3xl">New thread</h1>
			<p>on <span class="font-bold"> {{ subForum.name }}</span></p>
		</div>

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

			<!-- <NFormItem label="Category"
			path="categoryId">
			<NSelect placeholder="Select category"
				v-model:value="newThreadFormModel.categoryId"
				:options="categories"
				filterable />
		</NFormItem> -->

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
				<NButton type="primary"
					:render-icon="() => renderIcon('fe:plus')"
					@click="handleSubmitNewThread">
					Create new thread
				</NButton>
			</NSpace>





		</NForm>

	</div>


	<!-- editor -->
	<!-- <Tiptap /> -->
</template>