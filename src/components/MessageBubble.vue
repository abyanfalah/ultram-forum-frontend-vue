<script setup>
import { useAuthStore } from '../stores/authStore';
import { useStore } from '../stores/store';


const authStore = useAuthStore();
const store = useStore();
const props = defineProps(['message'])



</script>

<template>
	<div class="flex"
		:class="message.user_id == authStore.myId ? `justify-end` : null">
		<p class="p-2 rounded"
			:class="message.user_id == authStore.myId ? `${store.getPrimaryBgColor}` : `${store.getPrimaryBgHighlightColor}`">
			{{ message.content }}
		</p>
	</div>
</template>