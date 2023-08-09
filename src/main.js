// tailwind
import './assets/tailwindInput.css';
import './assets/tailwindOutput.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';


import App from './App.vue';
import router from './router';

// avoid conflict with tailwindcss
const meta = document.createElement('meta');
meta.name = 'naive-ui-style';
document.head.appendChild(meta);

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

app.mount('#app');
