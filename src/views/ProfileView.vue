<script setup>
import {
	NButton,
	NSpace,
	NDropdown,
	NTabPane,
	NTabs,
	useMessage,
	NModal,
	NCarousel,
} from 'naive-ui';
import { useChatStore } from '../stores/chatStore';
import { useAuthStore } from '../stores/authStore';
import { useStore } from '../stores/store';
import renderIcon from '../services/renderIcon';
import { computed, onMounted, ref } from 'vue';
import FollowButton from '../components/FollowButton.vue';
import ViewImageModalContent from '../components/ViewImageModalContent.vue';
import ThreadCard from '../components/ThreadCard.vue';
import FollowCount from '../components/FollowCount.vue';

import threadApi from '../services/apis/backend/threadApi';
import postApi from '../services/apis/backend/postApi';
import userApi from '../services/apis/backend/userApi';
import conversationApi from '../services/apis/backend/conversationApi';
import router from '../router';


const props = defineProps(['username', 'user']);
const isMe = computed(() => {
	return user.value.username === authStore.user.username;
});

const authStore = useAuthStore();
const store = useStore();
const chatStore = useChatStore();

const user = ref({});
const msg = useMessage();

const userThreads = ref([]);
const userPosts = ref([]);




const isViewingProfilePic = ref(false);
const profilePicOptions = ref([
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
		label: "View",
		key: "view",
		icon: () => renderIcon('fe:eye'),
		action: () => isViewingCoverPic.value = true,

	},

]);

function setMenuOptions() {
	if (isMe.value == true) {
		profilePicOptions.value.push({
			label: "Change",
			key: "change",
			icon: () => renderIcon('fe:edit'),
			disabled: () => isMe.value == false,
		});

		coverPicOptions.value.push({
			label: "Change",
			key: "change",
			icon: () => renderIcon('fe:edit'),
			disabled: () => isMe.value == false,
		});
	}
}

async function getUserData() {
	if (props?.username === authStore.user.username) {
		user.value = authStore.user;
	} else {
		const res = await userApi.getByUsername(props.username);
		user.value = res.data;
	}
	userThreads.value = (await threadApi.getByUserId(user.value.id)).data;
	userPosts.value = (await postApi.getByUserId(user.value.id)).data;
}

async function goToChat() {
	// check if i have a conv with this guy already.
	// but let's just create one directly for now.

	// if so, then go there

	// if not, make one, and go there.


}

async function makeConv() {
	try {
		const myId = authStore.myId;
		const secondPersonId = user.value.id;

		const res = await conversationApi.createNewConversation([myId, secondPersonId]);
		console.log(res);
		chatStore.conversationId = res.data;

		router.push({ name: 'chat' });

	} catch (error) {
		console.error('error make conv: ', error);
	}
}

const coverImgUrl = ref();

function seeCover(imgUrl) {
	coverImgUrl.value = imgUrl;
	isViewingCoverPic.value = true;
}

onMounted(async () => {
	await getUserData();
	setMenuOptions();
	console.log(user.value);
});
</script>

<template>
	<!-- cover image -->
	<div class="relative mb-[5rem]">
		<div class="group rounded transition-all ease-out "
			:class="[store.isBrightTheme ? ' bg-primary' : ' bg-primary-dark',]">

			<!-- <NDropdown show-arrow
				trigger="click"
				@select="(key, option) => { option.action() }"
				:options="coverPicOptions">

			</NDropdown> -->

			<NCarousel show-arrow
				:show-dots="false"
				dot-type="line"
				dot-placement="bottom"
				autoplay
				class="rounded w-full h-[30vh]">
				<img v-for="i in 40"
					class=" object-cover w-full mx-auto rounded  transition ease-out  "
					:src="`/img/cover/cover${i}.png`"
					role="button"
					style="height: 20vh;"
					alt=""
					@click="seeCover(`/img/cover/cover${i}.png`)">
			</NCarousel>


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
						<img src="/img/egg.png"
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

		<!-- button for other's profile -->
		<NSpace v-else>
			<NButton @click="makeConv"
				:render-icon="() => renderIcon('fe:mail')">Message</NButton>
			<FollowButton :user="user" />
		</NSpace>
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
		<ViewImageModalContent imgUrl="/img/egg.png"
			@close="isViewingProfilePic = false" />
	</NModal>

	<!-- cover pic -->
	<NModal v-model:show="isViewingCoverPic">
		<ViewImageModalContent :imgUrl="coverImgUrl"
			@close="isViewingCoverPic = false" />
	</NModal>
</template>