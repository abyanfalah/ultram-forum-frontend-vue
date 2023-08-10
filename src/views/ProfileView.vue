<script setup>
import { useAuthStore } from '../stores/authStore';


const authStore = useAuthStore();
const user = authStore.user;
</script>

<template>
	<!-- cover image -->
	<div class="relative mb-[5rem]">
		<img class="w-full h-[30%] object-cover rounded"
			src="/img/cover/default.jpg"
			alt="">

		<div class="absolute -bottom-[3rem] w-full  flex justify-center">
			<img src="/img/miku.jpg"
				class="  w-[6rem] h-[6rem]  rounded-full object-cover shadow"
				alt="">
		</div>

	</div>



	<div class="flex justify-center">
		<p class="text-2xl">{{ user.name }}</p>
	</div>
</template>