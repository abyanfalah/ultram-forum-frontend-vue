<script setup>
import {
	NAvatar,
	NButton,
} from 'naive-ui';

const props = defineProps(['user']);

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
				size="small"
				role="button"
				round
				@click=""></NAvatar>
			<span class="font-bold">{{ user?.name }}</span>

		</RouterLink>
	</NButton>
</template>