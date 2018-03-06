/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：菜市场列表
*/
<template>
  <div class="market-list" v-if="marketList.length>0">
    <div class="item" v-for="item in marketList" @click="selectMarket(item)">
      <img v-lazy="item.picUrl"/>
      <div class="content">
        <div class="na">
          <span class="name">{{item.marketName}}</span>
          <span class="range">(该市场配送范围：{{item.deliverRange}})</span>
        </div>
        <div class="ad clearfix">
          <span class="fl">{{item.address}}</span>
          <span class="fr">{{parseInt(item.marketDistance/1000)}}km</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      marketList: {
        type: Array
      }
    },
    methods: {
      selectMarket(item) {
        this.$emit('selectMarket', item)
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">

  .market-list {
    padding: .6rem;
    box-sizing: border-box;
    .item {
      margin-bottom: .6rem;
      border-radius: .2rem;
      background-color: #e5e5e5;
      border: 0.5px solid #e5e5e5;
      & > img {
        width: 100%;
      }
      .content {
        height: 3rem;
        width: 100%;
        padding-top: .4rem;
        padding-left: .5rem;
        box-sizing: border-box;
        padding-right: .3rem;
        .na {
          margin-bottom: .1rem;
          .name {
            font-size: .8rem;
            line-height: 1.1rem;
          }
          .range {
            font-size: .6rem;
            line-height: .85rem;
          }
        }
        .ad {
          color: #999999;
          font-size: .6rem;
          line-height: .85rem;
        }
      }
    }
  }
</style>
