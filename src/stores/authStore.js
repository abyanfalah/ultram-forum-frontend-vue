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

			if (isLogin.value === false) {
				user.value = Object.assign({});
			}
			// else { router.replace({ name: 'home' }); }
			return res;
		}

		async function logout() {
			const res = await authApi.logout();
			console.log('logout: ', res);

			if (res?.status == 204 || res?.status == 200) {
				isLogin.value = false;
				router.replace({ name: 'auth' });
			}
		}

		return {
			user,
			isLogin,
			checkAuth,
			logout,
		};
	},
	{ persist: true }
);
