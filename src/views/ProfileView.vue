<script setup>
import {
	NButton,
	NSpace,
	NDropdown,
	NTabPane,
	NTabs,
	useMessage,
	NModal,
} from 'naive-ui';
import { useAuthStore } from '../stores/authStore';
import { useStore } from '../stores/store';
import renderIcon from '../services/renderIcon';
import { computed, onMounted, ref } from 'vue';

import ViewImageModalContent from '../components/ViewImageModalContent.vue';
import ThreadCard from '../components/ThreadCard.vue';
import FollowCount from '../components/FollowCount.vue';

import threadApi from '../services/apis/backend/threadApi';
import postApi from '../services/apis/backend/postApi';
import userApi from '../services/apis/backend/userApi';


const props = defineProps(['username', 'user']);


const authStore = useAuthStore();
const store = useStore();
const user = ref({});
const msg = useMessage();

const userThreads = ref([]);
const userPosts = ref([]);

const isMe = computed(() => {
	return user.value.username === authStore.user.username;
});


const isViewingProfilePic = ref(false);
const profilePicOptions = ref([
	{
		label: "Change",
		key: "change",
		icon: () => renderIcon('fe:edit'),
		disabled: () => isMe.value == false,
	},
	{
		label: "View",
		key: "view",
		icon: () => renderIcon('fe:eye'),
		action: () => isViewingProfilePic.value = true,
	},
]);

const isViewingCoverPic = ref(false);
const coverPicOptions = ref([
	{
		label: "Change",
		key: "change",
		icon: () => renderIcon('fe:edit'),
		disabled: () => isMe.value == false,
	},
	{
		label: "View",
		key: "view",
		icon: () => renderIcon('fe:eye'),
		action: () => isViewingCoverPic.value = true,

	},

]);




onMounted(async () => {
	if (props?.username === authStore.user.username) {
		user.value = authStore.user;
	} else {
		const res = await userApi.getByUsername(props.username);
		user.value = res.data;
	}

	userThreads.value = (await threadApi.getByUserId(user.value.id)).data;
	userPosts.value = (await postApi.getByUserId(user.value.id)).data;

	// console.log(user.value);
});
</script>

<template>
	<!-- cover image -->
	<div class="relative mb-[5rem]">

		<div class="group rounded transition-all ease-out "
			:class="[store.isBrightTheme ? ' bg-primary' : ' bg-primary-dark',]">

			<NDropdown show-arrow
				trigger="click"
				@select="(key, option) => { option.action() }"
				:options="coverPicOptions">
				<img class=" object-cover w-full h-[30%] rounded  transition ease-out  "
					src="/img/cover/default.jpg"
					role="button"
					alt="">
			</NDropdown>
		</div>





		<!-- profile image -->
		<div class="absolute  -bottom-[3rem]  flex rounded-full justify-start ms-4">
			<div class="group  transition ease-out">
				<div class=" rounded-full  overflow-clip p-[4px] transition ease-out  "
					:class="[store.isBrightTheme ? 'bg-white group-hover:bg-primary' : 'bg-dark group-hover:bg-primary-dark',]">
					<NDropdown show-arrow
						@select="(key, option) => { option.action() }"
						trigger="click"
						:options="profilePicOptions">
						<img src="/img/miku.jpg"
							class=" w-[5rem] h-[5rem] md:w-[8rem] md:h-[8rem] rounded-full object-cover"
							role="button"
							alt="">
					</NDropdown>
				</div>
			</div>
		</div>

	</div>


	<NSpace justify="space-between">
		<div>
			<p class="text-2xl">{{ user.name }}</p>
			<p class="font-bold">@{{ user.username }}</p>
			<p>{{ user.bio }}</p>

			<div class="my-2">
				<FollowCount :user="user" />
			</div>
		</div>

		<!-- profile btns -->
		<div v-if="isMe">
			<RouterLink :to="{ name: 'profile.edit' }">
				<NButton :render-icon="() => renderIcon('fe:edit')">Edit profile</NButton>
			</RouterLink>

		</div>
	</NSpace>

	<!-- thread / post history -->

	<NTabs animated>
		<NTabPane name="Threads">

			<NSpace v-if="userThreads.length < 1">
				You haven't make any thread yet...
			</NSpace>

			<ThreadCard v-else
				v-for="   thread    in    userThreads   "
				:key="thread.id"
				:thread="thread"
				class="my-4" />

		</NTabPane>

		<NTabPane name="Posts">

			<NSpace v-if="userPosts.length < 1">
				You haven't make any post yet...
			</NSpace>

			<div v-else>
				you do have post(s), but maybe i'll disable this feature, i guess.
			</div>

		</NTabPane>

		<NTabPane name="Pictures">
			<span>Coming soon...</span>

		</NTabPane>
	</NTabs>


	<!-- modals -->

	<!-- profile pic -->
	<NModal v-model:show="isViewingProfilePic">
		<ViewImageModalContent imgUrl="/img/miku.jpg"
			@close="isViewingProfilePic = false" />
	</NModal>

	<!-- cover pic -->
	<NModal v-model:show="isViewingCoverPic">
		<ViewImageModalContent imgUrl="/img/cover/default.jpg"
			@close="isViewingCoverPic = false" />
	</NModal>
</template>