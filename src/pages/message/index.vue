<template>
  <view class="layout">
    <uni-list class="list-box">
      <uni-list-item  title="标题文字" thumb="/static/imgs/icons/like.png"></uni-list-item>
    </uni-list>

    <view class="reply-box">
      <view class="user-box">
        <image
          class="avatar-img"
          src="http://img3.imgtn.bdimg.com/it/u=1820523987,3798556096&fm=26&gp=0.jpg"
        />
        <view class="name-box">
          <view>在没有人的世界里当老板</view>
          <view class="create-time">5分钟前</view>
        </view>
        <g-icon class="edit-btn" type="uni" name="more" color="#999999" />
      </view>
      <view class="centent-box">
        <view class="centent-text">今天鹿晗来我们学校了，看到真人还是没有我帅今天鹿晗来我们学校了，看到真人还是.</view>
        <view class="topic">回复我的帖子: 为什么在大学的恋情</view>
        <view class="reply-btn">回复</view>
      </view>
    </view>
  </view>
</template>

<script>
import { uniList, uniListItem } from "@dcloudio/uni-ui";
export default {
  components: { uniList, uniListItem },
  data() {
    return {
      title: "Hello"
    };
  },
  onLoad(options) {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
.list-box{
  margin-bottom: 10upx;
}
.reply-box {
  background-color: $uni-bg-color;
  padding: 32upx;
  box-sizing: border-box;
  font-size: 28upx;
  .user-box {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    .avatar-img {
      width: 88upx;
      height: 88upx;
      border-radius: 50%;
    }
    .name-box {
      margin-left: 24upx;
      .createTime {
        margin-top: 6upx;
        font-size: 24upx;
        color: $uni-text-color-grey;
      }
    }
    .edit-btn {
      position: absolute;
      right: 10upx;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.centent-box {
  margin-left: 112upx;
  .centent-text {
    width: 100%;
    color: #333;
    margin: 32upx 0;
  }
  .topic {
    width: 100%;
    height: 104upx;
    background-color: #f5f5f7;
    padding: 32upx;
    box-sizing: border-box;
    color: #777;
  }
  .reply-btn {
    padding: 32upx 0;
    font-size: 30upx;
    color: #3494d4;
    border-bottom: 1px solid #f2f2f2;
  }
}
</style>
