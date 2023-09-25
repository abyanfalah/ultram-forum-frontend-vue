<script setup>
import {
	NButton,
	useMessage,
	useDialog,
} from 'naive-ui';
import renderIcon from '../services/renderIcon';
import { computed, onMounted, ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import followApi from '../services/apis/backend/followApi';
import subForumApi from '../services/apis/backend/subForumApi';

const store = useAuthStore();

const msg = useMessage();
const dialog = useDialog();

const props = defineProps(['subForum', 'isBlock']);

const busy = ref(false);
const emits = defineEmits(['toggleJoin']);

const isJoined = computed(() => {
	return props?.subForum.is_joined;
});


const buttonText = computed(() => {
	return isJoined.value ? 'Leave sub' : 'Join sub';
});

async function toggleJoinSub() {
	try {
		busy.value = true;
		const res = await subForumApi.toggleJoin(props?.subForum.id);
		console.log(res.data.is_joined, res.data);
		emits('toggleJoin', res.data);

		if (res.data.is_joined) {
			msg.success(`You joined ${props?.subForum.name}!`);
		} else {
			msg.success(`You left ${props?.subForum.name}`);
		}

	} catch (error) {
		console.error('Action failed: ', error);
		msg.error('Action failed');

	} finally {
		// busy.value = false;

		setTimeout(() => {
			busy.value = false;
		}, 300);
	}
}

function confirmLeaveSub() {
	if (isJoined.value == false) return toggleJoinSub();

	dialog.error({
		title: 'Leave sub forum',
		content: 'Are you sure?',
		positiveText: 'Leave',
		positiveButtonProps: { renderIcon: () => renderIcon('fe:logout') },
		onPositiveClick: () => toggleJoinSub(),
		negativeText: 'Cancel',
		negativeButtonProps: { renderIcon: () => renderIcon('fe:close') },
	});
}

onMounted(() => {
	// console.log(props.subForum);
});
</script>

<template>
	<NButton @click="confirmLeaveSub"
		:block="isBlock"
		:type="subForum?.is_joined ? 'default' : 'primary'"
		:loading="busy"
		:render-icon="() => renderIcon(subForum?.is_joined ? 'fe:logout' : 'fe:login')">
		{{ buttonText }}
	</NButton>
</template>