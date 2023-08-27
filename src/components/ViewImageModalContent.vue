<script setup>
import { onMounted, ref, render, computed } from 'vue';
import threadApi from '../services/apis/backend/threadApi';
import axios from 'axios';
import authApi from '../services/apis/backend/authApi';
import RequiresEmailVerificationCard from '../components/RequiresEmailVerificationCard.vue';
import {
	NDivider,
	NModal,
	NButton,
	NSpace,
} from 'naive-ui';
import renderIcon from '../services/renderIcon';

const props = defineProps(['imgUrl']);
const emits = defineEmits(['close'])


</script>

<template>
	<!-- <RequiresEmailVerificationCard /> -->
	<div class="px-4 space-y-2">

		<img class="object-cover w-full rounded  "
			src="/img/cover/default.jpg"
			alt="">

		<NSpace justify="end"
			align="center">
			<span>Click outside, press <code>Esc</code>, or this button to close</span>
			<NButton type="primary"
				@click="emits('close')"
				:render-icon="() => renderIcon('fe:close')">
				<span>Close</span>
			</NButton>
		</NSpace>

	</div>
</template>