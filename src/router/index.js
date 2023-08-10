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
			path: '/me',
			name: 'profile',
			component: () => import('../views/ProfileView.vue'),
			meta: { requiresAuth: true },
		},
		{
			path: '/post/new',
			name: 'post.new',
			component: () => import('../views/NewPostView.vue'),
			meta: { requiresAuth: true },
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
			meta: { requiresAuth: false },
		},
		{
			path: '/auth',
			name: 'auth',
			component: () => import('../views/AuthView.vue'),
			meta: { requiresAuth: false },
		},
	]
});

router.beforeEach((to, from, next) => {
	const isLogin = useAuthStore().isLogin;
	// console.log('isLogin: ', isLogin);

	if (!isLogin && to.meta.requiresAuth) { return next({ name: 'auth' }); }
	else if (isLogin && to.name == 'auth') { return next({ name: 'home' }); }
	else return next();

});


export default router;
