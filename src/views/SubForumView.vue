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

const props = defineProps(['slug']);
const msg = useMessage();
const loading = useLoadingBar();
const store = useStore();

const subForum = ref({});
const threads = ref();

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
		console.log(data);
		subForum.value = data;
		store.currentSubForum = data;
		// getSubForumThreads();
		// console.log(subForum.value);
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
		const res = await subForumApi.getMembers(subForum.value.id);
		console.log(res);
		threads.value = res.data;
	} catch (error) {
		msg.error('Failed retrieving threads');
		console.error('Failed retrieving threads:', error);
	} finally {
		isFetchingMembers.value = false;
	}
}

const coverImgUrl = computed(() => {
	const n = Math.floor(Math.random() * 40);
	return `/img/egg.png`;
});


onBeforeMount(() => {
	getSubForum();
	getSubForumThreads();

	// console.log()
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
		<img class="h-[20vh] w-full object-cover rounded"
			:src="coverImgUrl"
			:alt="subForum.name"
			role="button"
			@click="isViewingCoverPic = true">

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
						@toggle-join="getSubForum" />

				</div>

			</NSpace>
		</NSpace>

		<!-- sub description excerpt -->
		<!-- <p class="md:hidden">{{ descExcerpt }} ...</p> -->
		<!-- <p class="hidden md:block">{{ subForum.description }}</p> -->


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


		<!-- modals -->
		<NModal v-model:show="isViewingCoverPic">
			<ViewImageModalContent :imgUrl="coverImgUrl"
				@close="isViewingCoverPic = false" />
		</NModal>
	</div>
</template>