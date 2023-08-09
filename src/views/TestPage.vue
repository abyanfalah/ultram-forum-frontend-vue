<script setup>
import axios from 'axios';
import { onMounted, onUnmounted, ref } from 'vue';
const email = ref('test@example.com');
const password = ref('password');

const baseurl = import.meta.env.VITE_BACKEND_API_URL;
axios.defaults.withCredentials = true;

async function login() {
	// if (document.cookie) return console.log('u udah login!');
	try {
		await axios.post(baseurl + "/login", { email: email.value, password: password.value });

	} catch (err) {
		const code = err.response.status;
		if (code === 422) {
			alert("you messed up");
		}
	}


	// await axios.get(baseurl + "/sanctum/csrf-cookie");
	// const you = await axios.get(baseurl + '/api/user');
	// console.log(you);
}

async function getUserData() {
	// if (!document.cookie) return console.log('belum login');

	// await axios.get(baseurl + "/sanctum/csrf-cookie");
	try {
		const you = await axios.get(baseurl + '/api/user');
		console.log(you);
	} catch (err) {
		const code = err.response.status;
		if (code === 401) {
			alert("identify yourself nigga!");
		}
	}

}

onMounted(() => {
	email.value = '';
	password.value = '';
})

</script>

<template>
	<div style="margin: 100px 0px 0px 100px; padding: 100px; background: pink; display: inline-block;">
		<h1 class="text-xl">Testpage</h1>

		<form @submit.prevent="login"
			class="flex-col space-y-4">
			<input class="block border "
				type="text"
				placeholder="email"
				v-model="email">
			<input class="block border "
				type="password"
				placeholder="password"
				v-model="password">

			<button role="button"
				class="block border bg-blue-400 p-3 hover:bg-red-500">Login</button>
		</form>

		<div style="display: block; margin-block: 10px;"></div>

		<button @click="getUserData"
			style="padding: 10px ; border: 2px solid black;">Get user data</button>
	</div>
</template>