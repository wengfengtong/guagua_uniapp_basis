<template>
  <view class="layout home">{{title}}</view>
</template>

<script>
import { getToken } from "../../utils/auth";
import { jugeScene, showModal } from "../../utils/util";
export default {
  data() {
    return {
      title: "Hello"
    };
  },
  onLoad(options) {
    this.getEditAuth();
  },
  mounted() {
    const userInfo = uni.getStorageSync("userInfo");
  },
  methods: {
    // 添加事件监听
    addBackEvent() {
      uni.$on("refreshTask", () => {
        this.getInfoCount();
      });
    },
    // 跳转到用户中心
    openUserView() {
      this.$uniPage.push("/pages/user/index");
    },

    // 获取用户需要的权限
    getEditAuth() {
      if (getToken()) {
        uni.toPromise("authorize", { scope: "scope.userLocation" });
      }
    },
    // 天气接口
    async getWeatherData() {
    
    }
  }
};
</script>

<style lang="scss">
.layout {
  height: 100%;
  width: 100%;
  position: relative;
  background: #edf2f5;
  overflow: hidden;
}
</style>
