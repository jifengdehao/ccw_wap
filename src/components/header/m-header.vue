/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：通用头部+返回
*/
<template>
  <div class="m-header border-1px">
    <i class="icon-back" @click="back"></i>
    {{$route.name}}
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    methods: {
      back() {
        return this.$router.back()
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import "../../common/css/mixin";

  .m-header {
    height: 2.2rem;
    line-height: 2.2rem;
    text-align: center;
    font-size: .9rem;
    color: #222;
    background-color: #FFFFFF;
    .border-1px();
    .icon-back {
      width: 1rem;
      height: 1rem;
      vertical-align: middle;
      position: absolute;
      top: .6rem;
      left: .6rem;
      background: url("../../common/img/common/back.png") no-repeat center;
      background-size: contain;
    }
  }
</style>
