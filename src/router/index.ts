/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";

const prefix = (window as any).__POWERED_BY_QIANKUN__
  ? process.env.VUE_APP_MICRO_ROUTER
  : "";

const routes: Array<RouteRecordRaw> = [
  {
    path: prefix + "/",
    name: "Home",
    component: Home,
  },
  {
    path: prefix + "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 判断 qiankun 环境则进行路由拦截，判断跳转路由是否有 micro 应用开头前缀，没有则加上
if ((window as any).__POWERED_BY_QIANKUN__) {
  router.beforeEach((to, from, next) => {
    console.log("test:", !to.path.includes(prefix));
    console.log("to.path: ", to.path);
    console.log("prefix: ", prefix);

    if (!to.path.includes(prefix)) {
      next({
        path: prefix + to.path,
      });
    } else {
      next();
    }
  });
}

export default router;
