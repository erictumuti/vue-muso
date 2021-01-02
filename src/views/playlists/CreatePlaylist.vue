<template>
<h4>create New Playlist</h4>
<form @submit.prevent="handleSubmit">
	<input type="text" required placeholder="Playlist title" v-model="title">
	<textarea required placeholder="Playlist description..." v-model="description"></textarea>
	<input type="file" @change="handleChange">
	<div class="error">{{ fileError }}</div>
	<button v-if="!isPending">Create playlist</button>
	<button v-if="isPending" disabled>Saving...</button>
</form>
</template>

<script>
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import { timestamp } from '@/firebase/config'
import getUser from '@/composables/getUser'
import { ref } from 'vue'
export default {
	setup(){
		const { url, filePath, uploadImage } = useStorage()
		const { error, addDoc } = useCollection('playlists')
		const { user } = getUser()

		const title = ref('')
		const description = ref('')
		const file = ref(null)
		const fileError = ref(null)
		const isPending = ref(false)

		const handleSubmit = async () => {
			if(file.value){
				// start ispending
				isPending.value = true
				// add image to firebase storage
				await uploadImage(file.value)
				// adding documents to firebase
				await addDoc({
					title: title.value,
					description: description.value,
					userId: user.value.uid,
					userName: user.value.displayName,
					coverUrl: url.value,
					fiePath: filePath.value,
					songs: [],
					createdAt: timestamp()
				})
				// end isPending
					isPending.value = false

				if(!error.value){
					console.log('Playlist added')
				}
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
		return { title, description, handleSubmit, handleChange, fileError, isPending }
	}
}
</script>

<style>

</style>