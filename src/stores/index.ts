import { createStore } from "vuex";

export default createStore({
  state: {
    token: "", // 保存登录后的 Token
    user: null, // 保存用户信息
  },
  mutations: {
    setToken(state, token: string) {
      state.token = token;
    },
    setUser(state, user: object) {
      state.user = user;
    },
    clearAuth(state) {
      state.token = "";
      state.user = null;
    },
  },
  actions: {
    login({ commit }, { email, password }: { email: string; password: string }) {
      // 发起登录请求
      return new Promise((resolve, reject) => {
        import("@/api/user") // 动态导入 User API 模块
          .then(({ login }) => {
            login(email, password)
              .then((response) => {
                commit("setToken", response.data.token);
                commit("setUser", response.data.user);
                resolve(response);
              })
              .catch((error) => {
                reject(error);
              });
          });
      });
    },
    logout({ commit }) {
      commit("clearAuth");
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getToken: (state) => state.token,
    getUser: (state) => state.user,
  },
});
