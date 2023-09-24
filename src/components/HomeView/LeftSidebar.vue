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

const msg = useMessage();
const store = useStore();

const subForums = ref([]);
const users = ref([]);

async function getSubforums() {
	try {
		const res = await subForumApi.getAll();
		// console.log(res);
		subForums.value = res.data;
	} catch (error) {
		console.error(error);
		msg.error('Unable to load subforums');
	}
}

async function getUsers() {
	try {
		const res = await userApi.getAll();
		// console.log(res);
		users.value = res.data;
	} catch (error) {
		console.error(error);
		msg.error('Unable to load users');
	}
}

onMounted(() => {
	getSubforums();
	getUsers();
})

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
				<RouterLink :to="{ name: 'sub.all' }"
					class="block font-bold px-2 rounded transition ease-out"
					:class="[store.getHoverPrimaryBgColor]">
					Sub forums
				</RouterLink>
			</template>


			<NList hoverable
				clickable
				:show-divider="false">
				<RouterLink v-for="sub in subForums"
					:to="{ name: 'sub.view', params: { slug: sub.slug } }">
					<NListItem>
						<div class="flex items-center space-x-2">
							<NAvatar size="small">{{ sub.name[0] }}</NAvatar>
							<span>{{ sub.name }}</span>
						</div>

					</NListItem>
				</RouterLink>
			</NList>
		</NCard>

		<NCard size="small">
			<template #header>
				<RouterLink :to="{ name: 'users' }"
					class="block font-bold px-2 rounded transition ease-out"
					:class="[store.getHoverPrimaryBgColor]">
					Peoples
				</RouterLink>
			</template>

			<NList hoverable
				clickable
				:show-divider="false">
				<RouterLink v-for="user in users"
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

