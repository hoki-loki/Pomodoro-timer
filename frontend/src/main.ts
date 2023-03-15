import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.scss'
import './assets/base.scss'
import { createPinia } from "pinia";

const app = createApp(App)
app.use(createPinia())
app.mount('#app')

