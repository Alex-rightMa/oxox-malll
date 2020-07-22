<template>
  <div>
    <div class="main-div">
      <keep-alive>
        <router-view ref="activePage" />
      </keep-alive>
    </div>
    <van-tabbar v-model="active" @change="changeTabbar(active)">
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="records">列表页</van-tabbar-item>
      <van-tabbar-item icon="cart">购物车页</van-tabbar-item>
      <van-tabbar-item icon="contact">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      nowPath: "" //当前路径
    };
  },
  created() {
    this.changeTabBarActive();
  },
  updated() {
    this.changeTabBarActive();
  },
  methods: {
    changeTabbar(active) {
      this.active = active;
      switch (active) {
        case 0:
          this.$router.push({ name: "XoxoMall" });
          break;
        case 1:
          this.$router.push({ name: "CategoryList" });
          break;
        case 2:
          this.$router.push({ name: "Cart" });
          break;
        case 3:
          this.$router.push({ name: "Member" });
          break;
      }
    },
    changeTabBarActive() {
      this.nowPath = this.$route.path;
      this.active = ["/main/", "/CategoryList", "/Cart", "/Member"].indexOf(
        this.nowPath
      );
    },
  }
};
</script>

<style scoped>
.main-div{
  height: 100vh;
  overflow-y: scroll;
  /* margin-bottom: 50px; */
}
</style>