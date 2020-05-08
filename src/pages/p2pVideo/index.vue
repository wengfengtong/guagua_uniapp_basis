<template>
  <view class="contianer">
    <backTitle title="视频通话" :backIcon="false"></backTitle>
    <view class="flex">
      <view class="fullscreen">
        <view v-if="isCalling" class="fullscreen calling-wrapper">
          <camera mode="normal" device-position="front" class="calling-camera" flash="off">
            <cover-view class="calling-coverview">{{netCallTips}}</cover-view>
            <cover-view class="btn-group">
              <cover-image
                class="hangup-btn"
                @click="hangup"
                src="https://fs-omc.com/netcall/ic_hangup.png"
              ></cover-image>
            </cover-view>
          </camera>
        </view>
        <view v-else-if="onTheCall" class="video-wrapper">
          <live-pusher
            class="live-pusher"
            id="localPusher"
            ref="localPusher"
            mode="HD"
            :url="localInfo.url"
            waiting-image="https://fs-omc.com/video.png"
            :beauty="2"
            :whiteness="2"
            autoplay
            :muted="pusherMute"
            @statechange="statechange"
            @error="error"
          ></live-pusher>
          <live-player
            :id="`yunxinplayer-${remoteInfo.uid}`"
            :src="remoteInfo.url"
            mode="RTC"
            autoplay
            @statechange="statechange"
            @error="error"
            class="live-player"
          >
            <cover-view class="btn-group">
              <cover-image
                class="mute-btn"
                @click="switchCamera"
                src="https://fs-omc.com/netcall/ic_switch_default.png"
              ></cover-image>
              <cover-image
                class="hangup-btn"
                @click="hangup"
                src="https://fs-omc.com/netcall/ic_hangup.png"
              ></cover-image>
            </cover-view>
          </live-player>
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
      onTheCall: false, //正在通话中标记
      isCalling: false, // 主叫中
      account: "",
      pusherMute: false, // 是否静音
      remoteInfo: {}, // 远程信息
      localInfo: {}, //本地信息
      livePlayerContext: null, // 播放流上下文
      livePusherContext: null, // 推送流上下文
      netCallTips: "正在呼叫请稍后"
    };
  },
  onLoad(options) {
    let cloud = uni.getStorageSync("cloud") || {};
    this.account = cloud.cloudAccount;
    let app = getApp();
    if (options.type == "call") {
      this.setStatus(true, false);
      this.userData = JSON.parse(options.data);
      uni.netcallController.call({
        caller: this.userData.cloudAccount
      });
    } else if (options.type == "accepted") {
      this.setStatus(false, true);
      uni.netcallController
        .accept()
        .then(data => {
          console.log("接听成功", data);
          // 开启本端的音视频通话
          uni.netcall.startRtc({ mode: 0 }).then(obj => {
            // obj结构 => {uid,account,cid}
            console.log("开启音视频成功", obj);
          });
        })
        .catch(error => {
          console.error(error);
        });
    }

    uni.$event.once("callAccepted", data => {
      this.setStatus(false, true);
      uni.netcall.startRtc({ mode: 0 }).then(rtc => {
        console.log("rtc连接成功");
      });
    });
    // 同步成功
    uni.$event.once("syncDone", syncData => {
      syncData.userlist.forEach(element => {
        if (element.account == this.account) {
          this.localInfo = element;
          this.livePusherContext = uni.createLivePusherContext(
            "localPusher",
            this
          );
        }
      });
    });

    // 有人加入
    uni.$event.once("clientJoin", joinData => {
      this.remoteInfo = joinData;
      this.livePlayerContext = uni.createLivePlayerContext(
        `yunxinplayer-${joinData.uid}`,
        this
      );
      this.$nextTick(() => {
        this.livePusherContext.start();
        this.livePlayerContext.play();
      });
    });

    // 监听到挂断
    uni.$event.once("hangup", data => {
      this.$uniPage.back();
    });

    // 监听到设置提示
    uni.$event.once("setTips", data => {
      this.netCallTips = data;
    });
  },
  methods: {
    /**
     * 设置状态
     */
    setStatus(isCalling, onTheCall) {
      this.isCalling = isCalling || false;
      this.onTheCall = onTheCall || false;
    },

    // 切换摄像头
    switchCamera() {
      this.livePusherContext.switchCamera();
    },

    // 点击挂断
    hangup() {
      uni.netcallController.hangup();
      this.$uniPage.back();
    },
    // 点击静音
    handleMute() {
      // this.livePusherContext.stop;
    },

    // 改变
    statechange(e) {
      console.log(e, e.detail.code);
    },
    // 异常
    error(e) {
      console.error(e.detail.errMsg, e);
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

.calling-wrapper {
  z-index: 88;
  background-color: #000;
  .loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.calling-camera {
  width: 100%;
  height: 100%;
  position: relative;
  .calling-coverview {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100upx;
    background-color: rgba($color: #000000, $alpha: 0.5);
    color: #fff;
    font-size: 40upx;
    text-align: center;
    line-height: 100upx;
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
    cover-image {
      width: 100%;
      height: 100%;
    }
  }
  .hangup-btn {
    background-color: red;
  }
  .mute-btn {
    background-color: #bbb;
  }
}

/* 视频容器 */
.video-wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  background-color: #000;
  z-index: 77;
  .live-pusher {
    width: 300upx;
    height: 400upx;
    position: absolute;
    right: 0px;
    top: 0px;
    z-index: 99;
  }
  .live-player {
    width: 750upx;
    height: 100%;
  }
}
</style>
