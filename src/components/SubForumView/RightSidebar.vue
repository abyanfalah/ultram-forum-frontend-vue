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

			<div class="mb-4"></div>
			<h1 class="text-xl">Welcome to {{ subForum.name }}</h1>

			<p class="my-2">
				{{ subForum.description }}
			</p>

			<JoinSubButton :subForum="subForum"
				:isBlock="true"
				@toggle-join="emitUpdateSubForumData" />

			<NDivider></NDivider>

			<NSpace vertical>
				<RouterLink :to="{
					name: 'sub.thread.new'
				}">
					<NButton block
						:render-icon="() => renderIcon('fe:text-align-left')"
						type=success>Create thread</NButton>
				</RouterLink>



			</NSpace>
		</NCard>


	</NSpace>
</template>

