<script setup>
import { onMounted } from 'vue';
import threadApi from '../services/apis/backend/threadApi';
import axios from 'axios';
import authApi from '../services/apis/backend/authApi';

const baseurl = 'http://localhost:8000/api/token/test';

// authApi.checkAuth();


async function test() {
	try {
		axios.defaults.withCredentials = true;

		let res = await axios.get('http://localhost:8000/sanctum/csrf-cookie');
		console.log(res);

		res = await axios.get("http://localhost:8000/api/user");
		console.log(res);

		res = await axios.get("http://localhost:8000/api/token/test");
		console.log(res);

		res = await axios.post("http://localhost:8000/api/token/test");
		console.log(res);

	} catch (err) {
		alert(err);
	}
}

onMounted(() => {
	test();
});
</script>

<template>
	testpage
</template>