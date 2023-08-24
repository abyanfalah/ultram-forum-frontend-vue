<script setup>
import { onMounted, ref } from 'vue';

import {
	NForm,
	NFormItemRow,
	NInput,
	NButton,
	useMessage,
} from 'naive-ui';
import authApi from '../services/apis/backend/authApi';


const msg = useMessage();

const busy = ref(false);
const busyCheckingUsername = ref(false);
let timeout;
let usernameIsAvailable = true;


const registerFormRef = ref();
const registerFormModel = ref({
	username: '',
	email: '',
	password: '',
	passwordConfirm: '',
});


const registerFormRules = ref({
	username: [
		{
			required: true,
			message: "Username is required!",
			trigger: ["input", "blur"],
		},
		{
			validator: isUniqueUsername,
			message: "This username is already taken by someone :(",
			trigger: ["input", "blur"],
		},
	],
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
			trigger: ["input", "blur"],
		},
		{
			validator: passwordIsEightCharacterLong,
			message: "Password should be at least 8 characters long!",
			trigger: ["blur"],
		},
	],
	passwordConfirm: [
		{
			required: true,
			message: "Re-enter your password!",
			trigger: ["input", "blur"],
		},
		{
			validator: isValidPasswordConfirm,
			message: "Doesn't match your original password!",
			trigger: ["blur"],
		},
	],
});


function isUniqueUsername() {
	if (!registerFormModel.value.username) return;

	if (timeout) {
		clearTimeout(timeout);
	};

	return new Promise((resolve, reject) => {
		busyCheckingUsername.value = true;

		let o = Math.random();
		o = Math.floor(o * 10);

		timeout = setTimeout(async () => {
			try {
				const res = await authApi.checkUsernameAvailability(registerFormModel.value.username);
				console.log(res);

				if (res.data === 1) {
					resolve(true);
				} else {
					reject(false);
				}

			} catch (err) {
				msg.error(err.response?.message);
			}
			busyCheckingUsername.value = false;
		}, 500);
	});

};


function isValidEmail() {
	const email = registerFormModel.value.email;

	if (!email) return;

	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return !!re.test(String(email).toLowerCase());
}

function passwordIsEightCharacterLong() {
	const password = registerFormModel.value.password;
	if (!password) return;

	return password.length > 7;

}

function isValidPasswordConfirm() {
	const password = registerFormModel.value.password;
	const passwordConfirm = registerFormModel.value.passwordConfirm;
	if (!passwordConfirm) return;

	return password === passwordConfirm;
}


function handleRegister() {
	console.log(registerFormModel.value);
	registerFormRef.value?.validate((err) => {
		if (err) return msg.error("Invalid form!");

		const credentials = {
			username: registerFormModel.value.username,
			email: registerFormModel.value.email,
			password: registerFormModel.value.password,
		};






	});
}


</script>

<template>
	<NForm ref="registerFormRef"
		:model="registerFormModel"
		:rules="registerFormRules"
		class="my-4">

		<NFormItemRow path="username"
			label="Username">
			<NInput v-model:value="registerFormModel.username"
				placeholder="Username"
				type="text"
				:loading="busyCheckingUsername"
				ref="usernameInput" />
		</NFormItemRow>


		<NFormItemRow path="email"
			label="Email">
			<NInput v-model:value="registerFormModel.email"
				placeholder="example@mail.com"
				type="email" />
		</NFormItemRow>

		<NFormItemRow path="password"
			label="Password">
			<NInput v-model:value="registerFormModel.password"
				placeholder="Password"
				type="password" />
		</NFormItemRow>

		<NFormItemRow path="passwordConfirm"
			label="Confirm password">
			<NInput v-model:value="registerFormModel.passwordConfirm"
				placeholder="Confirm password"
				type="password" />
		</NFormItemRow>
	</NForm>

	<NButton @click="handleRegister"
		type="primary"
		block
		strong>
		Register
	</NButton>
</template>