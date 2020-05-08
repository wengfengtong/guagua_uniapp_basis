<template>
  <form class="catchForm" report-submit @submit="catchSubmit">
    <button form-type="submit" class="catchBtn">
      <slot></slot>
    </button>
  </form>
</template>
<script>
export default {
  name: "formId",

  methods: {
    //点击即触发获取formId
    catchSubmit(e) {
      console.log("获取formId回调", e.detail.formId);
      //触发回调
      this.callback(e);
      /**
       * 提交数据到后端操作(接口未提供)
       */
    },
    /**
     * 捕获点击回调
     */
    callback(e) {
      uni.$emit("callback", e);
    }
  }
};
</script>
<style lang="scss" scoped>
.catchBtn {
  border: none;
  text-align: inherit;
  padding: 0;
  margin: 0;
  line-height: inherit;
  background: transparent;
  color: inherit;
  border-radius: 0;
  font-size: inherit;
  &::after {
    border: none;
  }
}
</style>
