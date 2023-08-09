import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import authApi from '../services/apis/backend/authApi';
import router from '../router';

export const useAuthStore = defineStore('auth',
	() => {
		const user = ref({});
		const isLogin = ref(false);

		async function checkAuth() {
			const res = await authApi.checkAuth();
			isLogin.value = res;
			sessionStorage.setItem('isLogin', res);

			if (isLogin.value === false) { router.replace({ name: 'auth' }); }
			else { router.replace({ nae: 'home' }); }

			return res;
		}

		return {
			user,
			isLogin,
			checkAuth,
		};
	},
	{ persist: true }
);
