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
    this.changeTabBarActive('created');
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
    changeTabBarActive(state) {
      this.nowPath = this.$route.path;
      this.active = ["/main/", "/CategoryList", "/Cart", "/Member"].indexOf(
        this.nowPath
      );
      // 动态刷新购物车页面的用户登陆状态 
      if (this.nowPath === "/Cart" && state != 'created') {
        this.$refs.activePage.refreshLoginState &&
        this.$refs.activePage.refreshLoginState();
      }
    },
  }
};
</script>

<style scoped>
.main-div{
  margin-bottom: 50px;
}
</style>