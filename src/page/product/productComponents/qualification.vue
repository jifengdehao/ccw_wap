/*
 * @Author: huShangJun 
 * @Date: 2018-01-09 15:15:21 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 资质文件 
 */
<template>
  <div id="qualification">
    <div class="header">
      <x-header :left-options="{backText: ''}" style="background-color:#fff;height:44px">
        <span>商家资质</span>
      </x-header>
    </div>
    <div class="img">
      <div class="showIndex">
        <span>{{index}}</span> /
        <span>{{length}}</span>
      </div>
      <swiper :list="demo01_list" :show-dots="false" :height="imgHeigth" style="width:84%;margin:44px  auto;" @on-index-change="changeIndex"></swiper>
    </div>
  </div>
</template>
<script>
import { Swiper, GroupTitle, SwiperItem, XButton, Divider } from 'vux'

import { XHeader } from 'vux'
const baseList = [
  {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/1.jpg'
  },
  {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/2.jpg'
  },
  {
    url: '/activity/11',
    img: 'https://static.vux.li/demo/3.jpg'
  }
]
export default {
  components: { XHeader, Swiper },
  props: {},
  data() {
    return {
      demo01_list: baseList,
      index: 0,
      length: baseList.length,
      imgHeigth: '21rem'
    }
  },
  created() {},
  mounted() {},
  methods: {
    changeIndex(index) {
      this.index = index + 1
    }
  },
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" >
#qualification {
  position: relative;
  height: 100%;
  .header {
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 44px;
    box-sizing: border-box;
    span {
      font-size: 18px;
      color: #222222;
    }
    .vux-header .vux-header-left .left-arrow:before {
      border: 1px solid #666;
      border-width: 1px 0 0 1px;
    }
  }
  .img {
    position: absolute;
    top: 0;
    padding-top: 44px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #333;
    .showIndex {
      position: absolute;
      top: 54/20rem;
      left: 0.5rem;
      font-size: 12px;
      color: #ffffff;
    }
  }
}
</style>