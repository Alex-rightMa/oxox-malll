import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Toast,
  Button,
  Row,
  Col,
  Search,
  Swipe,
  SwipeItem,
  Lazyload,
  List,
  Field,
  NavBar,
  Tab,
  Tabs,
  Stepper,
  SwipeCell,
  PullRefresh,
  Tabbar,
  TabbarItem,
  Cell,
  CellGroup,
} from "vant";
// 首页请求接口使用mock 模拟获取数据
require("./mock");
import loading from "@/assets/images/location.png";
import axios from "axios";
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

Vue.use(Button)
  .use(Row)
  .use(Col)
  .use(Search)
  .use(Swipe)
  .use(SwipeItem)
  .use(List)
  .use(Field)
  .use(NavBar)
  .use(Tab)
  .use(Tabs)
  .use(Stepper)
  .use(SwipeCell)
  .use(PullRefresh)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Cell)
  .use(CellGroup)
  .use(Lazyload, { preLoad: 2.25, loading });

// 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    Toast.loading({
      message: "加载中...",
      forbidClick: true
    });
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      // 接口正常直接返回数据
      response = response.data;
    }
    Toast.clear();
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
