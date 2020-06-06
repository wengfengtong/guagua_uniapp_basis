
<template>
  <view class="segment-box">
    <view
      :class="['segment-item',index==selectIndex?'active':'']"
      v-for="(item,index) in data"
      :key="index"
      @click="hendleClick(index)"
    >{{field?item[field]:item}}</view>
  </view>
</template>

<script>
export default {
  name: "segmentTab",
  props: {
    data: {
      type: [Object, Array]
    },
    value: {
      type: Number,
      value: 0
    },
    field: {
      type: String,
      value: ""
    }
  },
  data() {
    return {
      selectIndex: this.value
    };
  },
  computed: {},
  created() {},
  methods: {
    hendleClick(index) {
      this.selectIndex = index;
      this.$emit("click", {
        value: index,
        data: this.data[this.selectIndex]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.segment-box {
  width: 100%;
  height: 108upx;
  background-color: $uni-bg-color;
  display: flex;
  flex-direction: row;
  padding: 0upx 32upx;
  box-sizing: border-box;
  .segment-item {
    height: 100%;
    padding: 0upx 32upx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .active {
    font-size: 36upx;
    font-weight: bold;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      bottom: 14%;
      left: 50%;
      transform: translate(-50%, 0%);
      width: 40%;
      height: 8upx;
      background-color: #41d4c5;
      border-radius: 8upx;
    }
  }
}
</style>
