<script setup>
import {
	NCard,
	NResult,
	NButton,
	useMessage,
} from 'naive-ui';
import { computed, ref, watch } from 'vue';
import { Icon } from '@iconify/vue';

const msg = useMessage();
const busy = ref(false);

let resendInterval;
const resendCount = ref(0);
const resendBtnText = computed(() => {
	if (busy.value) return "Resending";
	if (resendCount.value > 0) return `Resend again in ${resendCount.value} `;
	return 'Resend the verification email';
});
const resendBtnDisabled = computed(() => {
	if (busy.value) return true;
	if (resendCount.value > 0) return true;
	return false;
});

function requestNewVerificationEmail() {
	busy.value = true;

	// send request
	// const res = await bla bla bla;

	msg.success('Verification email resent');
	busy.value = false;

	resendCount.value = 30;
	resendInterval = setInterval(function () {
		resendCount.value--;
		if (resendCount.value === 0) clearInterval(resendInterval);
	}, 1000);
}
</script>


<template >
	<NCard class="max-w-lg mx-auto">
		<NResult title="Verification is required"
			description="Check your email inbox (and spam) to verify your account.">

			<template #icon>
				<Icon icon="tabler:mail-exclamation"
					width="100"
					height="100" />
			</template>


			<template #footer>
				<div class="flex space-x-2 justify-center items-center">
					<span>Need another one?</span>
					<NButton size="small"
						type="primary"
						@click="requestNewVerificationEmail"
						:disabled="resendBtnDisabled"
						:loading="busy">
						{{ resendBtnText }}
					</NButton>
				</div>
			</template>
		</NResult>
	</NCard>
</template>