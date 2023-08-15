import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useStore = defineStore('store', () => {
	const isBrightTheme = ref(false);
	const isCollapsedSidebar = ref(false);

	return {
		isBrightTheme,
		isCollapsedSidebar,
	};
},
	{
		persist: true
	}
);
