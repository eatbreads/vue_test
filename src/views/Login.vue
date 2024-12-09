<template>
    <div class="login">
      <h1>用户登录</h1>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="email">邮箱:</label>
          <input id="email" v-model="email" type="email" required />
        </div>
        <div>
          <label for="password">密码:</label>
          <input id="password" v-model="password" type="password" required />
        </div>
        <button type="submit">登录</button>
      </form>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  import { useAuthStore } from "@/stores"; // 使用 Pinia 的 auth store
  import { useRouter } from "vue-router";
  
  export default defineComponent({
    name: "Login",
    setup() {
      const email = ref("");
      const password = ref("");
      const error = ref("");
      const authStore = useAuthStore(); // 获取 auth store
      const router = useRouter();
  
      const handleLogin = async () => {
        try {
          await authStore.login(email.value, password.value); // 调用 Pinia 的 login 方法
          error.value = "";
          router.push("/"); // 登录成功后跳转首页
        } catch (err: any) {
          error.value = err.response?.data?.message || "登录失败";
        }
      };
  
      return { email, password, error, handleLogin };
    },
  });
  </script>
  
  <style scoped>
  .login {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  </style>
  