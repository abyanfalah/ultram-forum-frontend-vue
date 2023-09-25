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

const msg = useMessage();
const store = useStore();
const authStore = useAuthStore();

const subForums = ref([]);



async function getSubforums() {
	try {
		const res = await subForumApi.getByJoinedUser(authStore.myId);
		// console.log(res);
		subForums.value = res.data;
	} catch (error) {
		console.error(error);
		msg.error('Unable to load subforums');
	}
}

onMounted(() => {
	getSubforums();
})


</script>

<template>
	<NSpace vertical="">
		<NCard size="small">
			<span>(some stuff here)</span>
		</NCard>

		<NCard size="small">
			<template #cover>
				<img class="h-10 object-cover"
					src="/img/cover/cover4.png"
					alt="">
			</template>

			<div class="mb-4"></div>

			<p>
				Your personal Ultram frontpage.
			</p>

			<NDivider></NDivider>

			<NSpace vertical>
				<RouterLink :to="{ name: 'thread.new' }">
					<NButton block
						:render-icon="() => renderIcon('fe:text-align-left')"
						type=primary>Create thread</NButton>

				</RouterLink>


				<RouterLink :to="{ name: 'sub.new' }">
					<NButton block
						:render-icon="() => renderIcon('fe:layer')">Create sub forum</NButton>
				</RouterLink>
			</NSpace>
		</NCard>

		<NCard size="small">
			<template #header>
				<RouterLink :to="{ name: 'sub.all' }"
					class="block font-bold px-2 rounded transition ease-out"
					:class="[store.getHoverPrimaryBgColor]">
					Your communities
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
			<span class="block"
				v-for="i in 10">(some stuff here, might add later)</span>
		</NCard>
	</NSpace>
</template>

