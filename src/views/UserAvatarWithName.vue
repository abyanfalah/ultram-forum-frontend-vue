<script setup>
import {
	NAvatar,
	NButton,
} from 'naive-ui';

const props = defineProps(['user', 'avatarSize', 'withUsername']);
</script>

<template>
	<NButton text>
		<RouterLink :to="{
			name: 'profile',
			params: { username: user?.username }
		}"
			class=" flex space-x-2 items-center ">
			<NAvatar src="/img/miku.jpg"
				fallback-src="/img/user-default.svg"
				:size="avatarSize ?? 'small'"
				role="button"
				round
				@click=""></NAvatar>
			<div class="flex flex-col items-start space-y-1">
				<span class="font-bold">{{ user?.name }}</span>
				<span v-if="withUsername"
					class="text-neutral-500">@{{ user?.username }}</span>

			</div>

		</RouterLink>
	</NButton>
</template>