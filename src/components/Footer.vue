<script setup>

import { useStore } from '../stores/store';
const store = useStore();
</script>

<template>
	<div
		class="-mb-10 max-w-3xl mx-auto py-[10px] flex justify-center font-bold shadow-2xl hover:scale-110 transition ease-out duration-300 rounded-t-xl"
		:class="[store.isBrightTheme ? 'bg-primary shadow-primary text-white' : 'bg-primary-dark shadow-primary-dark text-black',]">
		<span>Ultram forum</span>
	</div>
</template >
