import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles.css'

createApp(App).use(store).use(router).mount('#app')
