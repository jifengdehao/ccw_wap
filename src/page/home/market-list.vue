/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：菜市场列表
*/
<template>
  <div class="market-list">
    <div class="item">
      <img v-lazy="imgUrl"/>
      <div class="content">
        <div class="na">
          <span class="name">清河菜市场</span>
          <span class="range">(该市场配送范围：3km)</span>
        </div>
        <div class="ad clearfix">
          <span class="fl">广州市番禺区南桥街道南堤东路836号</span>
          <span class="fr">2.0km</span>
        </div>
      </div>
    </div>
    <div class="item">
      <img v-lazy="imgUrl"/>
      <div class="content">
        <div class="na">
          <span class="name">清河菜市场</span>
          <span class="range">(该市场配送范围：3km)</span>
        </div>
        <div class="ad clearfix">
          <span class="fl">广州市番禺区南桥街道南堤东路836号</span>
          <span class="fr">2.0km</span>
        </div>
      </div>
    </div>
    <div class="item">
      <img v-lazy="imgUrl"/>
      <div class="content">
        <div class="na">
          <span class="name">清河菜市场</span>
          <span class="range">(该市场配送范围：3km)</span>
        </div>
        <div class="ad clearfix">
          <span class="fl">广州市番禺区南桥街道南堤东路836号</span>
          <span class="fr">2.0km</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      data: {
        type: Object
      }
    },
    data() {
      return {
        imgUrl:'https://y.gtimg.cn/music/photo_new/T003R720x288M000004Pq1an2tnnQu.jpg?max_age=2592000'
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
        height: 9rem;
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
