<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/login">登录</RouterLink>
      <RouterLink to="/">发送邮件</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  padding: 1rem;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ccc;
}

nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 14px;
}

nav a {
  text-decoration: none;
  color: #007bff;
}

nav a.router-link-exact-active {
  font-weight: bold;
  color: #0056b3;
}

nav a:hover {
  text-decoration: underline;
}
</style>
