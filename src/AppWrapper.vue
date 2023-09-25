<script setup>
import { computed, ref } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useAuthStore } from './stores/authStore';
import { useStore } from './stores/store';
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';

import {
	NLayout,
	NLayoutContent,
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
const route = useRoute();






const sidebarPosition = computed(() => {
	return store.isAbsoluteSidebar ? 'absolute' : 'relative';
});



</script>

<template>
	<!-- app -->
	<NLayout>

	</NLayout>
	<NLayout has-sider
		embedded
		position="absolute"
		class="min-h-screen">

		<!-- sidebar -->
		<!-- <div class="h-screen"> -->
		<!-- <div class="lg:hidden"> -->
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

		<!-- </div> -->

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
					:class="{ 'p-4 max-w-screen-2xl  mx-auto': authStore.isLogin }">
					<RouterView :key="route.path" />
				</main>


				<div>
					<!-- <Footer /> -->
				</div>
			</NLayoutContent>


		</NLayout>


	</NLayout>
	<!-- end of app -->
</template>

