<script setup>
import { useAuthStore } from '../stores/authStore';
import { useStore } from '../stores/store';


const authStore = useAuthStore();
const store = useStore();
const props = defineProps(['message'])



</script>

<template>
	<div class="flex flex-col"
		:class="message.user_id == authStore.myId ? `items-end` : 'items-start'">
		<p class="p-2 mb-2 rounded max-w-sm"
			:class="message.user_id == authStore.myId ? `${store.getPrimaryBgColor}` : `${store.getPrimaryBgHighlightColor}`">
			{{ message.content }}
		</p>
	</div>
</template>