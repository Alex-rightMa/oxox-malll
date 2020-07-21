<template>
  <div>
    <div>
      <van-nav-bar title="会员中心" />
    </div>
    <div class="top">
      <img src="@/assets/images/avater.jpg" class="top-img" />
      <div class="user-name" v-if="userInfo">{{userInfo}}</div>
    </div>
    <div class="login" v-if="userInfo">
      <div>
        <van-button type="warning" @click="goLogout()">退出登陆</van-button>
      </div>
    </div>
    <div class="login" v-else> 
      <div>
        <van-button type="warning" @click="goLogin()">我要登录</van-button>
      </div>
      <div>
        <van-button type="primary" @click="goRegister()">我要注册</van-button>
      </div>
    </div>
    <div>
      <van-cell-group>
        <van-cell title="会员卡" is-link />
        <van-cell title="地址管理" is-link />
        <van-cell title="我的订单" is-link />
        <van-cell title="会员权益" is-link />
        <van-cell title="联系我们" is-link />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: null
    }
  },
  created() {
    this.userInfo = localStorage.getItem('userInfo');
  },
  methods: {
    goLogin() {
      this.$router.push({ name: "Login"});
    },
    goRegister() {
      this.$router.push({ name: "Register"});
    },
    goLogout() {
      this.userInfo = localStorage.removeItem('userInfo');
      this.$router.push('/main/');
    }
  }
};
</script>

<style scoped>
.top-img {
  width: 4rem;
  height: 4rem;
  border-radius: 50px;
  margin-top: 1.5rem;
}
.top {
  height: 7rem;
  text-align: center;
  background-color: #eea2ad;
}
.login {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  padding: 10px;
}
.login div {
  flex: 1;
  text-align: center;
}
.user-name{
    color: greenyellow;
}
</style>
