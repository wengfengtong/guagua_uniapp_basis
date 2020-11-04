<template>
  <view class="layout">
    <!-- 导航区域 -->
    <navigation type="custom">
      <view class="nav-box">
        <g-icon name="dingwei" color="white" />
        <text class="school-name">广东科学干部学院</text>
      </view>
    </navigation>

    <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-box"></scroll-view>
  </view>
</template>

<script>
import navigation from "@/components/Navigation/index.vue";
import { uniNoticeBar } from "@dcloudio/uni-ui";
export default {
  components: {
    navigation,
    uniNoticeBar
  },
  data() {
    return {
      scrollTop: 0,
      swiperIndex: 1
    };
  },
  onLoad(options) {},
  mounted() {
    const userInfo = uni.getStorageSync("userInfo");
  },
  methods: {
    // 获取用户需要的权限
    getEditAuth() {
      if (getToken()) {
        uni.toPromise("authorize", { scope: "scope.userLocation" });
      }
    },
    // 点击查看更多公告
    hendleNiticeMore() {}
  }
};
</script>

<style lang="scss">
.layout {
  height: 100vh;
  .nav-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    .school-name {
      color: $uni-text-white;
      margin-left: 20upx;
      font-size: 36upx;
    }
  }
}

.scroll-box {
  flex: 1;
  box-sizing: border-box;
}
</style>
