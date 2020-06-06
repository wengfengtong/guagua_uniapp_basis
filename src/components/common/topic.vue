
<template>
  <view class="topic-box" @click="hendleTopicContent">
    <view class="topic-top">
      <image class="topic-avatar" src="http://img3.a0bi.com/upload/ttq/20161015/1476518118768.png" />
      <view class="topic-top-info">
        <text class="publish-name">鹿晗没我帅</text>
        <text class="publish-time">5分钟前</text>
      </view>
      <view class="more">
        <g-icon name="share" size="28" color="#666" />
      </view>
    </view>
    <!-- 此处为content -->
    <view class="topic-content-text">今天鹿晗来我们学校了，看到真人还是没有我帅 今天鹿晗来我们学校了，看到真人还是.</view>
    <!-- 媒体区域 -->
    <view class="topic-content-media">
      <image
        class="media-item"
        lazy-load="true"
        v-for="(item,index) in topicData.assetsList"
        :key="index"
        :src="item"
        @click.stop="hendleTopicImage"
      />
    </view>

    <view class="topic-bottom">
      <view class="edit-container" @click="addApproval">
        <g-icon type="uni" name="heart" color="#85583B" size="20" />
        <text>28</text>
      </view>
      <view class="edit-container">
        <g-icon type="uni" name="chat" color="#85583B" size="20" />
        <text>28</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "topic",
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      topicData: {
        assetsList: [
          "http://img3.a0bi.com/upload/ttq/20161015/1476518118768.png"
        ]
      }
    };
  },
  computed: {},
  created() {},
  methods: {
    hendleTopicContent() {},
    hendleTopicImage() {},
    addApproval() {}
  }
};
</script>

<style lang="scss" scoped>
.topic-box {
  width: 100%;
  background-color: $uni-bg-color;
  padding: 32upx;
  box-sizing: border-box;
  .topic-top {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;

    .topic-avatar {
      width: 88upx;
      height: 88upx;
      border-radius: 50%;
      margin-right: 20upx;
    }

    .topic-top-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .publish-name {
        width: 420upx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 30upx;
        font-weight: 400;
        color: #333;
      }

      .publish-time {
        color: #999;
        font-size: 24upx;
        margin-top: 8upx;
      }
    }

    .more {
      position: absolute;
      top: 50%;
      right: 20upx;
      transform: translateY(-50%);
    }
  }

  .topic-content-text {
    font-size: 32upx;
    color: #333;
    margin-top: 20upx;
    text-align: left !important;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .topic-content-media {
    margin: 20upx 0;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    position: relative;
    .media-item {
      width: 208upx;
      height: 208upx;
      border-radius: 12upx;
      margin: 10upx;
    }

    .media-one {
      width: 384upx;
      height: 198upx;
    }
  }
  .edit-container,
  .topic-bottom {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .topic-bottom {
    font-size: 24upx;
    color: #808080;
    margin-top: 30upx;
    justify-content: flex-end;
    .edit-container {
      margin-left: 40upx;
      text {
        margin-left: 10upx;
      }
    }
  }
}
</style>
