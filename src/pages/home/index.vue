<template>
  <view class="layout">
    <!-- 导航区域 -->
    <navigation type="custom">
      <view class="nav-box">
        <g-icon name="dingwei" color="white" />
        <text class="school-name">广东科学干部学院</text>
      </view>
    </navigation>

    <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-box">
      <!-- 滚动图区域 -->
      <swiper
        current="1"
        class="swiper-box"
        previous-margin="80rpx"
        next-margin="80rpx"
        @change="swiperChange"
      >
        <swiper-item class="swiper-item" v-for="(item,index) in bannerList" :key="index">
          <image
            mode="scaleToFill"
            :src="item.src"
            :class="['swiper-image',swiperIndex == index ? 'swiper-active' : '']"
          />
        </swiper-item>
      </swiper>

      <!-- 金刚区 -->
      <view class="businessWrap">
        <view
          class="businessItem"
          v-for="(item,index) in columnList"
          :key="index"
          @click="hendleColumnItem"
        >
          <image class="iconImg" :src="item.iconSrc" />
          <text class="iconName">{{item.name}}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import navigation from "@/components/common/navigation.vue";
export default {
  components: {
    navigation
  },
  data() {
    return {
      scrollTop: 0,
      swiperIndex: 1,
      bannerList: [
        {
          src: "http://img3.a0bi.com/upload/ttq/20161015/1476518118768.png"
        },
        {
          src: "http://img3.a0bi.com/upload/ttq/20161015/1476518118768.png"
        },
        {
          src: "http://img3.a0bi.com/upload/ttq/20161015/1476518118768.png"
        }
      ],
      columnList: [
        {
          iconSrc:
            "http://static.wengbb.cn/%E8%B7%B3%E9%AA%9A%E5%B8%82%E5%9C%BA.png",
          jupmUrl: "",
          name: "跳骚市场"
        },
        {
          iconSrc:
            "http://static.wengbb.cn/%E8%B7%B3%E9%AA%9A%E5%B8%82%E5%9C%BA.png",
          jupmUrl: "",
          name: "跳骚市场"
        },
        {
          iconSrc:
            "http://static.wengbb.cn/%E8%B7%B3%E9%AA%9A%E5%B8%82%E5%9C%BA.png",
          jupmUrl: "",
          name: "跳骚市场"
        },
        {
          iconSrc:
            "http://static.wengbb.cn/%E8%B7%B3%E9%AA%9A%E5%B8%82%E5%9C%BA.png",
          jupmUrl: "",
          name: "跳骚市场"
        }
      ]
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
    }
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
  // 轮播区域
  .swiper-box {
    background-color: $uni-bg-color;
    .swiper-item {
      padding: 20upx 0upx;
      height: 320upx;
      width: 600upx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 8upx;

      .swiper-image {
        height: 280upx;
        width: 550upx;
        box-shadow: 0px 0px 30upx rgba(0, 0, 0, 0.2);
        z-index: 1;
        border-radius: 8upx;
      }

      .swiper-active {
        transform: scale(1.072);
        transition: all 0.3s ease-in 0s;
        z-index: 20;
      }
    }
  }
  // 金刚区
  .businessWrap {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding: 20upx 50upx;
    box-sizing: border-box;
    margin-top: 20upx;
    background-color: $uni-bg-color;
    .businessItem {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .iconImg {
        width: 96upx;
        height: 96upx;
        border-radius: 50%;
        background-color: #ccc;
      }
      .iconName {
        margin-top: 12upx;
        font-size: 28upx;
        color: #666;
      }
    }
  }
}
</style>
