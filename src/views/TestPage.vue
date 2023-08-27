<script setup>
import { onMounted, ref, render } from 'vue';
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
import ViewImageModalContent from '../components/ViewImageModalContent.vue';

const showModal = ref(false)

</script>

<template>
	<!-- <RequiresEmailVerificationCard /> -->

	<NButton @click="showModal = true">Show modal</NButton>
	<NModal v-model:show="showModal">
		<ViewImageModalContent @close="showModal = false" />
	</NModal>
</template>