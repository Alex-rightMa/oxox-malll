<template>
  <div class="goods-info" @click="goGoodsInfo(goodsId)">
    <div class="goods-image">
      <img v-lazy="goodsImage" width="90%" />
    </div>
    <div class="goods-name">{{goodsName}}</div>
    <div class="goods-price">￥{{goodsPrice | moneyFilter }}</div>
  </div>
</template>

<script>
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  props: ["goodsId", "goodsImage", "goodsName", "goodsPrice"],
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    //跳转到商品详细页
    goGoodsInfo(id) {
      this.$router.push({ name: "Goods", params: { goodsId: id } });
    }
  }
};
</script>

<style scoped>
.goods-name {
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>