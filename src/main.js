// tailwind
import './assets/tailwindInput.css';
import './assets/tailwindOutput.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import { useAuthStore } from './stores/authStore';

import App from './App.vue';
import router from './router';

// idk what
import Echo from 'laravel-echo';
import pusher from 'pusher-js';

window.Pusher = pusher;

window.Echo = new Echo({
	broadcaster: 'pusher',
	key: import.meta.env.VITE_MIX_PUSHER_APP_KEY,
	wsHost: import.meta.env.VITE_MIX_PUSHER_HOST,
	wsPort: import.meta.env.VITE_MIX_PUSHER_PORT,
	wssPort: import.meta.env.VITE_MIX_PUSHER_PORT,
	cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
	forceTLS: false,
	encrypted: true,
	disableStats: true,
	enabledTransports: ['ws', 'wss'],
});


// window.Echo.channel(`test-channel`)
// 	.listen('TestEvent', (e) => {
// 		console.log(e);
// 	});



// end of it 


// prevent conflict with tailwindcss
const meta = document.createElement('meta');
meta.name = 'naive-ui-style';
document.head.appendChild(meta);

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);
app.use(pinia);

// check auth and redirect even before starting the app
useAuthStore().checkAuth();

app.use(router);
app.mount('#app');
