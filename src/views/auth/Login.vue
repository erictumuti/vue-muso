<template>
  <form @submit.prevent="handleSubmit">
	  <h3>Login Page</h3>
	  <input type="email" v-model="email" placeholder="Email">
	  <input type="password" v-model="password" placeholder="Password">
	  <div v-if="error" class="error">{{ error }}</div>
	  <button v-if="!isPending">Log in</button>
	  <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>

<script>
import useLogin from '@/composables/useLogin'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
	setup() {
		const {error, login, isPending} = useLogin()
		const router = useRouter()

		const email = ref('')
		const password = ref('')

		const handleSubmit = async () => {
			const res = await login(email.value, password.value)
			if(!error.value){
				console.log('User logged in')
				router.push({ name: 'Home' })
			}
		}

		return { email, password, handleSubmit, error, isPending }
	}
}
</script>

<style>

</style>