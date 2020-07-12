import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
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
  PullRefresh,
  Tabbar, 
  TabbarItem,
  Cell, CellGroup ,
} from "vant";
import loading from "@/assets/images/location.png";
import axios from "axios";
Vue.prototype.$axios = axios;

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
  .use(PullRefresh)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Cell)
  .use(CellGroup)
  .use(Lazyload, { preLoad: 2.25, loading });

Vue.config.productionTip = false;
// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      // 接口正常直接返回数据
      response = response.data;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
require("./mock");
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
