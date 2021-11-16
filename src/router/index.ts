/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: (window as any).__POWERED_BY_QIANKUN__
      ? process.env.VUE_APP_MiCRO_ROUTER
      : "/",
    name: "Home",
    component: Home,
    children: [
      // 其它的路由都写到这里
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
