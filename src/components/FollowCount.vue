<script setup>
import { onMounted } from 'vue';
import { useStore } from '../stores/store';
import { useAuthStore } from '../stores/authStore';

const props = defineProps(['user']);
const store = useStore();
const authStore = useAuthStore();

</script>

<template>
	<div class="flex space-x-2">

		<div class="flex space-x-1">
			<span class="text-neutral-500">Follower</span>
			<span class="font-bold">{{ user.followers_count }}</span>
		</div>

		<div class="flex space-x-1">
			<span class="text-neutral-500">Follows</span>
			<span class="font-bold">{{ user.followees_count }}</span>
		</div>

	</div>
</template>