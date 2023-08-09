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
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('../views/AboutView.vue')
		},
		{
			path: '/testpage',
			name: 'testpage',
			component: () => import('../views/TestPage.vue')
		},
		{
			path: '/auth',
			name: 'auth',
			meta: {
				authPage: true,
			},
			component: () => import('../views/AuthView.vue')
		},
	]
});

router.beforeEach((to, from) => {
	useAuthStore().checkAuth();
	const isLogin = useAuthStore().isLogin;
	console.log(isLogin);
	if (isLogin && to.meta.authPage == true) { router.replace({ name: 'home' }); }
	else if (isLogin == false && to.meta.authPage == false) { return { name: 'auth' }; }

});


export default router;
