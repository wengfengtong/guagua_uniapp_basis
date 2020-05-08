
const app = {
  state: {
    appLaunchOptions: {},// 小程序的启动参数
  },
  mutations: {
    setAppLaunchOptions: (state, data) => {
      state.appLaunchOptions = data;
    }
  },
  actions: {
    setCurrentMapDiotData({ commit }, appLaunchOptions) {
      commit('setAppLaunchOptions', appLaunchOptions);
    }

  }
};

export default app;
