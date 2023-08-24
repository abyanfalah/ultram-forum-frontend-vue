<script setup>
import {
	NCard,
	NLayout,
	NSpace,
	NTab,
	NTabs,
	NTabPane,
	NForm,
	NFormItem,
	NFormItemRow,
	NButton,
	NInput,
	useNotification,
} from 'naive-ui';
import { ref } from 'vue';
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import ThemeSwitcher from '../components/ThemeSwitcher.vue';


</script>

<template>
	<NSpace class="min-h-screen"
		vertical
		justify="center"
		align="center">

		<div class="absolute top-0 right-0 m-4">
			<ThemeSwitcher />
		</div>


		<NSpace vertical
			align="center">
			<h1 class="text-2xl font-bold">Welcome!</h1>
			<h2>Please login or register</h2>
		</NSpace>

		<NCard>
			<div class=" my-10 min-w-[300px]">
				<NTabs default-value="register"
					size="large"
					animated>

					<NTabPane name="login"
						tab="Login">
						<LoginForm />
					</NTabPane>

					<NTabPane name="register"
						tab="Register">
						<RegisterForm />
					</NTabPane>

				</NTabs>
			</div>

		</NCard>



	</NSpace>
</template>