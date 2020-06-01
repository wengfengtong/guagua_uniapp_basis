import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import baseModule from './modules/base';
import getters from './getters';

Vue.use(Vuex);

const isDev = process.env.NODE_ENV === 'development';
const store = new Vuex.Store({
  modules: {
    baseModule
  },
  getters,
  plugins: isDev ? [createLogger({})] : []
});

export default store;
