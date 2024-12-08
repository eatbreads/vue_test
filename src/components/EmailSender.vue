<template>
    <div class="email-sender">
      <h1>发送邮件</h1>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="to">收件人邮箱:</label>
          <input id="to" v-model="to" type="email" required />
        </div>
        <div>
          <label for="subject">主题:</label>
          <input id="subject" v-model="subject" type="text" required />
        </div>
        <div>
          <label for="body">正文:</label>
          <textarea id="body" v-model="body" required></textarea>
        </div>
        <button type="submit">发送</button>
      </form>
      <p v-if="message">{{ message }}</p>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  import { sendEmail } from "@/api/email";
  
  export default defineComponent({
    name: "EmailSender",
    setup() {
      const to = ref("");
      const subject = ref("");
      const body = ref("");
      const message = ref("");
      const error = ref("");
  
      const handleSubmit = async () => {
        try {
          const response = await sendEmail(to.value, subject.value, body.value);
          message.value = response.message;
          error.value = "";
        } catch (err: any) {
          message.value = "";
          error.value = err.message;
        }
      };
  
      return { to, subject, body, message, error, handleSubmit };
    },
  });
  </script>
  
  <style scoped>
  .email-sender {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  </style>
  