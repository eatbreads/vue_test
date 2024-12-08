import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import store from "@/stores";

const routes = [
  { path: "/", name: "Home", component: Home, meta: { requiresAuth: true } },
  { path: "/login", name: "Login", component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    if (to.name === "Home") {
      // 如果未登录且访问的是 Home 页面，允许通过
      next();
    } else {
      // 否则跳转到 Login 页面
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
