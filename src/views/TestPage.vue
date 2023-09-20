<script setup>
import {
	NDivider,
	NModal,
	NButton,
	NSpace,
} from 'naive-ui';
import { onBeforeMount, onMounted, ref } from 'vue';
import renderIcon from '../services/renderIcon';
import UserCard from '../components/UserCard.vue';
import userApi from '../services/apis/backend/userApi';
import testApi from '../services/apis/backend/testApi';

onMounted(async () => {
	const res = await testApi.test();
	console.log(res);
})

</script>

<template></template>