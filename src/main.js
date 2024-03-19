import './assets/main.css'

import { createApp } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import Home from '../src/pages/Home.vue'
import Favorites from '../src/pages/Favorites.vue'
const app = createApp(App)

const routes = [
  { path: '/', component: Home },
  { path: '/favorites', component: Favorites }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})
app.use(autoAnimatePlugin)
app.use(router)
app.mount('#app')
