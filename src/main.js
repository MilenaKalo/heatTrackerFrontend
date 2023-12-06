import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import store from '@/store'

import VCalendar from 'v-calendar'
import 'v-calendar/style.css'

createApp(App)
  .use(router)
  .use(store)
  .use(VCalendar, {})
  .mount('#app')
