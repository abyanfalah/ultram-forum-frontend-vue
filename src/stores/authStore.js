import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import authApi from '../services/apis/backend/authApi';
import router from '../router';




export const useAuthStore = defineStore('auth',
	() => {

		const user = ref({});
		const isLogin = ref(false);
		const myId = computed(() => user.value.id);


		async function checkAuth() {
			try {
				const res = await authApi.checkAuth();
				isLogin.value = res;

				if (isLogin.value === false) {
					user.value = Object.assign({});
					return res;
				}
			} catch (error) {
				console.log('check auth error: ', error);
			}
		}

		async function logout() {
			const res = await authApi.logout();
			// console.log('logout: ', res);

			const statusCode = res?.status ?? null;

			if (statusCode == 204 || statusCode == 200) {
				isLogin.value = false;
				// msg.success('Logout success!');
				return router.replace({ name: 'auth' });
				user.value = Object.assign({});
			}

			// in case for something needs to be added when 419
			if (statusCode == 419) {
				isLogin.value = false;
				// msg.error('Logout error: no token');
				return router.replace({ name: 'auth' });
			}

			// in case for something needs to be added when 401
			if (statusCode == 401) {
				isLogin.value = false;
				// msg.error('Logout error: no token');
				return router.replace({ name: 'auth' });
			}

			// msg.error('Logout failed');
			// return router.replace({ name: 'auth' });
		}

		return {
			user,
			isLogin,
			checkAuth,
			logout,
			myId,
		};
	},
	{ persist: true }
);
