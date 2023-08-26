import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useStore = defineStore('store', () => {
	const isBrightTheme = ref(false);
	const isCollapsedSidebar = ref(false);
	const isAbsoluteSidebar = ref(false);

	const getPrimaryBgColor = computed(() => {
		return isBrightTheme.value ? "bg-primary text-white" : "bg-primary-dark text-black";
	});

	const getPrimaryTextColor = computed(() => {
		return isBrightTheme.value ? "text-primary " : "text-primary-dark ";
	});

	const headerOffset = 45;

	return {
		isBrightTheme,
		isCollapsedSidebar,
		isAbsoluteSidebar,
		headerOffset,
		getPrimaryBgColor,
		getPrimaryTextColor,
	};
},
	{
		persist: true
	}
);
