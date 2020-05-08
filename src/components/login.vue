<template>
  <view class="popup">
    <view class="loginBox">
      <view class="title">等你好久了,快速登录!</view>
      <view class="tips">一起来搞事情吧!</view>
      <view class="infoBox">
        <button open-type="getUserInfo" class="loginBtn" @getuserinfo="getUserInfo">授权登录</button>
      </view>
      <uni-icons class="close" type="close" color="#fff" @click="hendleClose"></uni-icons>
    </view>
  </view>
</template>
<script>
import { uniPopup, uniIcons } from "@dcloudio/uni-ui";
import { login } from "@/utils/util.js";
export default {
  name: "login",
  components: { uniIcons },
  methods: {
    mounted() {},
    hendleClose() {
      uni.$emit("close");
    },
    getUserInfo(e){
        login(e).then(res=>{
            console.log(res)
        })
    }
  }
};
</script>
<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0upx;
  right: 0upx;
  bottom: 0upx;
  left: 0upx;
  background-color: rgba($color: #000000, $alpha: 0.5);
  z-index: 777;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loginBox {
  width: 500upx;
  height: 600upx;
  background-color: #0b71df;
  border-radius: 20upx;
  padding: 32upx;
  box-sizing: border-box;
  color: white;
  position: relative;
  .title {
    font-size: 36upx;
    font-weight: 600;
  }
  .tips {
    font-size: 30upx;
    margin-top: 10upx;
  }
  .infoBox {
    width: 100%;
    height: 400upx;
    background-color: white;
    margin-top: 20upx;
    border-radius: 10upx;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .loginBtn {
      width: 320upx;
      height: 90upx;
      font-size: 30upx;
      line-height: 90upx;
      text-align: center;
      border-radius: 100upx;
      background-color: #0b71df;
      color: white;
    }
  }
  .close {
    position: absolute;
    right: 20upx;
    top: 20upx;
  }
}
</style>
