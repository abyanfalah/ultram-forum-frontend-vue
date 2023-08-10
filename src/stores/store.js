import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useStore = defineStore('store', () => {
	const isDarkTheme = ref(false);
	const isCollapsedSidebar = ref(false);

	return {
		isDarkTheme,
		isCollapsedSidebar,
	};
},
	{
		persist: true
	}
);
