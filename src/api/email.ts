import axios from "axios";
import apiClient from "@/api/index";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api", // 替换为后端地址
  headers: {
    "Content-Type": "application/json",
  },
});

// 发送邮件 API
export const sendEmail = async (to: string, subject: string, body: string) => {
    try {
      const response = await apiClient.post("/send", { to, subject, body });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "发送失败");
    }
  };
