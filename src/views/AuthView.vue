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

</script>

<template>
	<NSpace class="min-h-screen bg-green-600 text-white"
		vertical
		justify="center"
		align="center">

		<NSpace vertical
			align="center"
			class=" my-10">
			<h1 class="text-2xl font-bold">Welcome!</h1>
			<h2>Please login or register</h2>
		</NSpace>

		<NCard>
			<div>
				<NTabs default-value="login"
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