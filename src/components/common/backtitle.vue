<template>
  <view class="contianer">
    <view class="head">
      <image class="task-list-image" src="https://fs-omc.com/jobInvocation/head-bg.png"></image>
      <view class="head-content">
        <button @click="goback" class="to-back" v-if="backIcon" :plain="true" hover-class="active" :hover-start-time="0"
          :hover-stay-time="200">
          <uni-icons class="btn" type="arrowleft" color="white"></uni-icons>
        </button>
        <text v-if="title" class="title">{{title}}</text>
        <template v-else>
          <slot></slot>
        </template>
      </view>
    </view>
  </view>
</template>
<script>
  import {
    uniIcons
  } from '@dcloudio/uni-ui';
  export default {
    components: {
      uniIcons
    },
    name: "backtitle",
    props: {
      title: {
        type: String,
        value: ''
      },
      backIcon: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      goback() {
       this.$emit("back")
        uni.navigateBack({
          delta: 1
        })
      }
    }

  }
</script>
<style lang="scss">
  .btn text {
    font-size: 40rpx !important;
  }
</style>
<style lang="scss" scoped>
  .contianer {
    .task-list-image {
      width: 100%;
      height: 168rpx;
    }

    .head {
      height: 168rpx;
      width: 100%;
      position: relative;
      z-index: 99;
    }

    .head-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 124rpx;
      margin-top: 44rpx;
      font-size: 34rpx;
      color: #fff;
      text-align: center;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      .title {
        padding: 0 100rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .to-back {
      position: absolute;
      top: 50%;
      left: 42rpx;
      padding: 0;
      box-sizing: border-box;
      display: flex;
      width: 60rpx;
      height: 60rpx;
      justify-content: center;
      align-items: center;
      z-index: 777;
      transform: translateY(-50%);
      border-radius: 50%;
      overflow: hidden;
      border: 0;
    }
  }

  .active {
    background-color: rgba(0, 0, 0, .6);
    opacity: .5;
  }
</style>
