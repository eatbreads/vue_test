<template>
    <div>
      <h1>欢迎使用邮件发送系统</h1>
      <EmailSender />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import EmailSender from "@/components/EmailSender.vue";
  
  export default defineComponent({
    name: "Home",
    components: {
      EmailSender,
    },
  });
  </script>
  