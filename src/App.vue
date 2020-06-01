<script>
import { getAccessToken, getUserInfo } from "./utils/auth";
import Emitter from "./utils/event";
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
.layout {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background: #edf2f5;
}
</style>
