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
} from 'naive-ui';
import { h, ref } from 'vue';
import { RouterLink } from 'vue-router';

const store = useStore();


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
	<div class="p-4">
		<NDivider>Shortcuts</NDivider>
		<!-- <NMenu :options="shortcuts"
			ref="shortcutsRef"
			v-model:value="selectedShortcut">
		</NMenu> -->


		<!-- options -->
		<!-- <NDivider /> -->
		<NDivider dashed>Quick settings</NDivider>

		<!-- dark mode -->
		<div class="flex w-full justify-between items-center">
			<span>Theme</span>
			<ThemeSwitcher />
		</div>

		<NSpace vertical
			justify="end">

			<RouterLink :to="{ name: 'testpage' }">
				<NButton>
					Testpage
				</NButton>
			</RouterLink>

		</NSpace>

	</div>
</template>