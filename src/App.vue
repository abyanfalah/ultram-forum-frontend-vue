<script setup>
import axios from 'axios';
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import authApi from './services/apis/backend/authApi';
import router from './router';
import { useAuthStore } from './stores/authStore';
import { useStore } from './stores/store';
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import Footer from './components/Footer.vue';
import AppWrapper from './AppWrapper.vue';

import {
	NDialogProvider,
	NNotificationProvider,
	NMessageProvider,
	NLoadingBarProvider,
	NConfigProvider,
	NLayoutContent,
	NThemeEditor,
} from "naive-ui";

import {
	NLayoutSider,
	NLayoutHeader,
	NLayoutFooter,
	NLayout,
	useNotification,
	darkTheme,
} from 'naive-ui';
import { useChatStore } from './stores/chatStore';


const authStore = useAuthStore();
const store = useStore();
const chatStore = useChatStore();
const route = useRoute();

const theme = computed(() => {
	if (useStore().isBrightTheme) return null;
	return darkTheme;
});


const brightThemeOverride = {
	"common": {
		"primaryColor": "#4000FFFF",
		"primaryColorHover": "#593EA7FF",
		"primaryColorPressed": "#1D026FFF",
		"primaryColorSuppl": "#4A3686FF"
	}
};

const darkThemeOverride = {
	"common": {
		"primaryColor": "#897CFFFF",
		"primaryColorHover": "#9F95FFFF",
		"primaryColorPressed": "#6D5DFFFF",
		"primaryColorSuppl": "#4B3FB7FF"
	}
};

const themeOverrides = computed(() => {
	return store.isBrightTheme ? brightThemeOverride : darkThemeOverride;
});

// router.replace('/thread/new');
// router.replace('/testpage');
const sidebarPosition = computed(() => {
	return store.isAbsoluteSidebar ? 'absolute' : 'relative';
});

const showFooter = computed(() => {
	return router.currentRoute.name != 'chat';
});

onBeforeMount(async () => {
	// authStore.checkAuth();

});

</script>


<template>
	<NConfigProvider :theme-overrides="themeOverrides"
		:theme="theme">

		<!-- THEME EDITOR -->
		<!-- <NThemeEditor /> -->
		<!--  -->

		<NMessageProvider>
			<NDialogProvider>
				<NLoadingBarProvider>
					<NNotificationProvider placement="bottom-right">
						<!-- app -->
						<AppWrapper />
						<!-- end of app -->
					</NNotificationProvider>
				</NLoadingBarProvider>
			</NDialogProvider>
		</NMessageProvider>

	</NConfigProvider>
</template>

<style>
* {
	/* border: 1px solid red; */
}
</style>