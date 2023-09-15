<script setup>
import {
	NButton,
	NCard,
	NSpace,
	useMessage,
	NAvatar,
} from 'naive-ui';
import { timesAgo } from '../services/humanTime';
import renderIcon from '../services/renderIcon';
import router from '../router';
import JoinSubButton from '../components/JoinSubButton.vue';
import { ref } from 'vue';

const props = defineProps(['subForum']);
const emits = defineEmits(['dataChanged']);

function changeSubForumData(updatedSubForumData) {
	emits('dataChanged', updatedSubForumData);
}

</script>

<template>
	<NCard :key="subForum.id"
		hoverable>

		<template #cover>
			<div>
				<img class="h-[80px] object-cover"
					src="/img/egg.png">

				<!-- <img class="h-[80px] object-cover"
					:src="`/img/cover/cover${subForum.id}.png`"> -->
			</div>
		</template>


		<!--sub	name and slug-->
		<NSpace vertical
			class="
					mt-4">

			<NSpace justify="space-between"
				align="center">
				<RouterLink :to="{ name: 'sub.view', params: { slug: subForum.slug } }">
					<span class="text-xl">{{ subForum.name }}</span>
				</RouterLink>

				<JoinSubButton :subForum="subForum"
					@toggleJoin="changeSubForumData" />
			</NSpace>
			<p>{{ subForum.description }}</p>
			<!-- <pre>{{ subForum }}</pre> -->
		</NSpace>


	</NCard>
</template>