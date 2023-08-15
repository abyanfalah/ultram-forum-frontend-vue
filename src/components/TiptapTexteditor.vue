<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { onMounted, ref } from 'vue';

const editor = useEditor({
	content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
	extensions: [
		StarterKit,
	],
})



</script>

<template>
	tiptap
	<EditorContent :editor="editor" />
</template>