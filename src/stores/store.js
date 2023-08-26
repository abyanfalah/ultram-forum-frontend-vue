import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useStore = defineStore('store', () => {
	const isBrightTheme = ref(false);
	const isCollapsedSidebar = ref(false);
	const isAbsoluteSidebar = ref(false);

	const headerOffset = 45;

	return {
		isBrightTheme,
		isCollapsedSidebar,
		isAbsoluteSidebar,
		headerOffset,
	};
},
	{
		persist: true
	}
);
