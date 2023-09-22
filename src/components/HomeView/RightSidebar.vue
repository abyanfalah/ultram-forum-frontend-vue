<script setup>
import {
	NCard,
	NSpace,
	NDivider,
	NButton,

} from 'naive-ui';
import renderIcon from '../../services/renderIcon';
</script>

<template>
	<NSpace vertical="">
		<NCard size="small">
			<span>(some stuff here)</span>
		</NCard>

		<NCard size="small">
			<template #cover>
				<img class="h-10 object-cover"
					src="/img/pastel.png"
					alt="">
			</template>

			<div class="mb-4"></div>

			<p>
				Your personal Ultram frontpage. Come here to check in with your favorite communities.
			</p>

			<NDivider></NDivider>

			<NSpace vertical>
				<RouterLink :to="{ name: 'thread.new' }">
					<NButton block
						:render-icon="() => renderIcon('fe:text-align-left')"
						type=primary>Create thread</NButton>

				</RouterLink>


				<RouterLink :to="{ name: 'sub.new' }">
					<NButton block
						:render-icon="() => renderIcon('fe:layer')">Create sub forum</NButton>
				</RouterLink>
			</NSpace>
		</NCard>

		<NCard size="small">
			<span v-for="i in 10">(some stuff here, might add later)</span>
		</NCard>
	</NSpace>
</template>

