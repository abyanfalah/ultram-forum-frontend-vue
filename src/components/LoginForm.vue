<script setup>
import { onMounted, ref } from 'vue';

import {
	NForm,
	NFormItemRow,
	NInput,
	NButton,
	useMessage,
	useNotification,
} from 'naive-ui';
import authApi from '../services/apis/backend/authApi';
import { useAuthStore } from '../stores/authStore';
import router from '../router';

const msg = useMessage();
const notif = useNotification();

const busy = ref(false);

const loginFormRef = ref();
const loginFormModel = ref({
	email: '',
	password: '',
});
const loginFormRules = {
	email: [
		{
			required: true,
			message: "Email is required!",
			trigger: ["input", "blur"],
		},
		{
			validator: isValidEmail,
			message: "Email is not valid!",
			trigger: ["blur"],
		},
	],
	password: [
		{
			required: true,
			message: "Password is required!",
			trigger: ['blur'],
		},
	],
};

const authStore = useAuthStore();

function isValidEmail() {
	const email = loginFormModel.value.email;

	if (!email) return;

	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return !!re.test(String(email).toLowerCase());
}

function handleLogin() {
	loginFormRef.value?.validate(async (err) => {
		if (err) return msg.error("Invalid form!");

		const credentials = {
			email: loginFormModel.value.email,
			password: loginFormModel.value.password,
		};

		try {
			busy.value = true;
			const loginResponse = await authApi.login(credentials);
			// console.log('login: ', loginResponse);
			authStore.checkAuth();

			if (loginResponse?.status == 204 || loginResponse?.status == 200) {
				authStore.isLogin = true;

				router.replace({ name: 'home' });
				msg.success('Welcome!', { closable: true });
			}

		} catch (err) {
			console.error(err);
			return msg.error(err.response?.data.message);

			// if (err.response.status == 422) {
			// 	msg.error('Invalid credentials');
			// }
		} finally {
			busy.value = false;
		}

	});
}

onMounted(() => {
	loginFormModel.value.email = 'test@example.com';
	loginFormModel.value.password = 'password';
});

</script>

<template>
	<NForm ref="loginFormRef"
		:model="loginFormModel"
		:rules="loginFormRules"
		class="my-4">

		<NFormItemRow label="Email"
			path="email">
			<NInput v-model:value="loginFormModel.email"
				placeholder="example@mail.com"
				type="email" />
		</NFormItemRow>

		<NFormItemRow label="Password"
			path="password">
			<NInput v-model:value="loginFormModel.password"
				type="password"
				show-password-on="click"
				placeholder="Password" />
		</NFormItemRow>

	</NForm>

	<NButton @click="handleLogin"
		type="primary"
		block
		strong
		:disabled="busy"
		:loading="busy">
		Login
	</NButton>
</template>