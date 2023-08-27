<script setup>
import { useStore } from '../stores/store';

const props = defineProps(['user']);
const store = useStore();

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