<template>
  <view class="login-box">
    <img class="logo" src="https://fs-omc.com/logo.png" />
    <text class="appName">呱呱应用</text>
    <view class="input-box">
      <view class="input-item">
        <uni-icons type="phone" color="#666" size="28"></uni-icons>
        <input v-model="username" placeholder="手机号码" placeholder-class="placeholder" />
      </view>
    </view>
    <view class="bottom">
      <button class="bindBtn" @click="hendleBindUser">绑定账号</button>
      <view class="prev" @click="$guaroute.back()">上一步</view>
    </view>
  </view>
</template>

<script>
import { uniIcons } from "@dcloudio/uni-ui";
import { setToken } from "../../utils/auth.js";
import { showToast, unsetObj } from "@/utils/index.js";

export default {
  components: { uniIcons },
  data() {
    return {
      showPassWord: true,
      username: "",
      wxInfo: {}
    };
  },
  onLoad(option) {
    this.wxInfo = JSON.parse(option.wxInfo);
    console.log(this.wxInfo); //打印出上个页面传递的参数。
  },
  methods: {
    // 显示密码
    async hendleBindUser() {
      if (!this.username) {
        showToast({
          msg: "手机号码不能为空!"
        });
        return;
      }

      const pages = getCurrentPages();
      if (
        pages.length < 2 ||
        pages[pages.length - 1].route == "pages/login/bind"
      ) {
        this.$guaroute.reLaunch("/pages/home/index");
      } else {
        this.$guaroute.back();
      }
    }
  }
};
</script>

<style lang="scss">
.login-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .logo {
    width: 260upx;
    height: 260upx;
    margin-top: 100upx;
  }
  .appName {
    font-size: 40upx;
    margin-top: 20upx;
    font-weight: bold;
    color: #0b71df;
  }
  .input-box {
    width: 640upx;
    color: white;
    margin-top: 140upx;
    .input-item {
      height: 88upx;
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #333;
      image {
        width: 36upx;
        height: 36upx;
      }
      input {
        flex: 1;
        height: 100upx;
        line-height: 100upx;
        margin-left: 20upx;
        border-bottom: 1px solid #8f8f94;
      }
      &:nth-child(2) {
        margin-top: 50upx;
      }
    }
  }
  .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 100upx;
    left: 50%;
    transform: translateX(-50%);
    .bindBtn {
      width: 600upx;
      height: 88upx;
      padding: 0px;
      margin: 0px;
      line-height: 88upx;
      text-align: center;
      background-color: #0b71df;
      color: white;
    }
    .loginBtn::after {
      border: none;
    }
    .prev {
      margin-top: 50upx;
      color: #f6f6f6;
      color: #549ae6;
    }
  }
}
</style>
