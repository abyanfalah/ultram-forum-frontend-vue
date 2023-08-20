<script setup>
import {
	NSpace,
	NButton,

} from 'naive-ui';
import { h } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps(['post']);

console.log(props.post);

</script>

<template>
	<!-- likes/dislikes -->
	<NSpace class="text-neutral-400">
		<div class="transition hover:scale-110 ease-out">
			<NButton text
				:render-icon="() => h(Icon, { icon: 'ant-design:like-outlined' })">
				{{ post?.likes }}
			</NButton>
		</div>

		<div class="transition hover:scale-110 ease-out">
			<NButton text
				:render-icon="() => h(Icon, { icon: 'ant-design:like-outlined', verticalFlip: true })">
				{{ post?.dislikes }}
			</NButton>
		</div>

	</NSpace>
</template>