<script>
import { getToken } from "./utils/auth";
import Emitter from "./utils/event";
import IMController from "./utils/yunxin/nim";
import { toPromise, updataVarsion } from "./utils/util";

export default {
  onLaunch: function(option) {
    console.log("App Launch", option);
    // 检测版本更新
    updataVarsion();
    // 存储启动参数到参库
    this.$store.commit("setAppLaunchOptions", option);
    // 挂载回调接口转promise
    uni.toPromise = toPromise;
    // 挂载自定义得event
    uni.$event = new Emitter();

    let userInfo = uni.getStorageSync("userInfo") || null;
    if (!userInfo || !getToken()) {
      this.$uniPage.replace({
        url: "/pages/login/index"
      });
      return;
    }

    // 初始化IM实例
    uni.imController = new IMController(
      userInfo.cloudAccount,
      userInfo.cloudAccountPassword
    );
    uni.$event.once("beCalling", data => {
      this.$uniPage.push({
        url: "/pages/p2pVideo/answer",
        params: {
          data
        }
      });
    });
  },

  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
</script>

<style lang="scss">
/*每个页面公共css */
page {
  height: 100%;
  overflow: hidden;
}

.clearfix {
  &:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }
}

.placeholder {
  color: #b2b2b2;
}
</style>
