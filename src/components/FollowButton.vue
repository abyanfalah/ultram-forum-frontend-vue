<script setup>
import {
	NButton, useMessage
} from 'naive-ui';
import renderIcon from '../services/renderIcon';
import { computed, ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import followApi from '../services/apis/backend/followApi';
const store = useAuthStore();
const props = defineProps(['user']);
const isMe = computed(() => props.user.id == store.user.id);
const msg = useMessage();

const busy = ref(false);
const emits = defineEmits(['toggleFollow']);

const isFollowed = computed(() => {
	return props?.user.is_followed;
});

const isFollowing = computed(() => {
	return props?.user.is_following;
});

const buttonText = computed(() => {
	if (isFollowed.value) return 'Unfollow';
	if (isFollowing.value) return 'Follow back';
	return 'Follow';
});

async function toggleFollowUser() {
	try {
		busy.value = true;

		const res = await followApi.followByUserId(props?.user.id);
		// console.log('emit toggle Follow');
		emits('toggleFollow', res.data);
	} catch (error) {
		msg.error('Action failed');

	} finally {
		// busy.value = false;

		setTimeout(() => {
			busy.value = false;
		}, 300);
	}
}
</script>

<template>
	<NButton v-if="isMe == false"
		@click="toggleFollowUser"
		:type="user?.is_followed ? 'default' : 'primary'"
		:loading="busy"
		:render-icon="() => renderIcon(user?.is_followed ? 'fe:user-minus' : 'fe:user-plus')">
		{{ buttonText }}
	</NButton>
</template>