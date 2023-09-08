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
import testBackend from '../services/apis/backend/testBackend';


const users = ref([]);

onBeforeMount(async () => {

});

async function testEvent() {
	const res = await testBackend.test();
	console.log(res);
}

</script>

<template>
	<!-- <RequiresEmailVerificationCard /> -->
	<!-- 
	<UserCard v-for="user in users"
		:key="user.id"
		:user="user"
		class="mb-2" /> -->

	<NButton size="large"
		@click="testEvent">
		testEvent
	</NButton>
</template>