<script setup>
import { onMounted } from 'vue';
import threadApi from '../services/apis/backend/threadApi';
import axios from 'axios';
import authApi from '../services/apis/backend/authApi';
import RequiresEmailVerificationCard from '../components/RequiresEmailVerificationCard.vue';
import { NDivider } from 'naive-ui';
const baseurl = 'http://localhost:8000/api/token/test';

</script>

<template>
	<RequiresEmailVerificationCard />
</template>