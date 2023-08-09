<script setup>
import axios from 'axios';
import { onBeforeMount, onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import authApi from './services/apis/backend/authApi';
import router from './router';
import { useAuthStore } from './stores/authStore';

import {
	NDialogProvider,
	NNotificationProvider,
	NMessageProvider,
	NLoadingBarProvider,
	NConfigProvider,
	NLayout,
	NLayoutSider,
	NLayoutHeader,
} from "naive-ui";


const authStore = useAuthStore();


onBeforeMount(async () => {
	// authStore.checkAuth();
})

</script>

<template>
	<NConfigProvider>
		<NMessageProvider>
			<NDialogProvider>
				<NLoadingBarProvider>
					<NNotificationProvider>

						<!-- content -->
						<NLayout has-sider>
							<!-- sidebar -->
							<NLayoutSider v-if="authStore.isLogin">
								sidebar
							</NLayoutSider>

							<!-- content -->
							<NLayout>
								<!-- header -->
								<NLayoutHeader v-if="authStore.isLogin"></NLayoutHeader>

								<!-- page -->
								<NLayout>
									<main>
										<RouterView />
									</main>
								</NLayout>

							</NLayout>
						</NLayout>
						<!-- end of content -->

					</NNotificationProvider>
				</NLoadingBarProvider>
			</NDialogProvider>
		</NMessageProvider>
	</NConfigProvider>
</template>