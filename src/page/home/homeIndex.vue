/*
* @Author: WuFengliang
* @Date: 2017-12-26 23:24:33
* DeveloperMailbox:   wufengliang@ccw163.com
* FunctionPoint:  首页模块主页
*/
<template>
  <div>
    <top-bar></top-bar>
    <coupon></coupon>
    <scroller lock-x ref="scroller" height="-50">
      <div>
      </div>
    </scroller>
    <menu-bar ref="footer"></menu-bar>
  </div>
</template>
<script>
  import {Scroller} from 'vux'
  import menuBar from '@/components/footer/menuBar'
  import topBar from '@/components/topBar/topBar'
  import coupon from '@/components/coupon/coupon'

  export default {
    name: 'homeIndex',
    components: {menuBar, Scroller,topBar,coupon}
  }
</script>
<style lang="css" scoped>

</style>
