<template>
  <view class="contianer">
    <backTitle title="视频通话" :backIcon="false"></backTitle>
    <view class="flex">
      <view class="becalling-wrapper">
        <view class="becalling-text">
          <text>用户名称邀请你</text>
          <text>视频聊天</text>
        </view>
        <view class="becalling-button-group">
          <view class="reject-button button" @click="rejectCallHandler">拒绝</view>
          <view class="accept-button button" @click="acceptCallHandler">接听</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import backTitle from "@/components/backtitle.vue";
export default {
  name: "p2pVideo",
  components: {
    backTitle
  },
  data() {
    return {
      netcallData: {},
      timer: null
    };
  },
  onLoad(options) {
    this.netcallData = options.data;
    this.timer = setTimeout(() => {
      this.hangup();
    }, 1000 * 45);

    uni.$event.once("hangup", () => {
      this.hangup();
    });
  },
  methods: {
    // 拒绝通话
    rejectCallHandler() {
      uni.netcallController.reject().then(data => {
        this.$uniPage.back();
      });
      clearTimeout(this.timer);
    },
    // 接听通话
    acceptCallHandler() {
      clearTimeout(this.timer);
      this.$uniPage.replace({
        url: "/pages/p2pVideo/index",
        params: {
          data: this.netcallData,
          type: "accepted"
        }
      });
    },

    // 切换摄像头
    switchCamera() {
      this.livePusherContext.switchCamera();
    },
    // 点击挂断
    hangup() {
      clearTimeout(this.timer);
      uni.netcallController.hangup();
      this.$uniPage.back();
    }
  }
};
</script>

<style lang="scss">
.contianer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.flex {
  width: 100%;
  height: calc(100% - 124upx);
}
.fullscreen {
  width: 100%;
  height: 100%;
}
/* 被叫 */
.becalling-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #555;
  color: #fff;
  font-size: 40upx;
  z-index: 99;
  .becalling-text {
    position: absolute;
    top: 400upx;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .becalling-button-group {
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    bottom: 150upx;
    padding: 0 40upx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .button {
      width: 250upx;
      height: 100upx;
      border-radius: 10upx;
      justify-content: center;
      display: flex;
      align-items: center;
      font-size: 33upx;
      color: white;
    }
    .reject-button {
      background-color: rgb(207, 32, 32);
    }
    .accept-button {
      background-color: rgb(35, 157, 250);
    }
  }
}

.btn-group {
  width: 100%;
  height: 150upx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 0px 28px;
  box-sizing: border-box;
  position: absolute;
  bottom: 80upx;
  left: 50%;
  transform: translateX(-50%);

  .mute-btn,
  .hangup-btn {
    width: 120upx;
    height: 120upx;
    border-radius: 120upx;
  }
  .hangup-btn {
    background-color: red;
  }
  .mute-btn {
    background-color: #bbb;
  }
}
</style>
