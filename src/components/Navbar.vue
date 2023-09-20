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
import { computed, h, ref } from 'vue';
import renderIcon from '../services/renderIcon';
import { useAuthStore } from '../stores/authStore';
import authApi from '../services/apis/backend/authApi';
import router from '../router';
import { useStore } from '../stores/store';

const msg = useMessage();
const dialog = useDialog();

const authStore = useAuthStore();
const store = useStore();

const userMenuOptions = ref([
	{
		label: 'Profile',
		key: 'profile',
		icon: () => renderIcon('fe:user'),
		action: () => store.goToMyProfilePage(false),
	},
	{
		label: 'My sub',
		key: 'my-sub',
		icon: () => renderIcon('fe:layer'),
		// action: () => alert('why'),
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
	{
		label: 'New sub',
		key: 'new-sub',
		icon: () => renderIcon('fe:layer'),
		action: () => router.push({ name: 'sub.new' }),
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
		positiveText: 'Logout',
		positiveButtonProps: { renderIcon: () => renderIcon('fe:logout') },
		onPositiveClick: () => authStore.logout(),
		negativeText: 'Cancel',
		negativeButtonProps: { renderIcon: () => renderIcon('fe:close') },
	});

}

const logoClass = computed(() => {
	if (store.isBrightTheme) {
		return 'bg-primary text-white hover:bg-white hover:text-primary border border-primary';
	} else {
		return 'bg-primary-dark text-black hover:bg-[#18181C] hover:text-primary-dark border border-primary-dark';
	}
})


</script>

<template>
	<nav class="px-4 py-4 ">
		<NSpace justify="space-between"
			align="center">

			<div class="flex items-center space-x-2">
				<NButton quaternary
					:render-icon="() => renderIcon('fe:bar')"
					@click="store.isCollapsedSidebar = !store.isCollapsedSidebar" />

				<!-- logo -->
				<RouterLink :to="{ name: 'home' }">
					<span class="font-bold py-1 px-4 rounded hover:scale-110 transition ease-out"
						:class="logoClass">Ultram</span>
				</RouterLink>

			</div>

			<NSpace align="center">

				<!-- add stuff -->
				<NDropdown trigger="click"
					@select="(key, option) => { option.action() }"
					:show-arrow="false"
					size="medium"
					animated
					:options="addPostOptions">
					<NButton text
						:render-icon="() => renderIcon('fe:plus')" />
				</NDropdown>

				<RouterLink :to="{ name: 'chat.list' }">
					<NButton text
						:render-icon="() => renderIcon('fe:mail')"></NButton>
				</RouterLink>

				<!-- profile menu -->
				<div>
					<NDropdown trigger="click"
						@select="(key, option) => { option.action() }"
						:show-arrow="false"
						animated
						:options="userMenuOptions">
						<NAvatar :src="authStore.myProfilePicUrl"
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