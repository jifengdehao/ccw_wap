/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：搜索
*/
<template>
  <transition name="slide">
    <div class="search-wrapper">
      <div class="header vux-1px-b">
        <i class="back"></i>
        <div class="search-content">
          <input type="text" class="search" placeholder="附近档口商品" v-model.trim="search" @keyup.enter="submit"/>
          <i class="clear" v-show="search" @click="clearSearch"></i>
        </div>
        <button type="button" class="btn-search">搜索</button>
      </div>
      <div class="tab vux-1px-b">
        <router-link to="/search/goods" tag="div" class="tab-item">
          <span>商品</span>
        </router-link>
        <router-link to="/search/sellers" tag="div" class="tab-item">
          <span>档口</span>
        </router-link>
      </div>
      <!--<tab :line-width=2 active-color='#FFBD52'  custom-bar-width="26px">-->
      <!--<tab-item selected>商品</tab-item>-->
      <!--<tab-item>档口</tab-item>-->
      <!--</tab>-->
      <router-view></router-view>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import {Tab, TabItem} from 'vux'
  import Scroll from '@/components/scroll/scroll'

  export default {
    data() {
      return {
        search: ''
      }
    },
    methods: {
      submit() {
        console.log(this.search)
      },
      clearSearch() {
        this.search = ''
      }
    },
    components: {
      Tab,
      TabItem,
      Scroll
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import '~vux/src/styles/1px.less';

  .search-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    overflow: hidden;
    .header {
      height: 2.2rem;
      line-height: 2.2rem;
      display: flex;
      .back {
        display: inline-block;
        flex: 0 0 2.4rem;
        width: 2.4rem;
        background: url("../../common/img/common/back.png") no-repeat center;
        background-size: 50%;
      }
      .search-content {
        flex: 1;
        display: inline-block;
        height: 1.5rem;
        line-height: 1.5rem;
        border-radius: 4px;
        margin: .35rem 0;
        box-sizing: border-box;
        background: #f5f5f5 url("../../common/img/location/search.png") no-repeat .4rem center;
        background-size: .65rem .65rem;
        padding-left: 1.3rem;
        padding-right: 1.5rem;
        font-size: 0;
        position: relative;
        & > input {
          height: 1.5rem;
          width: 100%;
          font-size: .6rem;
          color: #999999;
          background-color: #f5f5f5;
        }
      }
      .clear {
        display: inline-block;
        background: url("../../common/img/location/clean_btn.png") no-repeat center;
        width: 1.2rem;
        height: 1.2rem;
        background-size: .6rem .6rem;
        position: absolute;
        right: .15rem;
        top: .15rem;
      }
      .btn-search {
        width: 2.5rem;
        height: 1.5rem;
        flex: 0 0 2.5rem;
        font-size: .7rem;
        text-align: center;
        background-color: #FFFFFF;
        border: 0.5px solid #E5E5E5;
        border-radius: 4px;
        box-sizing: border-box;
        margin: .35rem .6rem .35rem .5rem;
        color: #666666;
      }
    }
    .tab {
      height: 2.2rem;
      line-height: 2.2rem;
      text-align: center;
      display: flex;
      .tab-item {
        flex: 1;
        font-size: .8rem;
        &.router-link-active {
          & > span {
            color: #FFBD52;
            border-bottom: 2px solid #FFBD52;
            padding-bottom: .55rem;
          }
        }
      }
    }
  }
</style>
