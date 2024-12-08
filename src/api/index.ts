import axios from "axios";
import store from "@/store";

// 创建 Axios 实例
const apiClient = axios.create({
  baseURL: "http://localhost:3000/api", // 替换为后端地址
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器：自动携带 Token
apiClient.interceptors.request.use(
  (config) => {
    const token = store.getters.getToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器：处理全局错误
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch("logout");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
