import { ref, computed, onMounted, watch } from 'vue';
import { defineStore } from 'pinia';
import authApi from '../services/apis/backend/authApi';
import router from '../router';
import imageApi from '../services/apis/backend/imageApi';

export const useAuthStore = defineStore('auth',
	() => {

		const user = ref({});
		const isLogin = ref(false);
		const myId = computed(() => user.value?.id ?? null);
		const myProfilePicUrl = ref();

		async function checkAuth() {
			try {
				const res = await authApi.checkAuth();
				isLogin.value = res;

				if (isLogin.value === false) {
					user.value = Object.assign({});
					return res;
				}


				// listen to user broadcast channel
				const userChannelName = `user-${myId.value}`;
				window.Echo.channel(userChannelName)
					.listen('MessageSent', (e) => {
						// pushNewMessage(e.message);
						console.log(e);
					});

				myProfilePicUrl.value = imageApi.profileImageEndpoint(myId.value);
			} catch (error) {
				console.log('check auth error: ', error);
			}
		}

		async function logout() {
			const res = await authApi.logout();

			const statusCode = res?.status ?? null;

			if (statusCode == 204 || statusCode == 200) {
				isLogin.value = false;
				// msg.success('Logout success!');
				user.value = Object.assign({});
				return router.replace({ name: 'auth' });
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
				user.value = Object.assign({});
				return router.replace({ name: 'auth' });
			}

			// msg.error('Logout failed');
			// return router.replace({ name: 'auth' });
		}

		async function clientSideLogout() {
			isLogin.value = false;
			user.value = Object.assign({});
			router.replace({ name: 'auth' });
			// console.clear();
			console.log('Session expired. You are logged out.');
			return;
		}



		return {
			user,
			isLogin,
			checkAuth,
			logout,
			clientSideLogout,
			myId,
			myProfilePicUrl,

		};
	},
	{ persist: true }
);
