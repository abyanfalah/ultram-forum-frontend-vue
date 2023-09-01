<script setup>
import {
	NDivider,
	NModal,
	NButton,
	NSpace,
} from 'naive-ui';
import { onBeforeMount, onMounted, ref } from 'vue';
import RequiresEmailVerificationCard from '../components/RequiresEmailVerificationCard.vue';
import renderIcon from '../services/renderIcon';
import UserCard from '../components/UserCard.vue';
import userApi from '../services/apis/backend/userApi';
import { useDataStore } from '../stores/dataStore';

const dataStore = useDataStore();
const users = ref([]);

onBeforeMount(async () => {
	// users.value = (await userApi.getAll()).data;
	dataStore.userList = (await userApi.getAll()).data;
});
</script>

<template>
	<!-- <RequiresEmailVerificationCard /> -->

	<UserCard v-for="user in dataStore.userList"
		:key="user.id"
		:user="user"
		class="mb-2" />
</template>