<script setup>
import {
	NCard,
	NSpace,
	NDivider,
	NList,
	NListItem,
	useMessage,
	NAvatar,
	NInput,
} from 'naive-ui';
import { Icon } from '@iconify/vue';
import renderIcon from '../../services/renderIcon';
import subForumApi from '../../services/apis/backend/subForumApi';
import { onMounted, ref } from 'vue';
import userApi from '../../services/apis/backend/userApi';
import UserAvatarWithNameVue from '../UserAvatarWithName.vue';
import { useStore } from '../../stores/store';
import { RouterLink } from 'vue-router';

const props = defineProps(['subForum', 'members']);

const msg = useMessage();
const store = useStore();

</script>

<template>
	<NSpace vertical="">


		<NInput placeholder="Search (coming soon...)">
			<template #suffix>
				<Icon icon="fe:search" />
			</template>

		</NInput>


		<NCard size="small">
			<template #header>
				<RouterLink :to="{ name: 'sub.member.list', params: { slug: subForum.slug } }"
					class="block font-bold px-2 rounded-sm transition ease-out"
					:class="[store.getHoverPrimaryBgColor]">
					Members
				</RouterLink>
			</template>

			<NList hoverable
				clickable
				:show-divider="false">
				<RouterLink v-for="user in members"
					:to="{ name: 'profile', params: { username: user.username } }">
					<NListItem>
						<div class="flex items-center space-x-2">
							<UserAvatarWithNameVue :user="user"
								:regularFont="true" />
						</div>

					</NListItem>
				</RouterLink>
			</NList>
		</NCard>
	</NSpace>
</template>

