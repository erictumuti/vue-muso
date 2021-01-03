import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//global styles
import './assets/main.css'

// not redirect to login if user is logged in

import { projectAuth } from '@/firebase/config'

let app

projectAuth.onAuthStateChanged(() => {
	if(!app) {
		app = createApp(App).use(router).mount('#app')
	}
})
