<script setup>
import renderIcon from '../services/renderIcon';
import { Icon } from '@iconify/vue';
import { useStore } from '../stores/store';
import ThemeSwitcher from './ThemeSwitcher.vue';

import {
	NSwitch,
	NDivider,
	NMenu,
	NSpace,
	NButton,
	useMessage,
	NPopconfirm,
} from 'naive-ui';
import { h, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const store = useStore();
const msg = useMessage();
function migrate() {
	if (authStore.user.username != "abyan" || authStore.myId != 2) {
		return msg.error("You think im gonna let you do that?");
	}


	store.migrate();
	msg.info('Migrated');
}

const shortcutsRef = ref();
const selectedShortcut = ref();
const shortcuts = ref([
	{
		label: () =>
			h(RouterLink, {
				to: { name: 'testpage' },
				onClick: () => shortcuts.value
			})
	}
])

</script>

<template>
	<div class="p-4"
		style="z-index: 999;">
		<div class="flex justify-end">
			<NButton quaternary
				block
				@click="store.isCollapsedSidebar = true"
				:render-icon="() => renderIcon('fe:arrow-left')">Close sidebar</NButton>
		</div>

		<NDivider>Shortcuts</NDivider>


		<!-- options -->
		<!-- <NDivider /> -->
		<!-- dark mode -->

		<div class="flex flex-col space-y-4">
			<div class="flex w-full justify-between items-center">
				<span>Theme</span>
				<ThemeSwitcher />
			</div>

			<div class="flex w-full justify-between items-center">
				<span>Absolute sidebar</span>
				<NSwitch v-model:value="store.isAbsoluteSidebar" />

			</div>

		</div>

		<NSpace vertical
			justify="end"
			class="mt-4">

			<RouterLink :to="{ name: 'testpage' }">
				<NButton block
					type="info">
					Testpage
				</NButton>
			</RouterLink>

			<RouterLink :to="{ name: 'users' }">
				<NButton block
					type="primary">
					Users
				</NButton>
			</RouterLink>

			<RouterLink :to="{ name: 'sub.all' }">
				<NButton block
					type="tertiary">
					Sub forums
				</NButton>
			</RouterLink>

			<NPopconfirm @positive-click="migrate">
				Migrate the db?
				<template #trigger>
					<NButton block
						type="warning">
						Migrate
					</NButton>
				</template>
			</NPopconfirm>

		</NSpace>

	</div>
</template>