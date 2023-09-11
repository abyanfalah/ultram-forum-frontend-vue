<script setup>
import { timesAgo } from '../services/humanTime';
import { useAuthStore } from '../stores/authStore';
import { useStore } from '../stores/store';

const authStore = useAuthStore();
const store = useStore();
const props = defineProps(['message'])



</script>

<template>
	<div class="flex flex-col"
		:class="message.user_id == authStore.myId ? `items-end` : 'items-start'">
		<div class="flex flex-col p-2 mb-2 rounded max-w-sm"
			:class="message.user_id == authStore.myId ? `${store.getPrimaryBgColor}` : `${store.getPrimaryBgHighlightColor}`">
			<p>
				{{ message.content }}
			</p>

			<!-- 
			<span style="font-size: 0.65rem;"
				class="font-bold block text-end"
				:class="[store.isBrightTheme ? 'text-neutral-400' : 'text-neutral-600']">
				{{ timesAgo(message.created_at) }}
			</span> -->
		</div>
	</div>
</template>