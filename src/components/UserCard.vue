<script setup>
import {
	NButton,
	NCard,
	NSpace,

} from 'naive-ui';

import UserAvatarWithName from '../views/UserAvatarWithName.vue';
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import renderIcon from '../services/renderIcon';
import FollowCount from './FollowCount.vue';


const props = defineProps(['user']);
const isMe = computed(() => props.user.id == useAuthStore().user.id)

</script>

<template>
	<NCard :bordered="true">
		<NSpace justify="space-between"
			align="start">

			<NSpace vertical>
				<NSpace vertical>
					<UserAvatarWithName :user="user"
						:avatar-size="'large'"
						:with-username="true" />
					<p v-if="user.bio">{{ user.bio }}</p>
				</NSpace>
				<FollowCount :user="user" />
			</NSpace>


			<!-- follow button -->
			<NButton type="primary"
				:render-icon="() => renderIcon('fe:user-plus')"
				v-if="isMe == false">
				Follow
			</NButton>

		</NSpace>



	</NCard>
</template>