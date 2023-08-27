import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useAuthStore } from '../stores/authStore';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
			meta: { requiresAuth: true },
		},
		{
			path: '/profile/edit',
			name: 'profile.edit',
			component: () => import('../views/ProfileEditView.vue'),
			meta: { requiresAuth: true },
		},

		{
			path: '/me/thread',
			name: 'me.thread',
			component: () => import('../views/MyThreadView.vue'),
			meta: { requiresAuth: true },
		},
		{
			path: '/thread/new',
			name: 'thread.new',
			component: () => import('../views/NewThreadView.vue'),
			meta: { requiresAuth: true },
		},
		{
			path: '/thread/:slug',
			name: 'thread.view',
			component: () => import('../views/ThreadView.vue'),
			meta: { requiresAuth: true },
			props: true,
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('../views/AboutView.vue'),
			meta: { requiresAuth: true },
		},
		{
			path: '/testpage',
			name: 'testpage',
			component: () => import('../views/TestPage.vue'),
			meta: { requiresAuth: true },
		},
		// {
		// 	path: '/verifiy/:token',
		// 	name: 'testpage',
		// 	component: () => import('../views/TestPage.vue'),
		// 	meta: { requiresAuth: true },
		// },
		{
			path: '/auth',
			name: 'auth',
			component: () => import('../views/AuthView.vue'),
			meta: { requiresAuth: false },
		},

		// must place this as last route
		{
			path: '/:username',
			name: 'profile',
			component: () => import('../views/ProfileView.vue'),
			meta: { requiresAuth: true },
			props: true,
		},
	]
});

router.beforeEach((to, from, next) => {
	const authStore = useAuthStore();
	const isLogin = authStore.isLogin;
	// console.log('isLogin: ', isLogin);

	if (!isLogin && to.meta.requiresAuth) { return next({ name: 'auth' }); }
	else if (isLogin && to.name == 'auth') { return next({ name: 'home' }); }
	else return next();

});


export default router;
