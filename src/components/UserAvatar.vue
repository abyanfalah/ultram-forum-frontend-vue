<script setup>
import { NAvatar } from 'naive-ui';

const props = defineProps(['user', 'size'])




</script>

<template>
	<NAvatar :src="`img`"
		fallback-src="/img/miku.jpg"
		size="small"
		role="button"
		round>
	</NAvatar>
</template >
