<template>
  <view
    class="null-box"
    :style="{'marginTop':marginTop+'px'}"
    v-if="show && !$store.state.app.isShowLoading"
  >
    <image src="https://fs-omc.com/meteorological/noData.png" class="img" />
    <text>{{title}}</text>
  </view>
</template>

<script>
export default {
  name: "NullTip",
  props: {
    title: {
      type: String,
      default: "暂无任何数据"
    },
    show: {
      type: Boolean,
      default: false
    },
    marginTop: {
      type: [String, Number],
      default: 100
    }
  },
  methods: {
    goback() {
      uni.navigateBack({
        delta: 1
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.null-box {
  padding-bottom: 50upx;
  width: 100%;
  max-height: 500upx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .img {
    width: 385upx;
    height: 365upx;
  }
  text {
    text-align: center;
    margin-top: 30upx;
    color: #888;
    font-size: 28upx;
  }
}
</style>
