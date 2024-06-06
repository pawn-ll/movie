import './assets/main.css'
import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import  router from '@/router';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)


const vuetify = createVuetify({
    components,
    directives,
})

app.use(router)
app.use(ElementPlus)
app.use(vuetify)
app.mount('#app')
