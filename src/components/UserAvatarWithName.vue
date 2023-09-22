<script setup>
import {
	NAvatar,
	NButton,
	NPopover
} from 'naive-ui';
import imageApi from '../services/apis/backend/imageApi';
import { computed } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { Icon } from '@iconify/vue';
import { useStore } from '../stores/store';

const authStore = useAuthStore();
const store = useStore();

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
				object-fit="cover"
				round
				@click=""></NAvatar>
			<div class="flex flex-col items-start">
				<span class="font-bold flex items-center">{{ user?.name }}
					<NPopover v-if="user?.username === 'abyan'"
						trigger="hover">
						<template #trigger>
							<div class="ms-1 "
								:class="store.getPrimaryTextColor">
								<Icon icon="ph:code-fill" />
							</div>

						</template>
						<span>bro thinks he's a dev</span>
					</NPopover>
				</span>




				<span v-if="withUsername"
					class="text-neutral-500">@{{ user?.username }}</span>

			</div>

		</RouterLink>
	</NButton>
</template>