<template>
  <form @submit.prevent="handleSubmit">
	  <h3>Sign Up</h3>
	  <input type="text" placeholder="Name" v-model="name">
	  <input type="email" v-model="email" placeholder="Email">
	  <input type="password" v-model="password" placeholder="Password">
	  <div v-if="error" class="error">{{ error }}</div>
	  <button v-if="!isPending">Sign up</button>
	  <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>

<script>
import useSignup from '@/composables/useSignup'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
	setup() {
		const { error, signup, isPending } = useSignup()
		const router = useRouter()

		const email = ref('')
		const password = ref('')
		const name = ref('')

		const handleSubmit = async () => {
			const res = await signup(email.value, password.value, name.value)
			if(!error.value){
				console.log('User signed up')
				router.push({ name: 'Home' })
			}
		}
		return { error, isPending, email, password, handleSubmit, name }
	}
}
</script>

<style>

</style>