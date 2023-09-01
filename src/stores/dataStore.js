import { ref, computed } from 'vue';
import { defineStore } from 'pinia';


export const useDataStore = defineStore('data', () => {
	const userList = ref([]);

	return {
		userList,
	};
},
	{
		persist: false,
	}
);
