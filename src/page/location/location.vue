/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：位置
*/
<template>
  <transition name="slide">
    <div class="location">
      <div class="header border-1px">
        <i class="back"></i>
        <input type="text" class="search" placeholder="请输入收货地址" v-model.trim="search" @keyup.enter="submit"/>
        <i class="clear" v-show="search" @click.stop="clearSearch"></i>
      </div>
      <div class="map-tip">蓝色区域为当前市场配送范围</div>
      <div class="content">
        <scroll>
          <div>
            <div class="map" id="map"></div>
            <ul class="list">
              <li class="item border-1px">
                <div class="name">黄沙冷仓<span class="current">当前</span></div>
                <div class="dec">广州市番禺区南桥街道南堤东路836号</div>
              </li>
              <li class="item border-1px">
                <div class="name">黄沙冷仓</div>
                <div class="dec">广州市番禺区南桥街道南堤东路836号</div>
              </li>
              <li class="item border-1px">
                <div class="name">黄沙冷仓</div>
                <div class="dec">广州市番禺区南桥街道南堤东路836号</div>
              </li>
              <li class="item border-1px">
                <div class="name">黄沙冷仓</div>
                <div class="dec">广州市番禺区南桥街道南堤东路836号</div>
              </li>
              <li class="item border-1px">
                <div class="name">黄沙冷仓</div>
                <div class="dec">广州市番禺区南桥街道南堤东路836号</div>
              </li>
              <li class="item border-1px">
                <div class="name">黄沙冷仓</div>
                <div class="dec">广州市番禺区南桥街道南堤东路836号</div>
              </li>
              <li class="item border-1px">
                <div class="name">黄沙冷仓</div>
                <div class="dec">广州市番禺区南桥街道南堤东路836号</div>
              </li>
              <li class="item border-1px">
                <div class="name">黄沙冷仓</div>
                <div class="dec">广州市番禺区南桥街道南堤东路836号</div>
              </li>
              <li class="item border-1px">
                <div class="name">黄沙冷仓</div>
                <div class="dec">广州市番禺区南桥街道南堤东路836号</div>
              </li>
            </ul>
          </div>
        </scroll>
      </div>
      <div class="search-list" v-show="search">
        <ul class="list">
          <li class="item border-1px">
            <div class="name">黄沙冷仓<span class="current">当前</span></div>
            <div class="dec">广州市番禺区南桥街道南堤东路836号</div>
          </li>
          <li class="item border-1px">
            <div class="name">黄沙冷仓</div>
            <div class="dec">广州市番禺区南桥街道南堤东路836号</div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import scroll from '@/components/scroll/scroll'
  import AMap from 'AMap'   //在页面中引入高德地图

  export default {
    data() {
      return {
        search: '',
        searchList: [],
        mapList: []
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
    created() {
      const map = new AMap.Map('map', {
        resizeEnable: true,
        zoom: 10,
        center: [116.480983, 40.0958]
      });
      console.log(map)

    },
    components: {
      scroll
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import "../../common/css/mixin";
  @import '~vux/src/styles/close.less';

  .location {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    .content {
      position: absolute;
      left: 0;
      right: 0;
      top: 2.2rem;
      bottom: 0;
      overflow: hidden;
    }
    .map-tip {
      height: 1.5rem;
      line-height: 1.5rem;
      padding: 0 .6rem;
      font-size: .7rem;
      opacity: 0.9;
      background: #FFF8ED;
      color: #FFBD52;
    }
    .map {
      height: 12.3rem;
      width: 100%;
    }
    .header {
      height: 2.2rem;
      line-height: 2.2rem;
      display: flex;
      background-color: #f5f5f5;
      padding-right: .6rem;
      .border-1px(#e5e5e5);
      .back {
        display: inline-block;
        flex: 0 0 1.7rem;
        width: 1.7rem;
        background: url("../../common/img/common/back.png") no-repeat center;
        background-size: 70%;
      }
      .search {
        flex: 1;
        display: inline-block;
        height: 1.5rem;
        border: .5px #e5e5e5 solid;
        border-radius: .2rem;
        margin: .35rem 0;
        box-sizing: border-box;
        background: #ffffff url("../../common/img/location/search.png") no-repeat .4rem center;
        background-size: .65rem .65rem;
        padding-left: 1.3rem;
        font-size: .6rem;
        color: #999999;
        padding-right: 2rem;
      }
      .clear {
        position: absolute;
        right: 1rem;
        top: .5rem;
        background: url("../../common/img/location/clean_btn.png") no-repeat center;
        width: 1.2rem;
        height: 1.2rem;
        background-size: .6rem .6rem;
      }
    }
    .search-list {
      position: fixed;
      top: 2.7rem;
      left: .6rem;
      right: .6rem;
      bottom: 0;
      z-index: 20;
      background: #FFFFFF;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.40);
      border-radius: 4px;
      overflow-y: scroll;
    }
    .list {
      padding: 0 .6rem;
      background-color: #ffffff;
      .item {
        .border-1px(#e5e5e5);
        height: 3rem;
        background: url("../../common/img/location/maps.png") no-repeat left .6rem;
        background-size: .6rem .75rem;
        padding-left: 1rem;
        padding-top: .5rem;
        box-sizing: border-box;
        &:last-child {
          .border-none();
        }
        .name {
          font-size: .7rem;
          line-height: 1rem;
        }
        .current {
          font-size: .55rem;
          display: inline-block;
          width: 1.5rem;
          height: .8rem;
          background: #FFBD52;
          border-radius: 2px;
          color: #ffffff;
          line-height: .8rem;
          text-align: center;
          margin-left: .35rem;
        }
        .dec {
          font-size: .6rem;
          line-height: .85rem;
          color: #999999;
          margin-top: .2rem;
        }
      }
    }
  }
</style>
