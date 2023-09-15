<script setup>
import {
	NUpload,
	NUploadDragger,
	NCard,
	NButton,
	NSpace,
} from 'naive-ui';
import renderIcon from '../services/renderIcon';
import { Icon } from '@iconify/vue';
import imageApi from '../services/apis/backend/imageApi';

const uploadProfilePictureEndpoint = imageApi.profileImageUploadEndpoint();

</script>

<template>
	<NCard>
		<NUpload :default-upload="true"
			:multiple="false"
			:action="uploadProfilePictureEndpoint">
			<NUploadDragger>
				<NSpace class="my-10"
					vertical
					justify="center"
					align="center">
					<Icon class="text-4xl"
						icon="tabler:drag-drop-2" />
					<span>Click here or drop the image file here</span>

				</NSpace>

			</NUploadDragger>
		</NUpload>

		<!-- <NSpace>
			<NButton type="primary"
				:render-icon="() => renderIcon('fe:picture-square')">Set as profile picture</NButton>
			<NButton :render-icon="() => renderIcon('fe:close')">Cancel</NButton>
		</NSpace> -->
	</NCard>
</template>