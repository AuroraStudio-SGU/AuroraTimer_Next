import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import {createPinia} from 'pinia'
import {router} from './utils/router'
import 'element-plus/dist/index.css'
import App from './App.vue'
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

const app = createApp(App)
app.use(createPinia())
   .use(router)
   .use(ElementPlus, {locale: zhCn,})
   .mount('#app')
