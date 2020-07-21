<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="购物车" />
    </div>
    <div class="login" v-if="userInfo">
      <div class="card-title">
        <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
      </div>
      <!--显示购物车中的商品-->
      <div class="cart-list">
        <van-swipe-cell v-for="(item,index) in cartInfo" :key="index" >
          <div class="pang-row" >
            <div class="pang-img">
              <img :src="item.image" width="100%" />
            </div>
            <div class="pang-text">
              <div class="pang-goods-name">{{item.Name}}</div>
              <div class="pang-control">
                <van-stepper v-model="item.count" @overlimit="checkGoodsNum" />
              </div>
            </div>
            <div class="pang-goods-price">
              <div>￥{{item.price |moneyFilter}}</div>
              <div>x{{item.count}}</div>
              <div class="allPrice">￥{{item.price*item.count | moneyFilter}}</div>
            </div>
            
          </div>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              @click="clearGoods(index)"
              class="delete-button"
            />
          </template>
        </van-swipe-cell>
      </div>
      <div class="totalMoney">商品总价：￥ {{totalMoney | moneyFilter}}</div>
    </div>
    <div class="no-login" v-else>请先登陆后查看</div>
  </div>
</template>

<script>
import { toMoney } from "@/filter/moneyFilter.js";
import { Toast } from 'vant';

export default {
  data() {
    return {
      userInfo: null,
      cartInfo: [], //购物车内的商品
      isEmpty: false //购物车是否为空
    };
  },
  created() {
    this.userInfo = localStorage.getItem("userInfo");
    this.userInfo && this.getCartInfo();
  },
  computed: {
    totalMoney() {
      let allMoney = 0;
      this.cartInfo.forEach((item, index) => {
        allMoney += item.price * item.count;
      });
      localStorage.cartInfo = JSON.stringify(this.cartInfo);
      return allMoney;
    }
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    //得到购物车的商品
    getCartInfo() {
      //判断localStorage里是否有购物车数据
      if (localStorage.cartInfo) {
        //如果有数据，我们去除并赋值给cartInfo
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      //打印到控制台查看效果
      console.log(" this.cartInfo:" + JSON.stringify(this.cartInfo));
      this.isEmpty = this.cartInfo.length > 0 ? true : false;
    },
    clearCart() {
      localStorage.removeItem("cartInfo");
      this.cartInfo = [];
    },
    clearGoods(index) {
      this.cartInfo.splice(index, 1);
    },
    refreshLoginState() {
      this.userInfo = localStorage.getItem("userInfo");
    },
    checkGoodsNum(){
      Toast('最少购买一件哦！');
    }
  }
};
</script>

<style scoped>
.card-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}
.cart-list {
  background-color: #fff;
}
.pang-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #e4e7ed;
}
.pang-img {
  flex: 6;
}
.pang-text {
  flex: 10;
  padding-left: 10px;
}
.pang-control {
  padding-top: 10px;
}
.pang-goods-price {
  flex: 8;
  text-align: right;
}
.allPrice {
  color: red;
}
.totalMoney {
  text-align: right;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
}
.no-login {
  line-height: 87vh;
  text-align: center;
  height: 87vh;
  color: #999;
}
.delete-button{
  height: 100%;
}
</style>