/*
* @Author: WuFengliang
* @Date: 2017-12-26 23:24:33
* DeveloperMailbox:   wufengliang@ccw163.com
* FunctionPoint:  首页模块主页
*/
<template>
  <div>
    <m-header></m-header>
    <div class="scroll">
      <top-bar></top-bar>
      <coupon></coupon>
      <swiper :list="demo03_list"
              :show-dots="false"
              :interval=5000
              auto loop
              @on-index-change="changeSwiper"
              class="swiper">
      </swiper>
      <market-list></market-list>
    </div>
    <menu-bar></menu-bar>
  </div>
</template>
<script>
  import mHeader from '@/page/home/header'
  import menuBar from '@/components/footer/menuBar'
  import topBar from '@/page/home/topBar'
  import coupon from '@/page/home/coupon'
  import marketList from '@/page/home/market-list'
  import {mapGetters} from 'vuex'
  import {Swiper} from 'vux'

  const baseList = [{
    url: 'javascript:',
    img: 'https://static.vux.li/demo/1.jpg',
    title: '送你一朵fua'
  }, {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/2.jpg',
    title: '送你一辆车'
  }, {
    url: '/activity/11',
    img: 'https://static.vux.li/demo/5.jpg',
    title: '送你一次旅行',
    fallbackImg:require('../../assets/logo.png')
  }]

  export default {
    name: 'homeIndex',
    components: {menuBar, topBar, coupon, marketList, Swiper,mHeader},
    data() {
      return {
        isCoupon: true,
        isTopBar: true,
        demo03_list: baseList
      }
    },
    methods: {
      changeSwiper(index) {
        console.log(index)
      }
    }
  }
</script>
<style lang="less" scoped type="text/less">
  .scroll {
    position: absolute;
    top: 2.2rem;
    left: 0;
    right: 0;
    bottom: 2.5rem;
    overflow-y: scroll;
  }
</style>
