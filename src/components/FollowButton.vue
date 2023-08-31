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
const emits = defineEmits(['countChanges']);

const isFollowed = ref(false);

async function toggleFollowUser() {
	try {
		busy.value = true;


		return msg.warning('Will fix this later');


		const res = await followApi.followByUserId(props?.user.id);
		isFollowed.value = true;
		console.clear();
		console.log(res.data);
		emits('countChanges', res.data);

	} catch (error) {
		msg.error('Action failed');

	} finally {
		// busy.value = false;

		setTimeout(() => {
			busy.value = false;
		}, 3000);
	}
}


</script>

<template>
	<NButton v-if="isMe == false"
		@click="toggleFollowUser"
		:type="isFollowed ? 'default' : 'primary'"
		:loading="busy"
		:render-icon="() => renderIcon(isFollowed ? 'fe:user-minus' : 'fe:user-plus')">
		{{ isFollowed ? 'Unfollow' : 'Follow' }}
	</NButton>
</template>