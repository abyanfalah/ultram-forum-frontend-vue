import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import authApi from '../services/apis/backend/authApi';

export const useAuthStore = defineStore('auth', () => {
	const user = ref({});
	const isLogin = ref(false);

	async function checkAuth() {
		const res = await authApi.checkAuth();
		isLogin.value = res;
		return res;
	}

	return {
		user,
		isLogin,
		checkAuth,
	};
});
