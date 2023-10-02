<script setup>
import {
	NCard,
	NSpace,
	useMessage,
	NDivider,
	NButton,
	NAvatar,
	NList,
	NListItem,
	NInput,
	NCollapse,
	NCollapseItem,

} from 'naive-ui';
import renderIcon from '../../services/renderIcon';
import { onMounted, ref } from 'vue';
import subForumApi from '../../services/apis/backend/subForumApi';
import { useStore } from '../../stores/store';
import { useAuthStore } from '../../stores/authStore';
import JoinSubButton from '../JoinSubButton.vue';
import router from '../../router';

const msg = useMessage();
const store = useStore();
const authStore = useAuthStore();

const props = defineProps(['subForum']);
const emits = defineEmits(['updateSubForumData']);
const rules = ref([
	{
		title: 'Prepare Your Laravel Backend',
		detail: 'Ensure your Laravel backend is fully set up and functioning on your shared hosting environment. Make sure your backend API routes are working correctly.',
	},
	{
		title: 'Prepare Your Vue.js Frontend',
		detail: 'Ensure that your Vue.js frontend has been built for production using npm run build, and you have the dist folder containing the optimized production files.',
	},
	{
		title: 'Create a Directory Structure',
		detail: 'On your shared hosting account, create a directory structure to organize your project. You might have something',
	},
	{
		title: 'Upload Files',
		detail: `Upload the Laravel backend files to the appropriate directory (e.g., backend/) on your shared hosting account using FTP or any file upload method provided by your hosting provider.
		Upload the contents of the dist folder (the Vue.js frontend) to the frontend/ directory on your hosting account.`,
	},
	{
		title: 'Configure the Server',
		detail: `Your shared hosting environment may require specific configuration settings. Check with your hosting provider for any server-specific configurations, such as PHP version, database settings, and file permissions.

		`,
	},
]);


function emitUpdateSubForumData(updatedSubForumData) {
	emits('updateSubForumData', updatedSubForumData);
}

onMounted(() => {
})


</script>

<template>
	<NSpace vertical="">
		<NCard size="small">
			<template #cover>
				<img class="h-20 object-cover"
					src="/img/egg.png"
					alt="">
			</template>

			<RouterLink :to="{ name: 'sub.view', params: { slug: subForum.slug } }">
				<p class="text-xl my-4">sub / {{ subForum.name }}</p>

			</RouterLink>

			<NSpace vertical>

				<RouterLink :to="{
					name: 'sub.thread.new'
				}">
					<NButton block
						:render-icon="() => renderIcon('fe:text-align-left')"
						type=success>Create thread</NButton>
				</RouterLink>

				<JoinSubButton :subForum="subForum"
					:isBlock="true"
					@toggle-join="emitUpdateSubForumData" />

			</NSpace>

			<NDivider></NDivider>

			<div>
				<p class="text-lg mb-4">Sub forum rules (coming soon..)</p>

				<NCollapse accordion>
					<NCollapseItem v-for="rule in rules"
						:title="rule.title">
						<p>{{ rule.detail }}</p>
					</NCollapseItem>
				</NCollapse>

			</div>

		</NCard>

		<NButton type="error"
			tertiary
			block>Report this thread</NButton>

	</NSpace>
</template>

