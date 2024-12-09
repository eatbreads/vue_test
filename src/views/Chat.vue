<template>
    <div class="chat-container">
      <h1>聊天室</h1>
      <div class="messages">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <strong>{{ message.userId }}:</strong> {{ message.content }}
        </div>
      </div>
      <div class="input-area">
        <input 
          v-model="messageContent" 
          type="text" 
          placeholder="输入消息..." 
          @keydown.enter="sendMessage" 
        />
        <button @click="sendMessage">发送</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
  import { Client } from "@stomp/stompjs";
  
  export default defineComponent({
    name: "ChatRoom",
    setup() {
      const messages = ref<{ userId: number; content: string }[]>([]);
      const messageContent = ref<string>("");
      const chatRoomId = 1; // 示例聊天室 ID
      const userId = 10; // 示例用户 ID
      const stompClient = ref<Client | null>(null);
  
      // 初始化 STOMP 客户端
      const initStompClient = () => {
        stompClient.value = new Client({
          brokerURL: "ws://127.0.0.1:8080/ws/chat", // 后端 STOMP WebSocket 地址
          reconnectDelay: 5000,
          onConnect: () => {
            console.log("STOMP connected!");
  
            // 订阅聊天室消息
            stompClient.value?.subscribe(`/topic/chat-room/${chatRoomId}`, (message) => {
              const receivedMessage = JSON.parse(message.body);
              console.log("收到消息：", receivedMessage);
              messages.value.push(receivedMessage);
            });
          },
          onDisconnect: () => {
            console.log("STOMP disconnected!");
          },
        });
  
        stompClient.value.activate();
      };
  
      // 发送消息
      const sendMessage = () => {
        if (!messageContent.value.trim()) {
          alert("消息内容不能为空！");
          return;
        }
  
        const message = {
          chatRoomId,
          userId,
          content: messageContent.value,
          messageType: "text",
        };
  
        // 发布消息到服务器
        stompClient.value?.publish({
          destination: `/app/sendMessage`,
          body: JSON.stringify(message),
        });
  
        // 清空输入框
        messageContent.value = "";
      };
  
      onMounted(() => {
        initStompClient();
      });
  
      onBeforeUnmount(() => {
        // 关闭 STOMP 客户端
        stompClient.value?.deactivate();
      });
  
      return {
        messages,
        messageContent,
        sendMessage,
      };
    },
  });
  </script>
  
  <style scoped>
  .chat-container {
    width: 400px;
    margin: 0 auto;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    font-family: Arial, sans-serif;
  }
  .messages {
    height: 300px;
    overflow-y: auto;
    border: 1px solid #ddd;
    margin-bottom: 10px;
    padding: 10px;
  }
  .message {
    margin: 5px 0;
  }
  .input-area {
    display: flex;
    gap: 10px;
  }
  input[type="text"] {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  