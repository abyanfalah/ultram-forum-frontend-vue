<script setup>
import {
	NAvatar,
	NButton,
} from 'naive-ui';
import imageApi from '../services/apis/backend/imageApi';
import { computed } from 'vue';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();


const props = defineProps(['user', 'avatarSize', 'withUsername']);
const profilePicUrl = computed(() => {
	if (props?.user.id == authStore.myId) return authStore.myProfilePicUrl;
	return imageApi.profileImageEndpoint(props?.user.id);
})


</script>

<template>
	<NButton text>
		<RouterLink :to="{
			name: 'profile',
			params: { username: user?.username }
		}"
			class=" flex space-x-2 items-center ">
			<NAvatar :src="profilePicUrl"
				:size="avatarSize ?? 'small'"
				role="button"
				round
				@click=""></NAvatar>
			<div class="flex flex-col items-start space-y-1">
				<span class="font-bold">{{ user?.name }}</span>
				<span v-if="withUsername"
					class="text-neutral-500">@{{ user?.username }}</span>

			</div>

		</RouterLink>
	</NButton>
</template>