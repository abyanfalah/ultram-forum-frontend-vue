<script setup>
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import conversationApi from '../services/apis/backend/conversationApi';
import {
	NSpace
} from 'naive-ui';

import UserAvatar from './UserAvatar.vue';
import { useStore } from '../stores/store';

const store = useStore();
const props = defineProps(['conversation']);
const user = ref({});



onBeforeMount(() => {
	user.value = props.conversation.other_party[0];
	// console.log(user.value);
});

const cardHoverBgColor = computed(() => {
	return `hover:${store.getPrimaryBgHighlightColor}`;
});

onMounted(() => {
})

</script>

<template>
	<div class="group rounded"
		:class="(store.isBrightTheme ? 'hover:bg-primary-highlight' : 'hover:bg-primary-dark-highlight')">
		<NSpace v-if="conversation"
			class="py-2 group-hover:translate-x-4 transition ease-out">
			<!-- user avatar -->
			<UserAvatar :user="user" />

			<div class="flex-col space-y-0">
				<p>{{ user.name }}</p>
				<p class="text-xs text-neutral-500">last message lorem ipsum lastmsg ...</p>
			</div>
			<!-- last message -->
			<!-- time -->
		</NSpace>
	</div>
</template>