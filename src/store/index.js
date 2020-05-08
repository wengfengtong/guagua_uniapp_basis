import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import app from './modules/app';
import getters from './getters';

Vue.use(Vuex);

const isDev = process.env.NODE_ENV === 'development';
const store = new Vuex.Store({
  modules: {
    app
  },
  getters,
  plugins: isDev ? [createLogger({})] : []
});

export default store;
