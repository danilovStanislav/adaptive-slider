import { createApp } from 'vue'
import App from './App.vue'
import { Vue3Mq } from 'vue3-mq'

import '@/styles/index.sass'

const app = createApp(App)

app
  .use(Vue3Mq, {
    breakpoints: {
      xs: 0,
      sm: 651,
      md: 769,
      lg: 993,
      xl: 1201,
    },
  })
  .mount('#app')
