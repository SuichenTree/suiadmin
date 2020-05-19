import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//全局注册导入axios
import axios from 'axios'
//axios配置
axios.defaults.baseURL="https://localhost:9090";
Vue.prototype.$axios=axios


//全局注册导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);



//全局注册mavonEditor(markdown编辑器)
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
