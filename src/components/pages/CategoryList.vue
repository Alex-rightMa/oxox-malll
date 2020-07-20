<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表" />
    </div>

    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li
                @click="clickCategory(index,item.ID)"
                :class="{categoryActive:categoryIndex==index}"
                v-for="(item,index) in category"
                :key="index"
              >{{item.MALL_CATEGORY_NAME}}</li>
            </ul>
          </div>
        </van-col>

        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active" @click="onClickCategorySub">
              <van-tab
                v-for="(item, index) in categorySub"
                :key="index"
                :title="item.MALL_SUB_NAME"
              ></van-tab>
            </van-tabs>
          </div>

          <div id="list-div">
            <van-pull-refresh v-model="loading" @refresh="onRefresh">
              <van-list
                v-model="loading"
                :finished="finished"
                @load="onLoad"
                :immediate-check="false"
                finished-text="已经到底啦"
              >
                <div
                  class="list-item"
                  @click="goGoodsInfo(item.ID)"
                  v-for="(item,index) in goodList"
                  :key="index"
                >
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg" />
                  </div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div class>￥{{item.ORI_PRICE | moneyFilter}}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import url from "@/serviceAPI.config.js";
import { toMoney } from "@/filter/moneyFilter.js";
import { Toast } from 'vant';

export default {
  data() {
    return {
      category: [],
      categorySub: [], //小类类别
      categoryIndex: 0,
      active: 0, //激活标签的值
      categorySubId: "", //商品子类ID
      loading: false, //上拉加载使用
      finished: false, //下拉加载是否没有数据了
      page: 1, //商品列表的页数
      goodList: [], //商品列表信息
      errorImg: 'this.src="' + require("@/assets/images/errorimg.png") + '"'
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  created() {
    this.getCategory();
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    // 左侧适应页面高度
    document.getElementById("leftNav").style.height =
      winHeight - 46 - 50 + "px";
    // 设置list-div的高度
    document.getElementById("list-div").style.height =
      winHeight - 90 - 50 + "px";
  },
  methods: {
    getCategory() {
      this.$axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then(response => {
          console.log(response);
          if (response.code == 200 && response.message) {
            this.category = response.message;
            this.getCategorySubByCategoryId(this.category[0].ID);
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //点击大类的方法
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      this.loading = true;
      this.finished = false;
      this.page = 1;
      this.goodList = [];
      this.getCategorySubByCategoryId(categoryId);
    },
    //根据大类ID读取小类类别列表
    getCategorySubByCategoryId(categoryId) {
      this.$axios({
        url: url.getCategorySubList,
        method: "post",
        data: { categoryId }
      })
        .then(response => {
          if (response.code == 200 && response.message) {
            this.categorySub = response.message;
            this.active = 0;
            this.categorySubId = this.categorySub[0].ID;
            this.onLoad();
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //点击子类获取商品信息
    onClickCategorySub(index, title) {
      this.categorySubId = this.categorySub[index].ID;
      this.loading = true;
      this.finished = false;
      this.page = 1;
      this.goodList = [];
      this.onLoad();
    },
    //上拉加载方法
    onLoad() {
      this.getGoodList();
    },
    //下拉刷新方法
    onRefresh() {
      this.finished = false;
      this.page = 1;
      this.goodList = [];
      this.onLoad();
    },
    getGoodList() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      this.$axios({
        url: url.getGoodsListByCategorySubID,
        method: "post",
        data: {
          categorySubId: this.categorySubId, // 商品的子分类
          page: this.page // 分类页数
        }
      })
        .then(response => {
          console.log(response);
          if (response.code == 200 && response.message.length) {
            this.page++;
            this.goodList = this.goodList.concat(response.message);
          } else {
            this.finished = true;
          }
          this.loading = false;
          Toast.clear()
        })
        .catch(error => {
          console.log(error);
        });
    },
    //跳转到商品详细页
    goGoodsInfo(id) {
      this.$router.push({ name: "Goods", params: { goodsId: id } });
    }
  }
};
</script>

<style scoped>
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: #e5017d;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>