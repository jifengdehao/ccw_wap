/*
* @Author: WuFengliang
* @Date: 2017-12-26 23:24:33
* DeveloperMailbox:   wufengliang@ccw163.com
* FunctionPoint:  首页模块主页
*/
<template>
  <div>
    <!--<m-header></m-header>-->
    <!--<div class="scroll">-->
    <!--<top-bar></top-bar>-->
    <!--<coupon></coupon>-->
    <!--<swiper :list="demo03_list"-->
    <!--:show-dots="false"-->
    <!--:interval=5000-->
    <!--auto loop-->
    <!--@on-index-change="changeSwiper"-->
    <!--class="swiper">-->
    <!--</swiper>-->
    <!--<market-list></market-list>-->
    <!--</div>-->
    <m-header></m-header>
    <div class="scroll-wrapper">
      <!--<scroller lock-x :height="scrollerHeight"-->
      <!--:use-pullup="true"-->
      <!--:pullup-config="pullupConfig"-->
      <!--@on-pullup-loading="pullup">-->
      <!--<div>-->
      <!--<market-list></market-list>-->
      <!--</div>-->
      <!--</scroller>-->
      <!--<scroll ref="scroll" :pullup="true" @scrollToEnd="scrollEnd">-->
      <!--<div>-->
      <!--<slide>-->
      <!--<div v-for="(item,index) in demo03_list">-->
      <!--<a :href="item.url">-->
      <!--<img :src="item.img">-->
      <!--</a>-->
      <!--</div>-->
      <!--</slide>-->
      <!--<market-list></market-list>-->
      <!--</div>-->
      <!--</scroll>-->
      <vue-scroll ref="scroll"
                  :click="true"
                  :pullUpLoad="false"
                  :scrollbar="false"
                  @pulling-down="pullingDown">
        <slide :showDot="false">
          <div v-for="(item,index) in demo03_list">
            <a :href="item.url">
              <img :src="item.img">
            </a>
          </div>
        </slide>
        <market-list></market-list>
      </vue-scroll>
    </div>
    <menu-bar></menu-bar>
  </div>
</template>
<script type="text/ecmascript-6">
  import mHeader from '@/page/home/header'
  import menuBar from '@/components/footer/menuBar'
  import topBar from '@/page/home/topBar'
  import coupon from '@/page/home/coupon'
  import marketList from '@/page/home/market-list'
  import loading from '@/components/loading/loading'
  import Scroll from '@/components/scroll/scroll'
  import Slide from '@/components/slide/slide'
  import {mapState} from 'vuex'
  //  import {Swiper, Scroller, LoadMore} from 'vux'

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
    img: 'https://static.vux.li/demo/3.jpg',
    title: '送你一次旅行',
    fallbackImg: require('../../assets/logo.png')
  }]

  export default {
    name: 'homeIndex',
    components: {menuBar, topBar, coupon, marketList, mHeader, loading, Scroll, Slide},
    data() {
      return {
        isCoupon: true,
        isTopBar: true,
        freeScroll: true,
        scrollbar: true,
        demo03_list: baseList,
        pullupConfig: {
          loadingContent: '...',
        }
      }
    },
    computed: {
      ...mapState([
        'menuBarH',
        'topBarH'
      ]),
      scrollerHeight() {
        return (parseInt(this.menuBarH) + parseInt(this.topBarH)).toString();
      }
    },
    created() {
      console.log(this.scrollerHeight)
    },
    methods: {
      changeSwiper(index) {
        console.log(index)
      },
      pullingDown() {
        console.log('pullingDown');
        setTimeout(() => {
          this.$refs.scroll.forceUpdate()
        }, 2000)
      }
    }
  }
</script>
<style lang="less" scoped type="text/less">
  .scroll-wrapper {
    position: absolute;
    top: 2.2rem;
    left: 0;
    right: 0;
    bottom: 2.5rem;
    overflow: hidden;
  }
</style>
