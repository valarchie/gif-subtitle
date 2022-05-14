import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/base.css'


var app = createApp(App);

app.use(ElementPlus).mount('#app')
