<script setup>
import axios from 'axios';
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import authApi from './services/apis/backend/authApi';
import router from './router';
import { useAuthStore } from './stores/authStore';
import { useStore } from './stores/store';
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import Footer from './components/Footer.vue';

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


const authStore = useAuthStore();
const store = useStore();

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
					<NNotificationProvider>

						<!-- app -->
						<NLayout>

						</NLayout>
						<NLayout has-sider
							embedded
							position="absolute"
							class="min-h-screen">

							<!-- sidebar -->
							<NLayoutSider v-if="authStore.isLogin"
								:native-scrollbar="false"
								show-trigger="bar"
								width="200"
								:position="sidebarPosition"
								@collapse="store.isCollapsedSidebar = true"
								@expand="store.isCollapsedSidebar = false"
								:collapsed="store.isCollapsedSidebar"
								:collapsed-width="0"
								bordered>
								<Sidebar />
							</NLayoutSider>

							<!-- content -->
							<NLayout position="relative">
								<!-- header -->
								<NLayoutHeader v-if="authStore.isLogin"
									bordered>
									<Navbar />
								</NLayoutHeader>

								<!-- page -->
								<NLayoutContent :native-scrollbar="false"
									position="absolute"
									:style="{ top: authStore.isLogin ? '4.3rem' : null }">
									<main class="min-h-[90dvh]"
										:class="{ 'p-4 max-w-[800px]  mx-auto': authStore.isLogin }">
										<RouterView />
									</main>

									<!-- footer -->
									<!-- <NLayoutFooter>
										<Footer />
									</NLayoutFooter> -->
									<div>
										<Footer />
									</div>
								</NLayoutContent>


							</NLayout>


						</NLayout>
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