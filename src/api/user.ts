import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api", // 替换为后端地址
  headers: {
    "Content-Type": "application/json",
  },
});

// 登录接口
export const login = async (email: string, password: string) => {
  const response = await apiClient.post("/users/login", { email, password });
  return response.data;
};
