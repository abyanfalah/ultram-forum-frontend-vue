<script setup>
import {
	NButton, useMessage
} from 'naive-ui';
import renderIcon from '../services/renderIcon';
import { computed, ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
const store = useAuthStore();
const props = defineProps(['user']);
const isMe = computed(() => props.user.id == store.user.id);
const msg = useMessage();

const busy = ref(false);

const isFollowed = ref(false);

function toggleFollowUser() {
	busy.value = true;
	setTimeout(() => {

		if (isFollowed.value) {
			msg.success('Unfollow success');
		} else {
			msg.success('Followed successfully');
		}

		busy.value = false;
		isFollowed.value = !isFollowed.value;
	}, 3000);
}
</script>

<template>
	<NButton v-if="isMe == false"
		@click="toggleFollowUser"
		:type="isFollowed ? 'default' : 'primary'"
		:loading="busy"
		:render-icon="() => renderIcon(isFollowed ? 'fe:check' : 'fe:user-plus')">
		{{ isFollowed ? 'Following' : 'Follow' }}
	</NButton>
</template>