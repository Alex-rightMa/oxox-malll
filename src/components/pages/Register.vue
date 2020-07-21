<template>
  <div>
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack" />

    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名,不能小于5位"
        required
        @click-icon="username = ''"
        :error-message="usernameErrorMsg"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码,不能少于6位"
        required
        :error-message="passwordErrorMsg"
      />
      <div class="register-button">
        <van-button type="primary" size="large" :loading="openLoading" @click="registerAction">马上注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";

export default {
  data() {
    return {
      username: "",
      password: "",
      openLoading: false, //是否开启用户的Loading
      usernameErrorMsg: "", //当用户名出现错误的时候
      passwordErrorMsg: "" //当密码出现错误的时候
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    checkForm() {
      let isOk = true;
      if (this.username.length < 5) {
        this.usernameErrorMsg = "用户名不能小于5位";
        isOk = false;
      } else {
        this.usernameErrorMsg = "";
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = "密码不能少于6位";
        isOk = false;
      } else {
        this.passwordErrorMsg = "";
      }
      return isOk;
    },
    registerAction() {
      if (this.checkForm()) {
        this.axiosRegisterUser();
      }
    },
    axiosRegisterUser() {
      this.openLoading = true; // 防止用户重复提交
      this.$axios
        .post(url.registerUser, {
          username: this.username,
          password: this.password
        })
        .then(response => {
          console.log(response);
          //如果返回code为200，代表注册成功，我们给用户作Toast提示
          if (response.code == 200) {
            Toast.success("注册成功");
            this.$router.go(-1);
          } else {
            Toast.fail("注册失败"+ response.message);
            this.openLoading = false;
          }
        })
        .catch(error => {
          Toast.fail("注册失败");
          this.openLoading = false;
        });
    }
  }
};
</script>

<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.register-button {
  padding-top: 10px;
}
</style>