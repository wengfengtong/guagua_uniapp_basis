<template>
  <view
    class="container"
    :style="{paddingTop:statusBarHeight+'px',height:(isAndroid?48:44)+(statusBarHeight)+'px'}"
  >
    <view class="nav-box">
      <view v-if="type==='default'">
        <g-icon class="icon" type="uni" name="arrowleft" size="24" v-if="backIcon" />
        <text class="title" :style="{color:titleColor,fontSize:(titleSize/2)+'px'}">{{title}}</text>
      </view>
      <view v-else-if="type==='custom'">
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "navigation",
  props: {
    type: {
      type: String,
      default: "default"
    },
    backIcon: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: "标题"
    },
    titleColor: {
      type: String,
      default: "white"
    },
    titleSize: {
      type: String,
      default: "36"
    }
  },
  data() {
    return {
      statusBarHeight: 20,
      isAndroid: false
    };
  },
  created() {
    const systemInfo = uni.getSystemInfoSync();
    this.statusBarHeight = systemInfo.statusBarHeight;
    this.isAndroid = systemInfo.system.indexOf("Android") > -1 ? true : false;
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  overflow: hidden;
  padding: 0upx $uni-spacing;
  background-color: $uni-color-primary;
  z-index: 99;
  box-sizing: border-box;
  .nav-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    .icon {
      position: absolute;
      top: 50%;
      left: -10upx;
      transform: translateY(-50%);
    }
    .title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
