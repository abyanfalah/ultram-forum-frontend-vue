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
} from 'naive-ui';
import { ref } from 'vue';

const loginFormRef = ref(null);
const loginFormInputs = ref({

})


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
			<NTabs class="card-tabs"
				default-value="login"
				size="large"
				animated>

				<NTabPane name="login"
					tab="Login">

					<NForm ref="loginFormRef"
						:model="loginFormInputs"
						:rules="loginFormRules">
						<NFormItemRow label="Email">
							<NInput />
						</NFormItemRow>
						<NFormItemRow label="Password">
							<NInput />
						</NFormItemRow>
					</NForm>
					<NButton type=""
						block
						strong>
						Login
					</NButton>
				</NTabPane>

				<NTabPane name="register"
					tab="Register">
					<NForm>
						<NFormItemRow label="Email">
							<NInput />
						</NFormItemRow>
						<NFormItemRow label="Password">
							<NInput />
						</NFormItemRow>
						<NFormItemRow label="Reenter Password">
							<NInput />
						</NFormItemRow>
					</NForm>
					<NButton type=""
						block
						strong>
						Register
					</NButton>
				</NTabPane>

			</NTabs>
		</NCard>



	</NSpace>
</template>