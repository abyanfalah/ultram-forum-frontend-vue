<script setup>
import axios from 'axios';
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import authApi from './services/apis/backend/authApi';
import router from './router';
import { useAuthStore } from './stores/authStore';
import { useStore } from './stores/store';
import Navbar from './components/Navbar.vue';

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
	if (useStore().isDarkTheme) return darkTheme;
	// return null;
	return darkTheme;
});

onBeforeMount(async () => {
	// authStore.checkAuth();

	router.push('/post/new');
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
								<div class="p-4">
									<span class="block"
										v-for="i in 100">sidebar</span>
								</div>

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
									:style="{ top: authStore.isLogin ? '4.2rem' : null }">
									<main :class="{ 'p-4': authStore.isLogin }">
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