<template>
    <div>
      <h1>欢迎使用邮件</h1>
      <EmailSender />
      <button @click="goToVideoChat" class="video-chat-btn">进入视频通话</button>
      <button @click="goToChatRoom" class="chat-btn">进入聊天室</button> <!-- 新增聊天室按钮 -->
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import { useRouter } from "vue-router"; // 引入 useRouter
  import EmailSender from "@/components/EmailSender.vue";
  
  export default defineComponent({
    name: "Home",
    components: {
      EmailSender,
    },
    setup() {
      const router = useRouter();
  
      const goToVideoChat = () => {
        router.push("/video-chat"); // 导航到视频通话页面
      };
  
      const goToChatRoom = () => {
        router.push("/chat"); // 导航到聊天室页面
      };
  
      return {
        goToVideoChat,
        goToChatRoom, // 新增聊天室导航函数
      };
    },
  });
  </script>
  
  <style scoped>
  .video-chat-btn,
  .chat-btn {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .video-chat-btn:hover,
  .chat-btn:hover {
    background-color: #0056b3;
  }
  </style>
  