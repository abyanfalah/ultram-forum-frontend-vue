<script setup>
import {
	NButton,
	NSpace,
	NTabPane,
	NTabs,
	useMessage,
	NForm,
	NFormItemRow,
	NInput,
	useDialog,

} from 'naive-ui';
import { useAuthStore } from '../stores/authStore';
import { useStore } from '../stores/store';
import renderIcon from '../services/renderIcon';
import { computed, onMounted, ref } from 'vue';
import threadApi from '../services/apis/backend/threadApi';
import postApi from '../services/apis/backend/postApi';
import ThreadCard from '../components/ThreadCard.vue';
import userApi from '../services/apis/backend/userApi';
import router from '../router';

const authStore = useAuthStore();
const store = useStore();
const user = ref({});
// const newUserData = ref({});
const msg = useMessage();
const dialog = useDialog();

const busy = ref(false);

const formRef = ref();
const formModel = ref({
	name: '',
	bio: '',

});
const formRules = {
	name: [
		{
			required: true,
			message: 'Name is requried!',
			trigger: ['input', 'blur'],
		}
	]
};

const isNoChanges = computed(() => {
	const isSameDisplayName = formModel.value.name == authStore.user.name;
	const isSameBio = formModel.value.bio == authStore.user.bio;

	return isSameDisplayName && isSameBio;
});

function saveChanges() {
	if (isNoChanges.value) return router.replace(store.profilePage);

	formRef.value?.validate(async (err) => {
		if (err) {
			msg.error('Invalid user data');
			return console.error(err);
		}

		try {
			busy.value = true;
			const editUserResponse = await userApi.updateMyProfile(formModel.value);
			console.log(editUserResponse);

			authStore.user = editUserResponse.data;
			console.log(authStore.user);



			router.replace({
				name: 'profile',
				params: { username: authStore.user.username }
			});
			msg.success('Update success', { closable: true });


		} catch (err) {
			console.error(err);
			return msg.error(err.response?.data.message);
		} finally {
			busy.value = false;
		}

	});
}

function cancelEdit() {
	console.log(isNoChanges.value);

	if (isNoChanges.value == false) {
		return dialog.warning({
			title: 'Cancel edit?',
			content: 'You will lose all unsaved changes',
			positiveText: 'Yes, leave this page',
			positiveButtonProps: { renderIcon: () => renderIcon('fe:close') },
			onPositiveClick: () => store.goToMyProfilePage(),
			negativeText: 'No, back to editing',
			negativeButtonProps: { renderIcon: () => renderIcon('pajamas:leave') },
		});
	}

	store.goToMyProfilePage(true);
}

onMounted(() => {
	user.value = Object.assign({}, authStore.user);

	formModel.value.name = user.value.name;
	formModel.value.bio = user.value.bio;




});
</script>

<template>
	<!-- cover image -->
	<div class="relative mb-[5rem]">
		<img class="w-full h-[30%] object-cover rounded"
			src="/img/cover/default.jpg"
			alt="">

		<!-- profile image -->
		<div class="absolute -bottom-[3rem] w-full  flex justify-start px-4">
			<div class="rounded-full overflow-clip p-[4px] transition ease-out duration-500"
				:class="[store.isBrightTheme ? 'bg-white' : 'bg-dark']">
				<img src="/img/miku.jpg"
					class=" w-[8rem] h-[8rem] rounded-full object-cover"
					alt="">
			</div>
		</div>
	</div>

	<!-- data edit form -->
	<NForm ref="formRef"
		:rules="formRules"
		:model="formModel">

		<NFormItemRow label="Display name"
			path="name">
			<NInput v-model:value="formModel.name"
				placeholder="Display name" />
		</NFormItemRow>

		<NFormItemRow label="Bio"
			path="bio">
			<NInput v-model:value="formModel.bio"
				placeholder="Tell about yourself"
				type="textarea" />
		</NFormItemRow>

		<NSpace justify="end">
			<NButton type="primary"
				@click="saveChanges"
				:loading="busy"
				:render-icon="() => renderIcon('fe:check')">Save changes</NButton>

			<NButton @click="cancelEdit"
				:render-icon="() => renderIcon('fe:close')">Cancel</NButton>
		</NSpace>

	</NForm>
</template>