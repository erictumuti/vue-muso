<template>
  <div class="navbar">
	  <nav>
		  <img src="@/assets/ninja.png">
		  <h1><router-link :to="{ name: 'Home' }">Muso Ninjas</router-link></h1>
		  <div class="links">
			  <div v-if="user">
				  <router-link :to="{ name: 'CreatePlaylist' }">Create playlist</router-link>
				  <button @click="handleClick">logout</button>
			  </div>
			  <div v-else>
				  <router-link class="btn" :to="{ name: 'Signup' }">Sign up</router-link>
			  <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
			  </div>
		  </div>
	  </nav>
  </div>
</template>

<script>
import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'
export default {
	setup(){
		const { error, logout, isPending } = useLogout()
		// for redirecting
		const router = useRouter()
		// to get user
		const { user } = getUser()


		const handleClick = async () => {
			await logout()
			if(!error.value) {
				console.log('user logged out')
				// redirect user (must use router)
				router.push({ name: 'Login' })
			}
		}
		return { handleClick, isPending, user }
	}
}
</script>

<style scoped>
.navbar {
 margin-bottom: 60px;
 padding: 16px 10px;
 background: white;
  }
  nav {
	  display: flex;
	  align-items: center;
	  max-width: 1200px;
	  margin: 0 auto;
  }
  nav h1 {
	  margin-left: 20px;
  }
  nav .links {
	  margin-left: auto;
  }
  nav .links a, button {
	  margin-left: 16px;
	  font-size: 14px;
  }
  nav img {
	  max-height: 60px;
  }
</style>