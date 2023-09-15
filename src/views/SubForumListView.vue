<script setup>
import { onMounted, ref } from 'vue';
import subForumApi from '../services/apis/backend/subForumApi';
import {
	useMessage,
	useLoadingBar,
} from 'naive-ui';
import SubForumCard from '../components/SubForumCard.vue';

const msg = useMessage();
const loading = useLoadingBar();

const subForums = ref([]);


async function getSubForums() {
	try {
		loading.start();
		const res = await subForumApi.getAll();
		console.log(res);
		subForums.value = res.data;
		loading.finish();
	} catch (error) {
		console.error('Failed retrieving sub forums: ', error``);
		msg.error('Failed retrieving sub forums');
		loading.error();
	}
}

function changeSubForumData(updatedSubForumData) {
	const subForumIndex = subForums.value.findIndex(sub => sub.id == updatedSubForumData.id);
	console.log(subForumIndex);
	subForums.value[subForumIndex] = Object.assign({}, updatedSubForumData);


}

onMounted(() => {
	getSubForums();
})



</script>

<template>
	<!-- <pre v-for="sub in subForums">
{{ sub }}
</pre> -->

	<SubForumCard v-for="sub in subForums"
		:key="sub.id"
		:sub-forum="sub"
		@data-changed="changeSubForumData"
		class="my-4" />
</template>