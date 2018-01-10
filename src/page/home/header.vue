/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：头部
*/
<template>
  <div class="header">
    <div class="content">
      <i class="icon-location"></i>
      <span class="text">清河小区</span>
      <i class="icon-msg"></i>
    </div>
    <router-link to="/location" tag="div" class="link-address">当前位置配送服务未开通，搜搜其他收货地址</router-link>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {}
</script>
<style scoped lang="less" type="text/less">
  .header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 10;
    .content{
      height: 2.2rem;
      padding: 0 .6rem;
      line-height: 2.2rem;
      font-size: 0;
      position: relative;
      .icon-location{
        width: 1rem;
        height: 1rem;
        background: url("../../common/img/home/home_location.png") no-repeat center;
        background-size: contain;
        display: inline-block;
        position: absolute;
        left: .6rem;
        top: .6rem;
      }
      .text{
        font-size: .8rem;
        color: #999999;
        display:inline-block;
        background: url("../../common/img/home/home_drop_down.png")no-repeat right center;
        background-size: .5rem 0.25rem;
        padding-right: .8rem;
        margin-left: 1.4rem;
      }
      .icon-msg{
        display: inline-block;
        width: 1rem;
        height: .95rem;
        background: url("../../common/img/home/home_news.png")no-repeat center;
        background-size: 1rem .95rem;
        position: absolute;
        right: .6rem;
        top: .6rem;
      }
    }
    .link-address{
      height: 1.5rem;
      width: 100%;
      line-height: 1.5rem;
      font-size: .65rem;
      color: #FF3C00;
      z-index: 10;
      opacity: .9;
      padding: 0 .6rem;
      background: #FFF8ED url("../../common/img/home/jump_gules.png")no-repeat right center;
      background-size: 1.2rem 1.2rem;
      box-sizing: border-box;
    }
  }
</style>
