// tailwind
import './assets/tailwindInput.css';
import './assets/tailwindOutput.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import { useAuthStore } from './stores/authStore';

import App from './App.vue';
import router from './router';

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
