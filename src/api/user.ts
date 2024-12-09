import apiClient from "@/api/index";

// 登录接口
export const login = async (email: string, password: string) => {
  const response = await apiClient.post("/users/login", { email, password });
  return response.data;
};
