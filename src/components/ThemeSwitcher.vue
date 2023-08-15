<script setup>
import renderIcon from '../services/renderIcon';
import { Icon } from '@iconify/vue';
import { useStore } from '../stores/store';

import {
	NSwitch,
} from 'naive-ui';

const store = useStore();


</script>

<template>
	<NSwitch v-model:value="store.isBrightTheme">
		<template #unchecked-icon>
			<Icon icon="fe:moon" />
		</template>

		<template #checked-icon>
			<Icon icon="fe:sunny-o" />
		</template>

		<template #unchecked>
			Dark
		</template>

		<template #checked>
			Bright
		</template>
	</NSwitch>
</template>