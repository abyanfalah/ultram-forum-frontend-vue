<script setup>
import { computed, h, onMounted, ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useAuthStore } from './stores/authStore';
import { useStore } from './stores/store';
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import {
	NLayout,
	NLayoutContent,
	NLayoutSider,
	NLayoutHeader,
	useNotification,
	darkTheme,
	useMessage,
	useLoadingBar,
	NAvatar,
	NButton,
} from 'naive-ui';
import imageApi from './services/apis/backend/imageApi';
import renderIcon from './services/renderIcon';
import { useChatStore } from './stores/chatStore';

const notification = useNotification();
const msg = useMessage();
const loading = useLoadingBar();

const authStore = useAuthStore();
const store = useStore();
const chatStore = useChatStore();
const route = useRoute();

const sidebarPosition = computed(() => {
	return store.isAbsoluteSidebar ? 'absolute' : 'relative';
});

const isNotInChatRoom = computed(() => route.name !== 'chat');

watch(() => authStore.user.id, (userId, oldUserId) => {
	if (!userId) {
		const userChannelName = `user-${oldUserId}`;
		window.Echo.leaveChannel(userChannelName);
		return;
	}

	// listen to user broadcast channel
	const userChannelName = `user-${userId}`;
	window.Echo.channel(userChannelName)
		.listen('MessageSent', (e) => {
			// console.log(e);

			if (isNotInChatRoom.value) {
				showMessageNotification(e);
			}

			console.log("is not in chat room", isNotInChatRoom.value);

			// showMessageNotification(e);

		});
});

function showMessageNotification(event) {
	const message = event.message;
	const sender = event.sender;
	notification.info({
		title: sender.name,
		content: message.content,
		duration: 5000,
		meta: 'now',
		avatar: () => h(NAvatar, {
			size: "small",
			objectFit: 'cover',
			round: true,
			src: imageApi.profileImageEndpoint(sender.id)
		}),
		action: () => h(NButton,
			{
				text: false,
				type: 'primary',
				renderIcon: () => renderIcon('fe:mail'),
				onClick: () => {
					notification.destroyAll();
					chatStore.goToConversation(message.conversation_id);
				},
			},
			{ default: () => 'Go to chat' }
		),
	});
};


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

