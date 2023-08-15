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


import {
	NDialogProvider,
	NNotificationProvider,
	NMessageProvider,
	NLoadingBarProvider,
	NConfigProvider,
	NLayoutContent,
} from "naive-ui";

import {
	NLayoutSider,
	NLayoutHeader,
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


// router.replace('/thread/new');
// router.replace('/testpage');


onBeforeMount(async () => {
	// authStore.checkAuth();

});

</script>

<template>
	<NConfigProvider :theme="theme">
		<NMessageProvider>
			<NDialogProvider>
				<NLoadingBarProvider>
					<NNotificationProvider>

						<!-- content -->
						<NLayout has-sider
							embedded
							position="absolute"
							class="min-h-screen">
							<!-- sidebar -->
							<NLayoutSider v-if="authStore.isLogin"
								:native-scrollbar="false"
								show-trigger="bar"
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
									<main :class="{ 'p-4 max-w-[800px]  mx-auto': authStore.isLogin }"
										class="">
										<RouterView />
									</main>
								</NLayoutContent>

							</NLayout>
						</NLayout>
						<!-- end of content -->

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