/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：全局顶部弹窗
*/
<template>
  <div class="top-bar">
    <i class="close"></i>
    <div>点击打开按钮立即下载菜城APP</div>
    <button type="button" class="open">打开</button>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .top-bar
    height 44px
    width 100%
    position relative
    line-height 44px
    text-align center
    font-size 14px
    .close
      height 22px
      width 22px
      background url("close_ic@2x.png")no-repeat center
      background-size contain
      position absolute
      left 14px
      top 11px
      bottom 11px
    .open
      width 60px
      height 24px
      color #fff
      position absolute
      right 12px
      top 10px
      bottom 10px
      border-radius 2px
      background #FFBD52 url("open_ic@2x.png") no-repeat 50px center
      background-size 5px 7px
      line-height 20px
</style>
