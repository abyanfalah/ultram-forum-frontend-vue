<script setup>
import { computed, onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import subForumApi from '../services/apis/backend/subForumApi';
import {
	NModal,
	NSpace,
	NButton,
	useMessage,
	NTabs,
	NTabPane,
	NSpin,
	useLoadingBar
} from 'naive-ui';
import { Icon } from '@iconify/vue';
import JoinSubButton from '../components/JoinSubButton.vue';
import ViewImageModalContent from '../components/ViewImageModalContent.vue';
import ThreadCard from '../components/ThreadCard.vue';
import renderIcon from '../services/renderIcon';
import { useStore } from '../stores/store';
import { onBeforeRouteLeave } from 'vue-router';
import router from '../router';
import RightSidebar from '../components/SubForumView/RightSidebar.vue';
import LeftSidebar from '../components/SubForumView/LeftSidebar.vue';


const props = defineProps(['slug']);
const msg = useMessage();
const loading = useLoadingBar();
const store = useStore();

const subForum = ref({});
const threads = ref([]);
const members = ref([]);

const busy = ref(false);
const isFetchingThreads = ref(false);
const isFetchingMembers = ref(false);
const isViewingCoverPic = ref(false);

const descExcerpt = computed(() => {
	if (!subForum.value) return '';

	return subForum.value.description.substring(0, 100);
});



async function getSubForum() {
	try {
		// return console.log(props.slug);
		busy.value = true;
		loading.start();
		const { data } = await subForumApi.getBySlug(props.slug);
		subForum.value = data;
		store.currentSubForum = data;
		loading.finish();
	} catch (error) {
		msg.error("Failed getting sub info");
		console.error("Failed getting sub info: ", error);
		loading.error();
	} finally {
		busy.value = false;

	}
}

async function getSubForumThreads() {
	try {
		isFetchingThreads.value = true;
		const res = await subForumApi.getThreadsBySlug(props.slug);
		// console.log(res);
		threads.value = res.data;

	} catch (error) {
		msg.error('Failed retrieving threads');
		console.error('Failed retrieving threads:', error);
	} finally {
		isFetchingThreads.value = false;
	}
}


async function getSubForumMembers() {
	try {
		isFetchingMembers.value = true;
		const res = await subForumApi.getMembers(props?.slug);
		// console.log(res);
		members.value = res.data;
	} catch (error) {
		msg.error('Failed retrieving members');
		console.error('Failed retrieving members:', error);
	} finally {
		isFetchingMembers.value = false;
	}
}

const coverImgUrl = computed(() => {
	return `/img/egg.png`;
});


onMounted(() => {
	getSubForum();
	getSubForumThreads();
	getSubForumMembers();
});

function leaveSubForum() {
	store.currentSubForum = Object.assign({});
}

onUnmounted(() => {
	// leaveSubForum();
});
</script>

<template>
	<div v-if="subForum">
		<!-- cover image -->
		<img class="h-[30vh] w-full object-cover rounded"
			:src="coverImgUrl"
			:alt="subForum.name"
			role="button"
			@click="isViewingCoverPic = true">


		<!-- container -->
		<div class="flex justify-center space-x-4 mt-4 mx-auto">

			<!-- left -->
			<div class="hidden lg:block w-1/5 ">
				<NSpace vertical
					class="sticky top-4">
					<LeftSidebar :subForum="subForum"
						:members="members" />
				</NSpace>
			</div>

			<!-- center -->
			<div class="grow ">
				<div class="flex flex-col py-10 items-center space-y-4 text-neutral-500"
					v-if="!threads.length">
					<span>The sub is still fresh. Be the first one to post!</span>
					<RouterLink :to="{ name: 'sub.thread.new' }">
						<NButton block
							size="large"
							:render-icon="() => renderIcon('fe:text-align-left')"
							type=primary>Create thread</NButton>

					</RouterLink>

				</div>

				<ThreadCard v-else
					v-for="thread in threads"
					:key="thread.id"
					:thread="thread"
					:showAuthor="true"
					class="mb-2" />
			</div>

			<!-- right -->
			<div class="hidden sm:block relative w-1/4 ">
				<NSpace vertical
					class="sticky top-4">
					<RightSidebar :subForum="subForum"
						@update-sub-forum-data="getSubForum" />
					<!-- <RightSidebarVue v-for="i in 2" /> -->
				</NSpace>
			</div>



		</div>



		<div v-if="false"
			class="hidden">
			<!-- sub name and join button -->
			<NSpace justify="space-between"
				class="my-4">
				<div class="flex flex-col">
					<p class="text-2xl">{{ subForum.name }}</p>

					<div class="flex flex-col">
						<p class="flex items-center space-x-1">
							<Icon icon="fe:user" />
							<span>{{ subForum.members_count }}</span>
						</p>

						<p class="flex items-center space-x-1">
							<Icon icon="gridicons:posts" />
							<span>{{ subForum.threads_count }}</span>
						</p>
					</div>

				</div>
				<NSpace>

					<!-- <NButton>See details</NButton> -->

					<NButton @click="router.push({
						name: 'sub.thread.new'
					})"
						:render-icon="() => renderIcon('fe:plus')">Add new thread</NButton>
					<div>
						<JoinSubButton :subForum="subForum"
							@toggle-join="" />

					</div>

				</NSpace>
			</NSpace>

			<NTabs type="line"
				animated>
				<NTabPane name="Threads">
					<div v-if="isFetchingThreads"
						class="flex justify-center w-full py-10">
						<NSpin></NSpin>
					</div>
					<NSpace v-else
						vertical>
						<div class="flex flex-col items-center justify-center"
							v-if="!threads.length">
							<p>This sub doesn't have any thread yet.</p>
							<NButton @click="router.push({
								name: 'sub.thread.new'
							})"
								:render-icon="() => renderIcon('fe:plus')">Add new thread</NButton>
						</div>

						<ThreadCard v-else
							v-for="thread in threads"
							:thread="thread"
							:key="thread.id" />
					</NSpace>


				</NTabPane>
				<NTabPane name="Members">
					<div v-if="isFetchingMembers"
						class="flex justify-center w-full py-10">
						<NSpin></NSpin>
					</div>
				</NTabPane>
				<NTabPane name="About">
					{{ subForum.description }}
				</NTabPane>
			</NTabs>
		</div>



		<!-- modals -->
		<NModal v-model:show="isViewingCoverPic">
			<ViewImageModalContent :imgUrl="coverImgUrl"
				@close="isViewingCoverPic = false" />
		</NModal>
	</div>
</template>