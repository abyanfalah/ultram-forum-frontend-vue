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
	NUpload,

} from 'naive-ui';
import router from '../router';

const msg = useMessage();
const loading = useLoadingBar();

const newSubFormRef = ref();
const newSubFormModel = ref({
	name: 'asdf',
	description: 'Cross-site request forgeries are a type of malicious exploit whereby unauthorized commands are performed on behalf of an authenticated user. Thankfully, Laravel makes it easy to protect your application from cross-site request forgery (CSRF) attacks.',
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

function handleSubmitNewSub() {

	newSubFormRef.value?.validate(async (err) => {

		if (err) return msg.error('Form is Invalid');

		loading.start();
		try {
			const sub = Object.assign({}, newSubFormModel.value);
			sub.slug = slugify(
				sub.name,
				{
					lower: true,
					strict: true,
					trim: true,
				});
			const res = await subForumApi.store(sub);
			console.log(res);

			msg.success('Sub created');
			loading.finish();

			router.replace(
				{
					name: 'sub.view',
					params: { slug: res.data.slug }
				});
		} catch (err) {
			loading.error();
			msg.error('Failed to submit');
			console.error("failed submit sub: ", err);
		}
	});
}


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
				placeholder="Sub name"
				maxlength="64"
				show-count />
		</NFormItem>

		<NFormItem label="Description"
			path="description">
			<NInput type="textarea"
				maxlength="256"
				show-count
				v-model:value="newSubFormModel.description"
				:autosize="{
					minRows: 10
				}"
				placeholder="Sub description" />
		</NFormItem>


		<!-- maybe later -->
		<!-- <NFormItem label="Sub cover image">
			<NUpload>
				
			</NUpload>
		</NFormItem> -->

		<NSpace justify="end">
			<NButton type="primary"
				:render-icon="() => renderIcon('fe:plus')"
				@click="handleSubmitNewSub">
				Create new sub
			</NButton>
		</NSpace>





	</NForm>


	<!-- editor -->
<!-- <Tiptap /> --></template>