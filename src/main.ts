import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { createPinia } from "pinia"; // 引入 Pinia

// 创建 Pinia 实例
const pinia = createPinia();

// 创建 Vue 应用
const app = createApp(App);

// 使用 Pinia 和 Router
app.use(pinia);
app.use(router);

// 挂载应用
app.mount("#app");
