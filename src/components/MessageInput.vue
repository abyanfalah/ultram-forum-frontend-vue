<script setup>
import {
	NButton,
	NInput
} from 'naive-ui';
import renderIcon from '../services/renderIcon';
import { ref } from 'vue';

const message = ref('');
async function sendMessage() {

}

</script>

<template>
	<div class="flex items-center justify-between space-x-2 p-4 w-full">
		<NInput v-model:value="message"
			placeholder="Type your message here"></NInput>
		<NButton type="primary"
			:disabled="!message"
			:render-icon="() => renderIcon('fe:paper-plane')">Send</NButton>
	</div>
</template>