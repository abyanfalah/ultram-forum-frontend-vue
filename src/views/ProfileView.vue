<script setup>
import {
	NButton,
	NSpace,
	NDropdown,
	NTabPane,
	NTabs,
	useMessage,
	useLoadingBar,
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
import imageApi from '../services/apis/backend/imageApi';


const props = defineProps(['username', 'user']);
const isMe = computed(() => {
	return user.value.username === authStore.user.username;
});

const authStore = useAuthStore();
const store = useStore();
const chatStore = useChatStore();

const loading = useLoadingBar();
const user = ref({});
const msg = useMessage();

const userThreads = ref([]);
const userPosts = ref([]);
const profileImageUrl = ref();
const coverImageUrl = ref();

const profilePicInputRef = ref();
const isChangingProfilePic = ref(false);

const isViewingProfilePic = ref(false);
const profilePicOptions = ref([
	{
		label: "View",
		key: "view",
		icon: () => renderIcon('fe:eye'),
		action: () => isViewingProfilePic.value = true,
	},
]);

const isChangingCoverPic = ref(false);
const isViewingCoverPic = ref(false);
const coverPicOptions = ref([
	{
		label: "View",
		key: "view",
		icon: () => renderIcon('fe:eye'),
		action: () => isViewingCoverPic.value = true,
		action: () => isViewingCoverPic.value = true,

	},

]);

function setMenuOptions() {
	if (isMe.value == true) {
		profilePicOptions.value.push({
			label: "Change (max 2MB)",
			key: "change",
			icon: () => renderIcon('fe:edit'),
			action: () => profilePicInputRef.value.click(),
		});

		coverPicOptions.value.push({
			label: "Change (max 2MB)",
			key: "change",
			icon: () => renderIcon('fe:edit'),
		});
	}
}

async function getUserData() {

	try {
		loading.start();
		if (props?.username === authStore.user.username) {
			user.value = authStore.user;
		} else {
			const res = await userApi.getByUsername(props.username);
			user.value = res.data;
		}

		getProfileImageUrl();

		userThreads.value = (await threadApi.getByUserId(user.value.id))?.data ?? [];
		userPosts.value = (await postApi.getByUserId(user.value.id))?.data ?? [];
		loading.finish();
	} catch (error) {
		loading.error();
		msg.error("An error occured when retrieving user data");
		console.error("An error occured when retrieving user data: ", error);
	}

}

function changeUserData(newUserdata) {
	console.log('change user data from profile view');
	user.value = newUserdata;
}

async function goToChat() {
	// check if i have a conv with this guy already.
	const participantIdList = [authStore.myId, user.value.id];
	const res = await conversationApi.getConversationIdByParticipants(participantIdList);
	const conversationId = res.data;
	return chatStore.goToConversation(conversationId);
}

function getProfileImageUrl() {
	if (!user.value) return null;

	// use some random query to invoke reload when changed
	const timestamp = new Date().getTime();
	profileImageUrl.value = `${imageApi.profileImageEndpoint(user.value.id)}?timestamp=${timestamp}`;
};

// const coverImgUrl = computed(() => {
// 	if (!user.value) return null;
// 	return imageApi.coverImageEndpoint(user.value.id);
// });

const coverImgUrl = ref();

function seeCover(imgUrl) {
	coverImgUrl.value = imgUrl;
	isViewingCoverPic.value = true;
}

async function handleProfilePicFileChange(event) {
	const selectedFile = event.target.files[0];

	if (selectedFile.size > 2000000) {
		msg.error('File size is too large');
		return console.error("Unable to upload image: file size is too large");
	}

	try {
		loading.start();
		const formData = new FormData();
		formData.append('image', selectedFile);

		const res = await imageApi.uploadProfileImage(formData);
		console.log(res);

		// if (res.status != 200) { throw new Error("No image is being send"); };


		console.log(authStore.myProfilePicUrl);

		getProfileImageUrl();
		authStore.reloadProfilePic();

		console.log(authStore.myProfilePicUrl);

		loading.finish();
		msg.success("Profile picture updated");
	} catch (error) {
		msg.error('An error occured when uploading profile image');
		console.error('An error occured when uploading profile image:', error);
		loading.error();
	}

}

onMounted(async () => {
	await getUserData();
	setMenuOptions();
	// console.clear();
	console.log(user.value);
});
</script>

<template>
	<!-- images -->
	<div class="relative mb-[5rem]">
		<div class="group rounded transition-all ease-out "
			:class="[store.isBrightTheme ? ' bg-primary' : ' bg-primary-dark',]">

			<!-- <NDropdown show-arrow
				trigger="click"
				@select="(key, option) => { option.action() }"
				:options="coverPicOptions">

			</NDropdown> -->

			<!-- cover image -->
			<NCarousel show-arrow
				:show-dots="false"
				dot-type="line"
				dot-placement="bottom"
				:draggable="true"
				:autoplay="isViewingCoverPic == false"
				class="rounded w-full h-[30vh]">
				<img v-for="i in 5"
					class=" object-cover w-full mx-auto rounded transition ease-out  "
					:src="`/img/cover/cover${i}.png`"
					role="button"
					style="height: 10vh;"
					alt=""
					@click="seeCover(`/img/cover/cover${i}.png`)">
			</NCarousel>
		</div>

		<!-- profile image -->
		<div class="absolute  -bottom-[3rem]  flex rounded-full justify-start ms-4">
			<div class="group transition ease-out rounded-full ">
				<div class=" rounded-full  overflow-clip p-[4px] transition ease-out  "
					:class="[store.isBrightTheme ? 'bg-white group-hover:bg-primary' : 'bg-dark group-hover:bg-primary-dark',]">

					<NDropdown v-if="isMe"
						show-arrow
						@select="(key, option) => { option.action() }"
						trigger="click"
						:options="profilePicOptions">
						<img :src="profileImageUrl ?? null"
							class=" w-[5rem] h-[5rem] md:w-[8rem] md:h-[8rem] rounded-full object-cover"
							role="button"
							alt="">
					</NDropdown>

					<img v-else
						:src="profileImageUrl ?? null"
						class=" w-[5rem] h-[5rem] md:w-[8rem] md:h-[8rem] rounded-full object-cover"
						role="button"
						@click="isViewingProfilePic = true"
						alt="">

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
			<NButton @click="goToChat"
				:render-icon="() => renderIcon('fe:mail')">Message</NButton>
			<FollowButton :user="user"
				@toggle-follow="changeUserData" />
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

		<NTabPane name="Comments">

			<NSpace v-if="userPosts.length < 1">
				You haven't make any post yet...
			</NSpace>

			<div v-else>
				This user has comment(s), but i'll disable this feature, i guess.
			</div>

		</NTabPane>

		<NTabPane name="Pictures">
			<span>Coming soon...</span>

		</NTabPane>
	</NTabs>


	<!-- modals -->

	<!-- profile pic upload form -->
	<!-- <NModal :mask-closable="false"
		:close-on-esc="true"
		v-model:show="isChangingProfilePic">
		<div class="w-full px-4 ">
			<div class="max-w-lg mx-auto">
				<ProfilePictureUploadForm />
			</div>
		</div>
	</NModal> -->

	<!-- profile pic -->
	<NModal v-model:show="isViewingProfilePic">
		<ViewImageModalContent :imgUrl="profileImageUrl"
			@close="isViewingProfilePic = false" />
	</NModal>

	<!-- cover pic -->
	<NModal v-model:show="isViewingCoverPic">
		<ViewImageModalContent :imgUrl="coverImgUrl"
			@close="isViewingCoverPic = false" />
	</NModal>

	<!-- hiddens -->
	<div class="hidden">
		<input type="file"
			size="1048576"
			ref="profilePicInputRef"
			@change="handleProfilePicFileChange">
	</div>
</template>