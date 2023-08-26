<script setup>

import { useStore } from '../stores/store';
const store = useStore();
</script>

<template>
	<div class="py-[20px] flex justify-center font-bold  shadow rounded-t-xl"
		:class="[store.isBrightTheme ? 'bg-primary text-white' : 'bg-primary-dark text-black',]">
		<span>Ultram forum</span>
	</div>
</template >
