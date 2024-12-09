import axios from "axios";
import { useAuthStore } from "@/stores"; // 引入 useAuthStore

// 创建 Axios 实例
const apiClient = axios.create({
  baseURL: "http://localhost:8080", // 替换为后端地址
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器：自动携带 Token
apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore(); // 获取 auth store 实例
    const token = authStore.getToken; // 使用 Pinia 的 getter 获取 Token
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
      const authStore = useAuthStore(); // 获取 auth store 实例
      authStore.logout(); // 调用 Pinia 的 action 进行登出处理
    }
    return Promise.reject(error);
  }
);

export default apiClient;
