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

const users = ref([]);

function handleUserDataChanges(newUserdata) {
	console.log('handleUserDataChanges from user list');
	console.clear();
	console.log('newUserdata', newUserdata);
	console.log(users.value);
	const userIndex = users.value.findIndex((user) => user.id == newUserdata.id);
	console.log('user userIndex : ', userIndex);
	console.log('then', users.value[userIndex]);
	users.value[userIndex] = Object.assign({}, newUserdata);
	console.log('now', users.value[userIndex]);
	return;

}


onBeforeMount(async () => {
	users.value = (await userApi.getAll()).data;
});
</script>

<template>
	<!-- <RequiresEmailVerificationCard /> -->

	<UserCard v-for="user in users"
		:key="user.id"
		:user="user"
		class="mb-2"
		@user-data-changes="handleUserDataChanges" />
</template>