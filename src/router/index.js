import Vue from "vue";
import VueRouter from "vue-router";
import XoxoMall from "@/components/pages/xoxoMall.vue";
import Login from "@/components/pages/Login";
import Goods from "@/components/pages/Goods";
import CategoryList from "@/components/pages/CategoryList";
import Cart from "@/components/pages/Cart";
import Main from "@/components/pages/Main";
import Member from "@/components/pages/Member";

Vue.use(VueRouter);

const routes = [
  {
    path: "/main",
    name: "Main",
    component: Main,
    children: [
      {
        path: "/",
        name: "XoxoMall",
        component: XoxoMall,
        meta: {
          keepAlive: true, // 通过此字段判断是否需要缓存当前组件
          scrollSelector: ".main-div", // 需要恢复离开页面前的滚动高度元素选择器
        },
      },
      {
        path: "/CategoryList",
        name: "CategoryList",
        component: CategoryList,
        meta: {
          keepAlive: true,
          scrollSelector: "#list-div",
        },
      },
      { path: "/Cart", name: "Cart", component: Cart },
      {path:'/Member',name:'Member',component:Member},
    ],
  },
  { path: "/", redirect: "/main/" },
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
  scrollBehavior(to, from, savedPosition) {
    // scrollBehavior -- mounted后beforeUpdate前执行
    // console.log('scrollBehavior');
    if (savedPosition) {
      return savedPosition;
    } else {
      if (to.meta.keepAlive) {
        // 恢复缓存页面离开前的滚动高度
        setTimeout(() => {
          document.querySelector(to.meta.scrollSelector).scrollTop =
            to.meta.savedPosition || 0;
        }, 600);
      }
      return { x: 0, y: 0 };
    }
  },
});
// 全局前置守卫
router.beforeEach((to, from, next) => {
  // console.log('global---beforeEach');
  // 记录缓存页面离开前的滚动高度
  if (from.meta.keepAlive) {
    var body = document.querySelector(from.meta.scrollSelector);
    from.meta.savedPosition = (body && body.scrollTop) || 0;
  }
  next();
});
export default router;
