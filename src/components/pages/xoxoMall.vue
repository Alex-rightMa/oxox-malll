<template>
  <div>
    <!--search bar layout-->
    <div class="search-bar">
      <van-row type="flex" justify="space-between" align="center">
        <van-col span="3" class="mid-box">
          <img :src="locationIcon" width="60%" />
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" />
        </van-col>
        <van-col span="5" class="mid-box">
          <van-button size="small" type="default">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!--swipwer area layout-->
    <div class="swiper-area">
      <van-swipe :autoplay="2000">
        <van-swipe-item v-for="banner in bannerPicArray" :key="banner.goodsId">
          <img :src="banner.image" width="100%" v-lazy="banner.image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- type bar layout-->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width="90%" />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!--adbanner area-->
    <div>
      <img v-lazy="adBanner" width="100%" />
    </div>
    <!--Recommend goods area-->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in recommendGoods " :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!--floor one area-->
    <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
    <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
    <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>
    <!--Hot Area -->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
              <goods-info :goodsId="item.goodsId" 
                :goodsImage="item.image" 
                :goodsName="item.name" 
                :goodsPrice="item.price"
              ></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>

  </div>
</template>

<script>
// import axios from "axios";
import "swiper/css/swiper.css";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { toMoney } from "@/filter/moneyFilter.js";
import floorComponent from "../component/floorComponent";
import goodsInfo from '../component/goodsInfoComponent';
import url from '@/serviceAPI.config.js';

export default {
  data() {
    return {
      category: [],
      adBanner: "",
      locationIcon: require("@/assets/images/location.png"),
      bannerPicArray: [],
      recommendGoods: [],
      swiperOption: {
        slidesPerView: 3
      },
      floor1: [],
      floor2: [],
      floor3: [],
      floorName:{},
      hotGoods:[], //热卖商品

    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  components: { Swiper, SwiperSlide,floorComponent,goodsInfo },
  created() {
    this.$axios
      .get(url.getShoppingMallInfo)
      .then(res => {
        // console.log(res.data.category);
        const {
          category,
          advertesPicture,
          slides,
          recommend,
          floor1,
          floor2,
          floor3,
          floorName,
          hotGoods,

        } = res.data;
        this.category = category; //目录图标
        this.adBanner = advertesPicture.PICTURE_ADDRESS; //广告图片
        this.bannerPicArray = slides; //轮播图片
        this.recommendGoods = recommend; //推荐商品
        this.floor1 = floor1; //楼层1数据
        this.floor2 = floor2;
        this.floor3 = floor3;
        this.floorName = floorName;
        this.hotGoods = hotGoods;

      })
      .catch(err => {
        console.log(err);
      });
  },
  
};
</script>
<style scoped>
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border: 0px;
  border-bottom: 1px solid #fff !important;
  background-color: #e5017d;
  color: #fff;
}
.location-icon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}
.mid-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.swiper-area {
  max-height: 15rem;
  overflow: hidden;
}
.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
  flex: 1;
}
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
.hot-goods {
  height: 130rem;
  overflow: hidden;
  background-color: #fff;
}
</style>