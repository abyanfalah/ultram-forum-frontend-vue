<script setup>
import renderIcon from '../services/renderIcon';
import { Icon } from '@iconify/vue';
import { useStore } from '../stores/store';

import {
	NSwitch, useLoadingBar,
} from 'naive-ui';

const store = useStore();

</script>

<template>
	<NSwitch v-model:value="store.isAbsoluteSidebar">
	</NSwitch>
</template>