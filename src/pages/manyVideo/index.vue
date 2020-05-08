<template>
  <view class="container">
    <backTitle title="视频通话" :backIcon="false"></backTitle>
    <view class="flex">
      <view class="becalling-wrapper" v-if="beCalling">
        <view class="becalling-text">
          <text>用户名称邀请你</text>
          <text>视频聊天</text>
        </view>
        <view class="becalling-button-group">
          <view class="reject-button button" @click="rejectCallHandler">拒绝</view>
          <view class="accept-button button" @click="acceptCallHandler">接听</view>
        </view>
      </view>
      <view v-else class="fullscreen">
        <view class="video-wrapper">
          <live-pusher
            class="live-pusher video-box"
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
            v-for="item in personList"
            :key="item.uid"
            :id="`yunxinplayer-${item.uid}`"
            :src="item.url"
            mode="RTC"
            autoplay
            @statechange="statechange"
            @error="error"
            class="live-player video-box"
            @click="hendlePlayer(item)"
          >
            <cover-view class="mask-box" v-if="item.hangup">
              <cover-view class="text">已挂断</cover-view>
            </cover-view>
            <cover-view class="name"></cover-view>
          </live-player>
        </view>
        <cover-view class="btn-group">
          <cover-image class="mute-btn" @click="handleMute" :src="jugeMuteImg"></cover-image>
          <cover-image
            class="switch-btn"
            @click="switchCamera"
            src="https://fs-omc.com/netcall/ic_switch_default.png"
          ></cover-image>
          <cover-image
            class="hangup-btn"
            @click="hangup"
            src="https://fs-omc.com/netcall/ic_hangup.png"
          ></cover-image>
        </cover-view>
      </view>
    </view>
  </view>
</template>

<script>
import { deepClone } from "../../utils/util";
import backTitle from "@/components/backtitle.vue";
export default {
  name: "manyVideo",
  components: {
    backTitle
  },
  data() {
    return {
      onTheCall: false, //正在通话中标记
      beCalling: true,
      account: "",
      pusherMute: false, // 是否静音
      msgInfo: {},
      personList: [],
      localInfo: {},
      livePlayerContext: {},
      livePusherContext: null,
      currentFullScreen: null
    };
  },
  computed: {
    jugeText() {
      return item => {
        let str = "未接听";
        if (item.hangup) {
          str = "已挂断";
        }
        return str;
      };
    },
    jugeMuteImg() {
      if (this.pusherMute) {
        return "https://fs-omc.com/netcall/ic_noise_select.png";
      } else {
        return "https://fs-omc.com/netcall/ic_noise_default.png";
      }
    }
  },
  onLoad(options) {
    this.msgInfo = options;
    // console.log(msgInfo);
    // this.personList = options;
    // 同步成功
    uni.$event.once("syncDone", syncData => {
      this.localInfo = Object.assign(syncData.userlist[0], this.localInfo);
      this.personList = syncData.userlist.slice(1, syncData.userlist.length);
      this.$nextTick(() => {
        this.livePusherContext = uni.createLivePusherContext(
          "localPusher",
          this
        );
        this.livePusherContext.start();
        this.personList.forEach(item => {
          this.livePlayerContext[item.uid] = uni.createLivePlayerContext(
            `yunxinplayer-${item.uid}`,
            this
          );
          this.livePlayerContext[item.uid].play();
        });
      });
    });

    uni.$event.once("hangup", () => {
      this.hangup();
      uni.$event.off("hangup");
    });
    // 有人加入
    uni.$event.on("joinChannel", data => {
      console.log("joinChannel", data);
    });
    // 有人加入
    uni.$event.on("clientJoin", joinData => {
      console.log("加入的信息", joinData);
      // let personArr = this.personList;
      // personArr.forEach((item, index) => {
      //   if (item.uid == joinData.uid) {
      //     this.personList[index] = Object.assign(item, joinData);
      //   }
      // });
      // this.personList = personArr;
      this.personList.push(joinData);
      this.$nextTick(() => {
        this.livePlayerContext[joinData.uid] = uni.createLivePlayerContext(
          `yunxinplayer-${joinData.uid}`,
          this
        );
        this.livePlayerContext[joinData.uid].play();
      });
    });

    uni.$event.on("clientLeave", leaveData => {
      console.log("hangup", leaveData);
      let personArr = deepClone(this.personList);
      personArr.forEach(item => {
        if (item.uid == leaveData.uid) {
          this.livePlayerContext[leaveData.uid].stop();
          item.hangup = true;
        }
      });
      this.personList = personArr;
      // console.log(this.personList, personArr);
    });
  },
  methods: {
    // 拒绝接听
    rejectCallHandler() {
      uni.imController
        .sendCustomMessage({
          to: this.msgInfo.from,
          content: {
            room: this.msgInfo.roomId,
            type: this.msgInfo.type,
            customType: "reject"
          }
        })
        .then(res => {
          console.log("发送拒绝消息成功！");
          this.$uniPage.back();
        });
    },
    // 接听群聊
    acceptCallHandler() {
      uni.netcallController
        .answerJoin({
          roomId: this.msgInfo.roomId
        })
        .then(data => {
          console.log("加入房间成功", data);
          this.beCalling = false;
          this.onTheCall = true;
          // let arr = JSON.parse(this.msgInfo.personList);
          // this.personList = arr.filter(item => {
          //   item.uid = data.accountUidMap[item.cloudAccount];
          //   if (item.cloudAccount == data.account) {
          //     this.localInfo = item;
          //   } else {
          //     return item;
          //   }
          // });
        })
        .catch(err => {
          console.warn("加入房间失败", err);
        });
    },
    // 点击放大
    hendlePlayer(item) {
      if (item.hangup) return;
      if (!this.currentFullScreen) {
        this.livePlayerContext[item.uid].requestFullScreen({
          direction: 0,
          success: () => {
            this.currentFullScreen = item.uid;
          }
        });
      } else {
        this.livePlayerContext[item.uid].exitFullScreen({
          success: () => {
            this.currentFullScreen = null;
          }
        });
      }
    },
    // 点击挂断
    hangup() {
      uni.netcallController.leaveChannel();
      this.$uniPage.back();
    },
    // 点击静音
    handleMute() {
      this.pusherMute = !this.pusherMute;
    },
    // 切换摄像头
    switchCamera() {
      this.livePusherContext.switchCamera();
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
  height: calc(100vh - 124upx);
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
.calling-camera {
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
  bottom: 50upx;
  left: 50%;
  transform: translateX(-50%);

  .mute-btn,
  .hangup-btn,
  .switch-btn {
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
  .mute-btn,
  .switch-btn {
    background-color: #bbb;
  }
}

/* 视频容器 */
.video-wrapper {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  position: relative;
  // background-color: #000;
  .video-box {
    width: 240upx;
    height: 240upx;
    margin: 5upx;
  }
  .mask-box {
    width: 100%;
    height: 100%;
    background-color: rgba($color: #fff, $alpha: 0.8);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
  }
}
</style>
