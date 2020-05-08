import Vue from 'vue'
import App from './App'
import api from './api/index';
import store from './store/index';
import Pages from './utils/router';

// 全局组件
import login from "@/components/login.vue";

Vue.component('login', login)


Vue.config.productionTip = false

App.mpType = 'app'

uni.$api = api;
Vue.prototype.$bus = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$uniPage = new Pages();

const app = new Vue({
	...App
})
app.$mount()

export default app;
