/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：位置
*/
<template>
  <div class="location">
    <div class="header border-1px">
      <i class="back" @click="back"></i>
      <div class="search-content">
        <input type="text" class="search" placeholder="请输入收货地址" id="search"/>
        <!--<i class="clear" v-show="search" @click.stop="clearSearch"></i>-->
      </div>
    </div>
    <div class="map-tip">蓝色区域为当前市场配送范围</div>
    <div class="map" id="map"></div>
    <div class="content">
      <scroll :data="mapList">
        <div>
          <ul class="list">
            <li class="item border-1px" v-for="(item,index) in mapList" :key="index"
                :class="{disabled:item.isDisabled === false}"
                @click="getAddressLocation(item)">
              <div class="name">{{item.name}}<span class="current" v-if="index === 0">当前</span></div>
              <div class="dec">{{item.address}}</div>
            </li>
          </ul>
        </div>
      </scroll>
    </div>
    <!--
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
    -->
  </div>
</template>
<script type="text/ecmascript-6">
  import AMap from 'AMap'   //在页面中引入高德地图
  import AMapUI from 'AMapUI'
  import * as api from '@/api/http.js'
  import {mapMutations, mapGetters} from 'vuex'
  import Scroll from '@/components/scroll/scroll'
  import {AlertModule} from 'vux'
  import Vue from 'vue'

  export default {
    data() {
      return {
        search: '', // 搜索
        searchList: [], // 搜索条件
        mapList: [], // 地址列表
        addressId: (() => {   // 地址Id
          return this.$route.params.id
        })()
      }
    },
    components: {
      Scroll
    },
    created() {
      this.getDeliverArea()
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    methods: {
      // 获取选中的地址
      getAddressLocation(item) {
        if (this.addressId && item.isDisabled) {
          // 修改地址
          let params = {
            custId: JSON.parse(this.user).cust_id,
            latitude: item.location.lat,
            longitude: item.location.lng,
            buildingName: item.name,
            addr: item.address,
            addrId: this.addressId
          }
          api.putCustomAddress(params).then((res) => {
            if (res.code === 200 && res.data) {
              this.$router.back()
            }
          })
        } else {
          if (item.isDisabled) {
            this.setAddmodress({
              buildingName: item.name,
              addr: item.address,
              longitude: item.location.lng,
              latitude: item.location.lat
            })
            this.$router.back()
          }
        }
      },
      // 搜索
      submit() {
      },
      // 清除搜索字段
      clearSearch() {
        this.search = ''
      },
      // 返回
      back() {
        return this.$router.back()
      },
      // 获取配送范围
      getDeliverArea() {
        api.getDeliverArea().then((res) => {
          if (res.code === 200 && res.data.length > 0) {
            let polygonArr = new Array()
            let self = this
            for (let i = 0; i < Array.of(res.data).length; i++) {
              let arj = JSON.parse(res.data[i])
              for (let j = 0; j < arj.length; j++) {
                polygonArr.push(arj[j])
              }
            }
            let map = new AMap.Map('map', {
              zoom: 16,
              resizeEnable: true,
              scrollWheel: false
            })
            let polygon = new AMap.Polygon({
              path: polygonArr,//设置多边形边界路径
              strokeColor: "#4A90E2", //线颜色
              strokeOpacity: 0.2, //线透明度
              strokeWeight: 1,    //线宽
              fillColor: "#8DC2FF", //填充色
              fillOpacity: 0.35//填充透明度
            })
            polygon.setMap(map)
            map.setFitView()
            AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
              let autoOptions = {
                input: 'search'//使用联想输入的input的id
              }
              let autocomplete = new AMap.Autocomplete(autoOptions);
              let placeSearch = new AMap.PlaceSearch({
                map: map
              })
              AMap.event.addListener(autocomplete, 'select', function (e) {
                //TODO 针对选中的poi实现自己的功能
                placeSearch.search(e.poi.name)
              })
            })
            if (this.addressId) {
              api.getCustomAddressDetails(this.addressId).then((res) => {
                if (res.code === 200) {
                  let lnglatXY = [res.data.longitude, res.data.latitude]
                  // 拖拽
                  AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {
                    let positionPicker = new PositionPicker({
                      mode: 'dragMap',
                      map: map
                    })
                    positionPicker.on('success', function (positionResult) {
                      // 判断是否在配送范围
                      let positionArr = new Array()
                      positionResult.regeocode.pois.forEach((item) => {
                        positionArr.push({
                          latitude: item.location.lat,
                          longitude: item.location.lng
                        })
                      })
                      let params = {
                        marketId: '-1',
                        positionInfos: positionArr
                      }
                      api.isAddressCover(params).then((res) => {
                        if (res.code === 200 && res.data.length > 0) {
                          let pois = positionResult.regeocode.pois
                          for (let i = 0; i < res.data.length; i++) {
                            Vue.set(pois[i], 'isDisabled', res.data[i])
                          }
                          self.mapList = positionResult.regeocode.pois
                        }
                      })
                    })
                    positionPicker.on('fail', function (positionResult) {
                      self.mapList = []
                    })
                    positionPicker.start(lnglatXY)
                  })
                  map.plugin('AMap.Geolocation', function () {
                    let geolocation = new AMap.Geolocation({
                      enableHighAccuracy: true,//是否使用高精度定位，默认:true
                      timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                      zoomToAccuracy: true,    //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                      buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
                      showMarker: false,        //定位成功后在定位到的位置显示点标记，默认：true
                      showCircle: false        //定位成功后用圆圈表示定位精度范围，默认：true
                    })
                    map.addControl(geolocation)
                    AMap.event.addListener(geolocation, 'complete', function (data) { //返回定位信息
                      console.log(data, '定位的点')
                    })
                    AMap.event.addListener(geolocation, 'error', function (data) {  //返回定位出错信息
                      if (data.info == 'FAILED') {
                        // alert('获取你当前位置失败！')
                        AlertModule.show({
                          title: '提示',
                          content: '定位失败',
                          onShow() {
                            console.log('Module: I\'m showing')
                          },
                          onHide() {
                            console.log('Module: I\'m hiding now')
                          }
                        })
                      }
                    })
                  })
                }
              })
            } else {
              map.plugin('AMap.Geolocation', function () {
                let geolocation = new AMap.Geolocation({
                  enableHighAccuracy: true,//是否使用高精度定位，默认:true
                  timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                  zoomToAccuracy: true,    //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                  buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
                  showMarker: false,        //定位成功后在定位到的位置显示点标记，默认：true
                  showCircle: false       //定位成功后用圆圈表示定位精度范围，默认：true
                });
                map.addControl(geolocation)
                geolocation.getCurrentPosition()
                AMap.event.addListener(geolocation, 'complete', function (data) { //返回定位信息
                  let lnglatXY = [data.position.lng, data.position.lat]
                  // 拖拽
                  AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {
                    let positionPicker = new PositionPicker({
                      mode: 'dragMap',
                      map: map
                    })
                    positionPicker.on('success', function (positionResult) {
                      //判断是否在配送范围
                      let positionArr = new Array()
                      positionResult.regeocode.pois.forEach((item) => {
                        positionArr.push({
                          latitude: item.location.lat,
                          longitude: item.location.lng
                        })
                      })
                      let params = {
                        marketId: '-1',
                        positionInfos: positionArr
                      }
                      api.isAddressCover(params).then((res) => {
                        if (res.code === 200 && res.data.length > 0) {
                          let pois = positionResult.regeocode.pois
                          for (let i = 0; i < res.data.length; i++) {
                            Vue.set(pois[i], 'isDisabled', res.data[i])
                          }
                          self.mapList = positionResult.regeocode.pois
                        }
                      })
                    })
                    positionPicker.on('fail', function (positionResult) {
                      self.mapList = []
                    })
                    positionPicker.start(lnglatXY)
                  })
                })
                AMap.event.addListener(geolocation, 'error', function (data) {  //返回定位出错信息
                  if (data.info == 'FAILED') {
                    // alert('获取你当前位置失败！')
                    AlertModule.show({
                      title: '提示',
                      content: '定位失败',
                      onShow() {
                        console.log('Module: I\'m showing')
                      },
                      onHide() {
                        console.log('Module: I\'m hiding now')
                      }
                    })
                  }
                })
              })
            }
          }
        })
      },
      // vux 设置或保存修改的地址
      ...mapMutations({
        setAddmodress: 'SET_ADDMODRESS',
      })
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import "../../common/css/mixin";

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
      top: 16rem;
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
      position: relative;
      .icon-location {
        position: absolute;
        right: 10px;
        bottom: 20px;
        background: url("http://webapi.amap.com/theme/v1.3/markers/b/loc_gray.png") 50% 50% no-repeat #fff;
        width: 35px;
        height: 35px;
        border: 1px solid #ccc;
        border-radius: 3px;
        z-index: 9999;
      }
    }
    #tip {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 200;
    }
    .header {
      height: 2.2rem;
      line-height: 2.2rem;
      display: flex;
      background-color: #FFFFFF;
      padding-right: .6rem;
      .border-1px(#e5e5e5);
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
    }
    .search-list {
      position: fixed;
      top: 2.7rem;
      left: .6rem;
      right: .6rem;
      bottom: 0;
      z-index: 999;
      background: #FFFFFF;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.40);
      border-radius: 4px;
      overflow-y: scroll;
    }
    .list {
      background-color: #ffffff;
      .item {
        height: 3rem;
        background: url("../../common/img/location/maps.png") no-repeat .6rem .6rem;
        background-size: .6rem .75rem;
        padding-left: 1.6rem;
        padding-right: .6rem;
        padding-top: .5rem;
        box-sizing: border-box;
        &.disabled {
          background-color: #f0f0f0;
        }
        .border-1px(#e5e5e5);
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
