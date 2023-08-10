<script setup>
import {
	NSpace,
	NButton,
	NAvatar,
	NDropdown,
	NDivider,
	useMessage,
	useDialog,
} from 'naive-ui';
import { Icon } from '@iconify/vue';
import { h, ref } from 'vue';
import renderIcon from '../services/renderIcon';
import { useAuthStore } from '../stores/authStore';
import authApi from '../services/apis/backend/authApi';
import router from '../router';

const msg = useMessage();
const dialog = useDialog();

const authStore = useAuthStore();

const userMenuOptions = ref([
	{
		label: 'Profile',
		key: 'profile',
		icon: () => renderIcon('fe:user'),
		action: () => router.push({ name: 'profile' }),
	},
	{
		type: 'divider'
	},
	{
		label: 'Logout',
		key: 'logout',
		icon: () => renderIcon('fe:logout'),
		action: () => confirmLogout(),
	},
]);

function confirmLogout() {
	dialog.warning({
		title: 'Logout',
		content: 'Are you sure?',
		positiveText: 'Proceed',
		positiveButtonProps: { renderIcon: () => renderIcon('fe:logout') },
		onPositiveClick: () => authStore.logout(),
		negativeText: 'Cancel',
		negativeButtonProps: { renderIcon: () => renderIcon('fe:close') },
	});
}


</script>

<template>
	<nav class="px-4 py-4">
		<NSpace justify="space-between"
			align="center">
			<RouterLink :to="{ name: 'home' }">
				<span class="font-bold">TOKOKO</span>
			</RouterLink>

			<NSpace align="center">

				<!-- notification -->
				<NDropdown trigger="click"
					@select="(key, option) => { option.action() }"
					:show-arrow="false"
					size="medium"
					animated
					:options="userMenuOptions">
					<NButton text
						circle
						:render-icon="() => renderIcon('fe:bell')" />
				</NDropdown>


				<!-- shopping cart -->
				<NButton text
					circle
					:render-icon="() => renderIcon('fe:cart')" />


				<!-- profile menu -->
				<div>
					<NDropdown trigger="click"
						@select="(key, option) => { option.action() }"
						:show-arrow="false"
						size="medium"
						animated
						:options="userMenuOptions">
						<NAvatar src="./img/miku.jpg"
							fallback-src="./img/user-default.svg"
							size="small"
							role="button"
							@click=""></NAvatar>
					</NDropdown>
				</div>

			</NSpace>

		</NSpace>
	</nav>
</template>