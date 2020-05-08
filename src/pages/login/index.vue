<template>
  <view class="login-box">
    <img class="logo" src="http://public.wengbb.cn/%E9%9D%92%E8%9B%99-%E7%AB%96.png" />
    <view class="describe">
      <text class="appName">呱呱应用</text>
    </view>
    <view class="bottom">
      <button open-type="getUserInfo" class="loginBtn" @getuserinfo="hendleWxLogin">点击授权登陆</button>
      <view class="tips">
        <view>徐闻县呱呱互动互联网信息服务工作室</view>
        <view>版权所有</view>
      </view>
    </view>
  </view>
</template>

<script>
import { setToken } from "../../utils/auth.js";
import { login, showToast, unsetObj } from "@/utils/util.js";
import IMController from "../../utils/yunxin/nim";

export default {
  data() {
    return {};
  },
  onLoad(option) {
    console.log(option); //打印出上个页面传递的参数。
  },
  methods: {
    // 微信登陆
    async hendleWxLogin(e) {
      login(e).then(res => {
        console.log(res);
        // 初始化IM实例
        uni.imController = new IMController(
          "cloudAccount",
          "cloudAccountPassword"
        );
      });
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

  .describe {
    width: 680upx;
    text-align: center;
    .appName {
      font-size: 40upx;
      font-weight: bold;
      color: #333;
    }
    .text {
      width: 100%;
      font-size: 28upx;
      text-align: center;
    }
  }
  .lattice-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    margin: 60upx auto;
    width: 600upx;
    min-height: 328upx;
    padding-bottom: 30upx;
    box-shadow: 1px 1px 6px #ccc;
    border-radius: 4upx;
    .lattice {
      width: 50%;
      margin-top: 30upx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .imgBox {
        width: 78upx;
        height: 78upx;
        border-radius: 78upx;
        background-color: #0b71df;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        image {
          width: 42upx;
          height: 30upx;
        }
      }
      text {
        text-align: center;
        margin-top: 10upx;
        color: #333;
      }
    }
  }
  .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 30upx;
    left: 50%;
    transform: translateX(-50%);
    .loginBtn {
      width: 560upx;
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
    .tips {
      width: 680upx;
      margin-top: 40upx;
      text-align: center;
      font-size: 28upx;
      line-height: 44upx;
      color: #666;
    }
  }
}
</style>
