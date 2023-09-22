<script setup>
import { NAvatar } from 'naive-ui';
import { computed } from 'vue';
import { useStore } from '../stores/store';
import { useAuthStore } from '../stores/authStore';
import imageApi from '../services/apis/backend/imageApi';

const authStore = useAuthStore();
// const store = useStore();


const props = defineProps(['user', 'size']);
const profilePicUrl = computed(() => {
	if (props?.user.id == authStore.myId) return authStore.myProfilePicUrl;
	return imageApi.profileImageEndpoint(props?.user.id);
})




</script>

<template>
	<NAvatar :lazy="true"
		:src="profilePicUrl"
		role="button"
		object-fit="cover"
		round
		@click=""></NAvatar>
</template >
