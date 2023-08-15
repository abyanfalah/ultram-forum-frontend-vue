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
		label: 'My threads',
		key: 'mythread',
		icon: () => renderIcon('fe:comments'),
		action: () => router.push({ name: 'me.thread' }),
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

const addPostOptions = ref([
	{
		label: 'New thread',
		key: 'new-thread',
		icon: () => renderIcon('fe:text-align-left'),
		action: () => router.push({ name: 'thread.new' }),
	},
	{ type: 'divider' },
	{
		label: 'Something else',
		action: () => msg.info('might add later...')
	},
]);

function confirmLogout() {

	dialog.error({
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
				<span
					class="font-bold py-1 px-4 bg-white text-primary rounded hover:bg-primary hover:text-white hover:scale-110 transition ease-out">Ultram</span>
			</RouterLink>

			<NSpace align="center">

				<!-- add post -->
				<NDropdown trigger="click"
					@select="(key, option) => { option.action() }"
					:show-arrow="false"
					size="medium"
					animated
					:options="addPostOptions">
					<NButton text
						circle
						:render-icon="() => renderIcon('fe:plus')" />
				</NDropdown>


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





				<!-- profile menu -->
				<div>
					<NDropdown trigger="click"
						@select="(key, option) => { option.action() }"
						:show-arrow="false"
						size="medium"
						animated
						:options="userMenuOptions">
						<NAvatar src="/img/miku.jpg"
							fallback-src="/img/user-default.svg"
							size="small"
							role="button"
							round
							@click=""></NAvatar>
					</NDropdown>
				</div>

			</NSpace>

		</NSpace>
	</nav>
</template>