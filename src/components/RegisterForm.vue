<script setup>
import { onMounted, ref } from 'vue';

import {
	NForm,
	NFormItemRow,
	NInput,
	NButton,
	useMessage,
	NResult,
	NModal,
	NCard,
} from 'naive-ui';
import authApi from '../services/apis/backend/authApi';
import { useAuthStore } from '../stores/authStore';
import router from '../router';


const msg = useMessage();
const authStore = useAuthStore();

const busy = ref(false);
const busyCheckingUsername = ref(false);
const busyCheckingEmail = ref(false);
// const showRegisterSuccessModal = ref(false);
const showRegisterSuccessModal = ref(false);

let usernameCheckTimeout;
let emailCheckTimeout;


function closeRegisterSuccessModal() {
	showRegisterSuccessModal.value = false;
	authStore.isLogin = true;
	router.replace({ name: 'profile', params: { username: authStore.user.username } });
	// useAuthStore().checkAuth();
}

const registerFormRef = ref();
const registerFormModel = ref({
	username: 'Tanya.Blanda-Stanton2',
	email: 'your.email+fakedata30686@gmail.com',
	password: '_JqpWGcJ6GHWv__',
	passwordConfirm: '_JqpWGcJ6GHWv__',
});

// const registerFormModel = ref({
// 	username: '',
// 	email: '',
// 	password: '',
// 	passwordConfirm: '',
// });


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
			trigger: ["input"],
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
			trigger: ["blur", "input"],
		},
		{
			validator: isUniqueEmail,
			message: "Email is registered. Try login.",
			trigger: ["input",]
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
			message: "Use at least 8 characters!",
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

	if (usernameCheckTimeout) {
		clearTimeout(usernameCheckTimeout);
	};

	return new Promise((resolve, reject) => {
		busyCheckingUsername.value = true;

		usernameCheckTimeout = setTimeout(async () => {
			try {
				const res = await authApi.checkUsernameAvailability(registerFormModel.value.username);

				if (res.data === 1) {
					resolve(true);
				} else {
					reject(false);
				}

			} catch (err) {
				msg.error('error checking username');
				console.log(err);
			} finally {
				busyCheckingUsername.value = false;
			}
		}, 300);
	});

};

function isUniqueEmail() {
	if (!registerFormModel.value.email) return;

	if (emailCheckTimeout) {
		clearTimeout(emailCheckTimeout);
	};

	return new Promise((resolve, reject) => {
		busyCheckingEmail.value = true;

		emailCheckTimeout = setTimeout(async () => {
			try {
				const res = await authApi.checkEmailAvailability(registerFormModel.value.email);
				if (res.data === 1) {
					resolve(true);
				} else {
					reject(false);
				}

			} catch (err) {
				msg.error('error checking email');
				console.log(err);
			}
			busyCheckingEmail.value = false;
		}, 300);
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
	registerFormRef.value?.validate(async (err) => {
		if (err) return msg.error("Invalid form!");

		const credentials = {
			username: registerFormModel.value.username,
			email: registerFormModel.value.email,
			password: registerFormModel.value.password,
		};

		try {
			busy.value = true;
			const registerResponse = await authApi.register(credentials);
			console.log('registerResponse', registerResponse);
			authStore.user = registerResponse.data;


			if (registerResponse?.status == 204 || registerResponse?.status == 200 || registerResponse?.status == 201) {
				showRegisterSuccessModal.value = true;

				registerFormModel.value.username = '';
				registerFormModel.value.email = '';
				registerFormModel.value.password = '';
				registerFormModel.value.passwordConfirm = '';
			}


		} catch (err) {
			msg.error('Registration failed');
			console.error(err);
		} finally {
			busy.value = false;
		}




	});
}


</script>

<template>
	<div>
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
					:loading="busyCheckingEmail"
					type="email" />
			</NFormItemRow>

			<NFormItemRow path="password"
				label="Password">
				<NInput v-model:value="registerFormModel.password"
					placeholder="Password"
					show-password-on="click"
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
			:disabled="busy"
			:loading="busy"
			strong>
			<span>
				{{ busy ? "Registering" : "Register" }}
			</span>
		</NButton>
	</div>

	<NModal v-model:show="showRegisterSuccessModal"
		:mask-closable="false">
		<NCard class="max-w-md">
			<NResult status="success"
				title="Registration success!"
				description="Check your email inbox to verify your account and proceed using this platform.">

				<template #footer>
					<NButton block
						type="primary"
						@click="closeRegisterSuccessModal">OK</NButton>
				</template>
			</NResult>
		</NCard>
	</NModal>
</template>