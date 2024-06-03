import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



//引入elementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//使用ElementPlus .use(ElementPlus)

//国际化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import axios from "axios";

createApp(App).use(store).use(router).use(ElementPlus,{locale: zhCn}).mount('#app')
