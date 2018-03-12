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
        <span>{{index}}</span> / <span>{{demo01_list.length}}</span>
      </div>
      <!-- <swiper :list="demo01_list"  :height="imgHeigth" style="width:84%;margin:44px  auto;" @on-index-change="changeIndex"></swiper> -->
      <swiper :height="imgHeigth" style="width:84%;margin:10%  auto;" :show-dots="false" @on-index-change="changeIndex">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in demo01_list" :key="index" ><img :src="item"></swiper-item>
    </swiper>
    </div>
  </div>
</template>
<script>
import { Swiper, GroupTitle, SwiperItem, XButton, Divider, XHeader } from 'vux'
export default {
  components: { XHeader, Swiper, SwiperItem },
  props: {},
  data() {
    return {
      demo01_list: JSON.parse(this.$route.query.qualification),
      index: 1,
      imgHeigth: '26rem'
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