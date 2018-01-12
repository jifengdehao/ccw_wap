/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：购物车
*/
<template>
  <div class="show-cart">
    <div class="content">
      <div class="badge">2</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {}
</script>
<style scoped lang="less" type="text/less">
  .show-cart{
    position: fixed;
    bottom: 2rem;
    left:.6rem;
    width: 2.5rem;
    height: 2.5rem;
    z-index: 1000;
    .content{
      position: relative;
      width: 2.5rem;
      height: 2.5rem;
      background: url("../../common/img/productIndex/shopping_big_ic.png")no-repeat center;
      background-size: contain;
      .badge{
        position: absolute;
        right: -0.1rem;
        top:-0.25rem;
        width: 1.2rem;
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: center;
        background-color: #FF3C00;
        color: #FFFFFF;
        font-size: .8rem;
        border-radius: 50%;
      }
    }
  }
</style>
