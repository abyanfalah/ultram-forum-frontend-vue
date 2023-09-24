import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import router from '../router';
import { useAuthStore } from './authStore';
import axios from 'axios';


export const useStore = defineStore('store', () => {
	const ax = axios;
	// ====

	const authStore = useAuthStore();

	const isBrightTheme = ref(false);
	const isCollapsedSidebar = ref(false);
	const isAbsoluteSidebar = ref(false);

	const getPrimaryBgColor = computed(() => {
		return isBrightTheme.value ? "bg-primary text-white" : "bg-primary-dark text-black";
	});

	const getHoverPrimaryBgColor = computed(() => {
		return isBrightTheme.value ? "hover:bg-primary hover:text-white" : "hover:bg-primary-dark hover:text-black";
	});

	const getPrimaryTextColor = computed(() => {
		return isBrightTheme.value ? "text-primary " : "text-primary-dark ";
	});

	const getHoverPrimaryTextColor = computed(() => {
		return isBrightTheme.value ? "hover:text-primary " : "hover:text-primary-dark ";
	});

	const getPrimaryBgHighlightColor = computed(() => {
		return isBrightTheme.value ? "bg-primary-highlight " : "bg-primary-dark-highlight ";
	});

	const headerOffset = 45;

	function goToMyProfilePage(isReplaceRoute) {
		isReplaceRoute = isReplaceRoute || false;

		if (isReplaceRoute) {
			return router.replace({
				name: 'profile',
				params: { username: authStore.user.username }
			});
		}

		return router.push({
			name: 'profile',
			params: { username: authStore.user.username }
		});
	}

	const profilePage = ref({
		name: 'profile',
		params: { username: authStore.user.username }
	});


	async function migrate() {
		await ax.get('http://localhost:8000/migrate');
	}

	const currentSubForum = ref({});

	const showPostRepliesByDefault = ref(true);

	return {
		migrate,
		showPostRepliesByDefault,
		isBrightTheme,
		isCollapsedSidebar,
		isAbsoluteSidebar,
		headerOffset,
		getPrimaryBgColor,
		getHoverPrimaryBgColor,
		getPrimaryTextColor,
		goToMyProfilePage,
		getPrimaryBgHighlightColor,
		getHoverPrimaryTextColor,
		profilePage,
		currentSubForum,
	};
},
	{
		persist: true
	}
);
