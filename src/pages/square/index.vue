<template>
  <view class="layout">
    <!-- 金刚区 -->
    <scroll-view class="business-box">
      <view
        class="business-item"
        v-for="(item,index) in [1,2]"
        :key="index"
        @click="hendleColumnItem"
      >
        <image
          class="icon-img"
          src="http://static.wengbb.cn/%E8%B7%91%E8%85%BF%E8%B5%9A%E9%92%B1.png"
        />
        <text class="icon-name">表白墙</text>
      </view>
    </scroll-view>

    <view class="today-topic">
      <view class="title-box">
        <image src="@/static/icons/remen.png" />
        <text class="title-text">今日话题</text>
      </view>
      <view class="content-box">
        <view class="today-content">
          <text class="coontent-text">如果女生晚上单独行走在路上发现有人跟踪要怎么办?女生来说说吧!</text>
          <image class="content-img" src="http://static.wengbb.cn/Fr9vwaG7B91UFeGNCllSDSrear86" />
        </view>
        <view class="interaction-box">
          <view class="interaction-item">
            <g-icon type="uni" name="redo" color="#85583B" size="20" />
          </view>
          <view class="interaction-item">
            <g-icon type="uni" name="heart" color="#85583B" size="20" />
            <text>120</text>
          </view>
          <view class="interaction-item">
            <g-icon type="uni" name="chat" color="#85583B" size="20" />
            <text>120</text>
          </view>
        </view>
      </view>
    </view>
    <segment-tab class="segment-tab" :data='segmentList'></segment-tab>
    <topic class="topic-item"></topic>
  </view>
</template>

<script>
import topic from "@/components/Topic/index.vue";
import segmentTab from "@/components/SegmentTab/index.vue";
export default {
  components: {
    topic,
    segmentTab
  },
  data() {
    return {
      segmentList:['推荐',"本校"]
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
.layout {
  .business-box {
    width: 100%;
    padding: 32upx 0;
    background-color: $uni-bg-color;
    display: inline-block;
    .business-item {
      width: 96upx;
      float: left;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 40upx;
    }

    .icon-img {
      width: 96upx;
      height: 96upx;
    }

    .icon-name {
      font-size: 28upx;
      color: #666;
      margin-top: 12upx;
    }
  }
  .today-topic {
    width: 100%;
    background-color: white;
    box-sizing: border-box;
    padding: 32upx;
    margin-top: 20upx;
    .title-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      image {
        width: 22upx;
        height: 40upx;
        margin-right: 20upx;
      }
      .title-text {
        font-size: 32upx;
        color: #666;
      }
    }

    .content-box {
      margin-top: 20upx;
      background-color: #f5f5f7;
      border-radius: 10upx;
      box-sizing: border-box;
      padding: 32upx;
      .today-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #f2f2f2;
        padding-bottom: 20upx;
      }
      .coontent-text {
        width: 480upx;
        line-height: 40upx;
        color: #666;
        font-size: 28upx;
      }

      .content-img {
        width: 120upx;
        height: 120upx;
        border-radius: 16upx;
      }
    }

    .interaction-box {
      margin-top: 24upx;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      position: relative;
      .interaction-item {
        width: 80upx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-left: 32upx;
        font-size: 24upx;
        color: #85583b;
        &:nth-child(1) {
          margin-left: 0upx;
          position: absolute;
          left: 0;
        }
        text {
          margin-left: 4px;
        }
      }
    }
  }
  .segment-tab{
    margin-top: 20upx;
    border-bottom: 1upx solid #eee;
  }
  .topic-item {
    margin-bottom: 20upx;
  }
}
</style>
