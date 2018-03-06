/*
* @Author: WuFengliang
* @Date: 2017-12-26 23:24:33
* DeveloperMailbox:   wufengliang@ccw163.com
* FunctionPoint:  首页模块主页
*/
<template>
  <div class="home">
    <div class="location">
      <span class="icon-location"></span>
      <span class="name" v-if="locationName">{{locationName}}</span>
    </div>
    <div class="scroll-wrapper">
      <loading v-if="!marketList.length>0"></loading>
      <scroll ref="scroll" :data="marketList" v-else>
        <div>
          <div v-if="swiperList.length>0">
            <slide :showDot="false">
              <div v-for="item in swiperList">
                <a :href="item.linkUrl">
                  <img @load="loadImage" :src="item.picUrl" class="needsclick"/>
                </a>
              </div>
            </slide>
          </div>
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
        </div>
      </scroll>
      <div class="location-tip" v-show="showLocationTip">
        <i class="close" @click="showLocationTip=!showLocationTip"></i>
      </div>
    </div>
    <menu-bar></menu-bar>
    <div id="map"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import menuBar from '@/components/footer/menuBar'
  import marketList from '@/page/home/market-list'
  import loading from '@/components/loading/loading'
  import Scroll from '@/components/scroll/scroll'
  import Slide from '@/components/slide/slide'
  import AMap from 'AMap'   //在页面中引入高德地图
  import * as api from '@/api/http' // http模块
  import {mapMutations} from 'vuex'
  import * as store from '@/vuex/util'

  export default {
    name: 'homeIndex',
    components: {menuBar, marketList, loading, Scroll, Slide},
    data() {
      return {
        locationName: '', // 位置信息
        swiperList: [], // 轮播图
        marketList: [], // 市场列表
        showLocationTip: false, // 是否显示提示
      }
    },
    mounted() {
      setTimeout(() => {
        this.initMap();
      }, 20);
    },
    methods: {
      // 加载图片
      loadImage() {
        if (!this.checkImg) {         /* 加载完一张图片时不再执行 */
          this.checkImg = true
          this.$refs.scroll.refresh()
        }
      },
      // 获取定位
      initMap() {
        let that = this
        let map, geolocation
        map = new AMap.Map('map') //iCenter是id容器名称
        map.plugin('AMap.Geolocation', function () {
          geolocation = new AMap.Geolocation({
            timeout: 10000,   //超过10秒后停止定位，默认：无穷大
            maximumAge: 0, //定位结果缓存0毫秒，默认：0
          });
          map.addControl(geolocation)
          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', function (data) {  //返回定位成功信息
            console.log(data)
            that.setLocation(data) // 保存定位信息
            that.locationName = data.formattedAddress // 位置标题信息
            let params = {
              marketId: '-1',
              positionInfos: [{
                longitude: data.position.getLng(),
                latitude: data.position.getLat()
              }]
            }
            api.isAddressCover(params).then((res) => {
              if (res.code === 200) {
                if (!res.data[0]) {
                  alert('当前位置不在配送范围内');
                  that.getNearMarket(params.positionInfos[0]);
                  that.getBanner();
                  that.showLocationTip = true
                } else {
                  that.$router.push('/index')
                }
              }
            })
          })
          AMap.event.addListener(geolocation, 'error', function (data) {  //返回定位失败信息
            if (data.info == 'FAILED') {
              alert('获取您当前位置失败！')
            }
          })
        })
      },
      //获取附近的菜市场，不在配送范围内
      getNearMarket(params) {
        api.getNearMarket(params).then((res) => {
          if (res.code === 200) {
            console.log(res.data);
            this.marketList = res.data
          }
        })
      },
      // vux 保存位置和选择菜市场
      ...mapMutations({
        setLocation: 'SET_LOCATION',
        setMarket: 'SET_MARKET'
      }),
      // 轮播图
      getBanner() {
        const type = 1
        api.getBanner(type).then((res) => {
          if (res.code === 200) {
            console.log(res.data)
            this.swiperList = res.data
          }
        })
      },
      // 选择菜市场
      selectMarket(item) {
        console.log(item)
        this.setMarket(item);
        this.$router.push('/index');
      }
    }
  }
</script>
<style lang="less" scoped type="text/less">
  #map {
    height: 0;
    display: none;
  }
  .home {
    height: 100%;
    background-color: #FFFFFF;
    .location {
      height: 2.2rem;
      line-height: 2.2rem;
      text-align: center;
      font-size: 0;
      .icon-location {
        display: inline-block;
        width: 1rem;
        background: url("../../common/img/home/home_location_ic.png") no-repeat center;
        background-size: contain;
        height: 2.2rem;
        vertical-align: top;
      }
      .name {
        display: inline-block;
        font-size: .6rem;
        margin-left: .4rem;
        height: 2.2rem;
      }
    }
    .scroll-wrapper {
      position: absolute;
      top: 2.2rem;
      left: 0;
      right: 0;
      bottom: 2.5rem;
      overflow: hidden;
      .location-tip {
        position: fixed;
        bottom: 2.5rem;
        left: 0;
        right: 0;
        z-index: 10;
        height: 2.7rem;
        background: url("../../common/img/home/home_bg.png") no-repeat center;
        background-size: cover;
        .close {
          position: absolute;
          top: .9rem;
          right: .6rem;
          width: .9rem;
          height: .9rem;
          background: url("../../common/img/home/home_close_btn.png") no-repeat center;
          background-size: contain;
        }
      }
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
    }
  }
</style>
