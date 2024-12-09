import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import VideoChat from "@/views/VideoChat.vue"; // 引入 VideoChat 组件
import Chat from "@/views/Chat.vue"; // 引入 Chat 组件
import { useAuthStore } from "@/stores/index.ts"; // 引入 auth store

const routes = [
  { path: "/", name: "Home", component: Home, meta: { requiresAuth: true } },
  { path: "/login", name: "Login", component: Login },
  { path: "/video-chat", name: "VideoChat", component: VideoChat, meta: { requiresAuth: true } }, // 添加视频通话路由
  { path: "/chat", name: "Chat", component: Chat, meta: { requiresAuth: true } }, // 添加聊天路由
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // 获取 Pinia 的 auth store
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // 如果需要认证且未登录
    next("/login");
  } else {
    next();
  }
});

export default router;
