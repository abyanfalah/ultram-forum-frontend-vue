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

	const getPrimaryTextColor = computed(() => {
		return isBrightTheme.value ? "text-primary " : "text-primary-dark ";
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

	return {
		migrate,

		isBrightTheme,
		isCollapsedSidebar,
		isAbsoluteSidebar,
		headerOffset,
		getPrimaryBgColor,
		getPrimaryTextColor,
		goToMyProfilePage,
		profilePage,
	};
},
	{
		persist: true
	}
);
