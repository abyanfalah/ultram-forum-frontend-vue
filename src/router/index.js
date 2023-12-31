import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../views/HomeView.vue'),

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

		// ========================================= THREAD
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

		// ========================================= SUB FORUM
		{
			path: '/sub/all',
			name: 'sub.all',
			component: () => import('../views/SubForumListView.vue'),
			meta: { requiresAuth: true },
		},
		{
			path: '/sub/new',
			name: 'sub.new',
			component: () => import('../views/NewSubView.vue'),
			meta: { requiresAuth: true },
		},
		{
			path: '/sub/thread/new',
			name: 'sub.thread.new',
			component: () => import('../views/NewSubThreadView.vue'),
			meta: { requiresAuth: true },
		},
		{
			path: '/sub/:slug',
			name: 'sub.view',
			component: () => import('../views/SubForumView.vue'),
			meta: { requiresAuth: true },
			props: true,
		},
		{
			path: '/sub/:subSlug/thread/:threadSlug',
			name: 'sub.thread.view',
			component: () => import('../views/SubForumThreadView.vue'),
			meta: { requiresAuth: true },
			props: true,
		},
		{
			path: '/sub/:slug/members',
			name: 'sub.member.list',
			component: () => import('../views/SubForumMemberListView.vue'),
			meta: { requiresAuth: true },
			props: true,
		},


		// ========================================= MISC

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
		// ========================================= CHAT
		{
			path: '/chat/list',
			name: 'chat.list',
			component: () => import('../views/ConversationListView.vue'),
			meta: { requiresAuth: true },
		},
		{
			path: '/chat',
			name: 'chat',
			component: () => import('../views/ChatRoomView.vue'),
			meta: {
				requiresAuth: true,
			},
		},
		// ========================================= user
		{
			path: '/users',
			name: 'users',
			component: () => import('../views/UserListView.vue'),
			meta: { requiresAuth: true },
		},


		// must place this as last route
		{
			path: '/:username',
			name: 'profile',
			component: () => import('../views/ProfileView.vue'),
			meta: { requiresAuth: true },
			props: true,
		},
		// {
		// 	path: '/:username/chat',
		// 	name: 'chat.private',
		// 	component: () => import('../views/ChatRoomPrivateView.vue'),
		// 	meta: { requiresAuth: true },
		// },
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
