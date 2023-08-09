<script setup>
import { ref } from 'vue';

import {
	NForm,
	NFormItemRow,
	NInput,
	NButton,
	useMessage,
} from 'naive-ui';

const msg = useMessage();

const registerFormRef = ref(null);
const registerFormInputs = ref({
	email: '',
	password: '',
	passwordConfirm: '',
});
const registerFormRules = ref({
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
			message: "Password doesn't match!",
			trigger: ["blur"],
		},
	],
});

function isValidEmail() {
	const email = registerFormInputs.value.email;

	if (!email) return;

	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return !!re.test(String(email).toLowerCase());
}

function passwordIsEightCharacterLong() {
	const password = registerFormInputs.value.password;
	if (!password) return;

	return password.length > 7;

}

function isValidPasswordConfirm() {
	const password = registerFormInputs.value.password;
	const passwordConfirm = registerFormInputs.value.passwordConfirm;
	if (!passwordConfirm) return;

	return password === passwordConfirm;
}

function handleRegister() {
	registerFormRef.value?.validate((err) => {
		if (err) return msg.error("Invalid form!");

		msg.success("Form is valid!");
	});
}


</script>

<template>
	<NForm ref="registerFormRef"
		:model="registerFormInputs"
		:rules="registerFormRules">

		<NFormItemRow path="email"
			label="Email">
			<NInput placeholder="example@mail.com"
				type="email" />
		</NFormItemRow>

		<NFormItemRow path="password"
			label="Password">
			<NInput placeholder="Password"
				type="password" />
		</NFormItemRow>

		<NFormItemRow path="passwordConfirm"
			label="Confirm password">
			<NInput placeholder="Confirm password"
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