import Vue from "vue";
import VueRouter from "vue-router";
import XoxoMall from "@/components/pages/xoxoMall.vue";
import Login from "@/components/pages/Login";
import Goods from "@/components/pages/Goods";
import CategoryList from "@/components/pages/CategoryList";
import Cart from "@/components/pages/Cart";
import Main from "@/components/pages/Main";
import Member from '@/components/pages/Member';

Vue.use(VueRouter);

const routes = [
  {
    path: "/main",
    name: "Main",
    component: Main,
    children: [
      { path: "/", name: "XoxoMall", component: XoxoMall },
      { path: "/CategoryList", name: "CategoryList", component: CategoryList },
      { path: "/Cart", name: "Cart", component: Cart },
      {path:'/Member',name:'Member',component:Member},
    ],
  },
  { path: '/', redirect: '/main' },
  // 路由懒加载
  {
    path: "/register",
    name: "Register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../components/pages/Register.vue"
      ),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  { path: "/goods", name: "Goods", component: Goods },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
