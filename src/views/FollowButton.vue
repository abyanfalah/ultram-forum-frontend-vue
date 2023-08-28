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
	<div v-if="isMe == false">
		<NButton v-if="isFollowed == false"
			@click="toggleFollowUser"
			type="primary"
			:loading="busy"
			:render-icon="() => renderIcon('fe:user-plus')">
			Follow
		</NButton>

		<NButton v-else
			@click="toggleFollowUser"
			type="default"
			:loading="busy"
			:render-icon="() => renderIcon('fe:check')">
			Following
		</NButton>



	</div>
</template>