<template>
  <view class="container">
    <view class="uesrInfo">
      <view class="avatarBox">
        <image v-if="userData.avatarUrl" mode="widthFix" :src="userData.avatarUrl" />
        <open-data wx:else type="userAvatarUrl"></open-data>
      </view>
      <view class="nameBox">
        <text class="nickName" v-if="userData.nickName">{{userData.nickName}}</text>
        <button class="loginBtn" v-else open-type="getUserInfo" bindgetuserinfo="getUserInfo">立即登录</button>
      </view>
    </view>
    <view class="block"></view>
  </view>
</template>
<script>
import { showModal, showToast } from "../../utils/util";
import { removeToken, removeUserInfo } from "../../utils/auth";

export default {
  data() {
    return {
      userData: {
        nickName: "wengbb",
        avatarUrl: "http://public.wengbb.cn/%E9%9D%92%E8%9B%99-%E7%AB%96.png"
      }
    };
  },
  onLoad() {},
  mounted() {},
  methods: {
    // 头像上传
    updataAvatar() {
      uni.chooseImage({
        key: {
          count: 1,
          sizeType: ["compressed"],
          sourceType: ["album", "camera"],
          enableCrop: true
        },
        success: result => {
          uni.showLoading({
            title: "上传中..."
          });
          const tempFilePaths = result.tempFilePaths;
        },
        fail(err) {
          showToast({
            msg: err
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.uesrInfo {
  width: 100%;
  height: 30vh;
  background-color: #1bcbb9;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  .avatarBox {
    width: 160upx;
    height: 160upx;
    border-radius: 160upx;
    background-color: #f0f0f0;
    overflow: hidden;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .nameBox {
    margin-top: 20upx;
    text-align: center;
    font-size: 30upx;
    .nickName {
      max-width: 400upx;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
    .loginBtn {
      font-size: 30upx;
      width: 240upx;
      height: 68upx;
      line-height: 68upx;
      border-radius: 68upx;
    }
  }
}

.block {
  padding: 0 32upx;
  box-sizing: border-box;
  .list {
    height: 120upx !important;
    min-height: 120upx !important;
  }
  .contactBtn {
    width: 500upx;
    height: 100%;
    background: none;
    color: #333;
    font-size: 28upx;
    padding: 0upx 0upx;
    text-align: left;
  }

  .contactBtn::after {
    border: none;
  }
}
</style>

