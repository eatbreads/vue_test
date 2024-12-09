import { defineStore } from "pinia";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  password?: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "",
    user: {
      id: 0,
      username: "",
      email: "",
      role: "",
    } as User,
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUser(user: User) {
      this.user = user;
    },
    clearAuth() {
      this.token = "";
      this.user = {
        id: 0,
        username: "",
        email: "",
        role: "",
      }; // 重置为默认值
    },
    async login(email: string, password: string) {
      try {
        const { login } = await import("@/api/user");
        const response = await login(email, password);
        this.setToken(response.data.token);
        this.setUser(response.data.user as User); // 类型断言
        return response;
      } catch (error) {
        throw error;
      }
    },
    logout() {
      this.clearAuth();
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getToken: (state) => state.token,
    getUser: (state) => state.user,
  },
});
