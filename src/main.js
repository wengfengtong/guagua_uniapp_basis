import Vue from 'vue'
import App from './App'
import api from './api/index';
import store from './store/index';
import Pages from './utils/router';

// 全局组件
import icon from "@/components/Icon/index.vue";

Vue.component('g-icon', icon)


Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$bus = new Vue();
Vue.prototype.$store = store;
uni.$guaroute = uni.guaroute = new Pages();
uni.$api = uni.api = api;

const app = new Vue({
	...App
})
app.$mount()

export default app;
