<script setup>
import {
	NButton,
	NCard,
	NSpace,

} from 'naive-ui';

import UserAvatarWithName from '../components/UserAvatarWithName.vue';
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import renderIcon from '../services/renderIcon';
import FollowCount from './FollowCount.vue';
import FollowButton from '../components/FollowButton.vue';

const authStore = useAuthStore();
const props = defineProps(['user']);
const emits = defineEmits(['userDataChanges']);
const isMe = computed(() => props.user.id == useAuthStore().user.id);


function handleToggleFollow(newUserdata) {
	console.log('handleToggleFollow from UserCard');
	emits('userDataChanges', newUserdata);
}

onBeforeMount(() => {
	// user.value = props?.user;
})


</script>

<template>
	<NCard v-if="!isMe"
		:bordered="true">
		<NSpace justify="space-between"
			align="start">

			<NSpace vertical>
				<NSpace vertical>
					<UserAvatarWithName :user="user"
						:avatar-size="'large'"
						:with-username="true" />
					<p v-if="user.bio">{{ user.bio }}</p>
				</NSpace>
				<FollowCount v-if="user.id !== authStore.myId"
					:user="user"
					@toggle-follow="handleToggleFollow" />
			</NSpace>

			<FollowButton :user="user"
				@toggle-follow="handleToggleFollow" />
		</NSpace>


	</NCard>
</template>