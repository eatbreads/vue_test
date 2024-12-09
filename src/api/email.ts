import apiClient from "@/api/index";

// 发送邮件 API
export const sendEmail = async (to: string, subject: string, body: string) => {
  try {
    const response = await apiClient.post("/api/send", { to, subject, body });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "发送失败");
  }
};
