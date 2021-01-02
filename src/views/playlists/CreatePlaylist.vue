<template>
<h4>create New Playlist</h4>
<form @submit.prevent="handleSubmit">
	<input type="text" required placeholder="Playlist title" v-model="title">
	<textarea required placeholder="Playlist description..." v-model="description"></textarea>
	<input type="file" @change="handleChange">
	<div class="error">{{ fileError }}</div>
	<button>Create playlist</button>
</form>
</template>

<script>
import useStorage from '@/composables/useStorage'
import { ref } from 'vue'
export default {
	setup(){
		const { url, filePath, uploadImage } = useStorage()

		const title = ref('')
		const description = ref('')
		const file = ref(null)
		const fileError = ref(null)

		const handleSubmit = async () => {
			if(file.value){
				await uploadImage(file.value)
				console.log('image uploaded, url: ', url.value)
			}
		}
		// handle files
		const handleChange = (e) => {
			const selected = e.target.files[0]
			console.log(selected)

			// allowed file types
			const types = ['image/png', 'image/jpeg', 'image/jpg']

			if(selected && types.includes(selected.type)){
				file.value = selected
				fileError.value = null
			} else{
				file.value = null
				fileError.value = 'Please select an image file(png,jpeg or jpg)'
			}
		}
		return { title, description, handleSubmit, handleChange, fileError }
	}
}
</script>

<style>

</style>