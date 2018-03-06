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
        <i class="back" @click="back"></i>
        <div class="search-content">
          <input type="text" class="search" placeholder="请输入收货地址" v-model.trim="search" @keyup.enter="submit"/>
          <i class="clear" v-show="search" @click.stop="clearSearch"></i>
        </div>
      </div>
      <div class="map-tip">蓝色区域为当前市场配送范围</div>
      <div class="map" id="map">
        <i class="icon-location" @click="getLo"></i>
      </div>
      <div class="content">
        <scroll>
          <div>
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
  import {mapGetters} from 'vuex'
  import AMap from 'AMap'   //在页面中引入高德地图
  import * as api from '@/api/http.js'

  export default {
    data() {
      return {
        search: '', // 搜索
        searchList: [], // 搜索条件
        mapList: [], // 地址列表
        deliverArea: [] // 配送范围
      }
    },
    computed: {
      ...mapGetters([
        'location',
      ])
    },
    created() {
      // this.getDeliverArea()
    },
    methods: {
      // 搜索
      submit() {
        console.log(this.search)
      },
      // 清除搜索字段
      clearSearch() {
        this.search = ''
      },
      // 返回
      back() {
        return this.$router.back()
      },
      // 定位
      getLo() {
        let map, geolocation;
        //加载地图，调用浏览器定位服务
        map = new AMap.Map('map', {
          resizeEnable: true
        });
        map.plugin('AMap.Geolocation', function () {
          geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'RB',
            showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true     //定位成功后将定位到的位置作为地图中心点，默认：true
          });
          map.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
          AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
        });

        //解析定位结果
        function onComplete(data) {
          console.log(data)
        }

        //解析定位错误信息
        function onError(data) {
          console.log(data)
        }
      },
      // 获取配送范围
      getDeliverArea() {
        api.getDeliverArea().then((res) => {
          if (res.code === 200) {
            const map = new AMap.Map('map', {
              resizeEnable: true,
              zoom: 18
            })
            const lnglatXY = [this.location.position.lng, this.location.position.lat]; //已知点坐标
            const marker = new AMap.Marker({  //加点
              map: map,
              position: lnglatXY,
              icon: new AMap.Icon({
                size: new AMap.Size(23, 23),  //图标大小
                image: 'http://webapi.amap.com/theme/v1.3/markers/b/loc.png',
                imageSize: new AMap.Size(23, 23)
              })
            })
            const polygonArr = new Array()//多边形覆盖物节点坐标数组
            for (let i = 0; i < res.data.length; i++) {
              let arj = JSON.parse(res.data[i])
              for (let j = 0; j < arj.length; j++) {
                // this.deliverArea.push(arj[j])
                polygonArr.push(arj[j])
              }
            }
            const polygon = new AMap.Polygon({
              path: polygonArr,//设置多边形边界路径
              strokeColor: "#4A90E2", //线颜色
              strokeOpacity: 0.2, //线透明度
              strokeWeight: 1,    //线宽
              fillColor: "#8DC2FF", //填充色
              fillOpacity: 0.35//填充透明度
            })
            polygon.setMap(map)
            map.setFitView()
          }
        })
      },
      // 位置
      setLo() {
        const map = new AMap.Map('map', {
          resizeEnable: true,
          zoom: 18
        })
        const lnglatXY = [this.location.position.lng, this.location.position.lat]; //已知点坐标
        const marker = new AMap.Marker({  //加点
          map: map,
          position: lnglatXY,
          icon: new AMap.Icon({
            size: new AMap.Size(23, 23),  //图标大小
            image: 'http://webapi.amap.com/theme/v1.3/markers/b/loc.png',
            imageSize: new AMap.Size(23, 23)
          })
        })
        const polygonArr = new Array()//多边形覆盖物节点坐标数组
        polygonArr.concat(this.deliverArea)
        console.log(polygonArr)
        const polygon = new AMap.Polygon({
          path: polygonArr,//设置多边形边界路径
          strokeColor: "#FF33FF", //线颜色
          strokeOpacity: 0.2, //线透明度
          strokeWeight: 3,    //线宽
          fillColor: "#1791fc", //填充色
          fillOpacity: 0.35//填充透明度
        })
        polygon.setMap(map)
        map.setFitView()
      }

    },
    mounted() {
      this.$nextTick(() => {
        this.getDeliverArea()
      })
//      const map = new AMap.Map('map', {
//        resizeEnable: true,
//        zoom: 18
//      })
//      const lnglatXY = [this.location.position.lng, this.location.position.lat]; //已知点坐标
//      const marker = new AMap.Marker({  //加点
//        map: map,
//        position: lnglatXY,
//        icon: new AMap.Icon({
//          size: new AMap.Size(23, 23),  //图标大小
//          image: 'http://webapi.amap.com/theme/v1.3/markers/b/loc.png',
//          imageSize: new AMap.Size(23, 23)
//        })
//      });
//      const polygonArr = new Array();//多边形覆盖物节点坐标数组
//      console.log(this.deliverArea)
//      polygonArr.concat(this.deliverArea)
//      const polygon = new AMap.Polygon({
//        path: polygonArr,//设置多边形边界路径
//        strokeColor: "#FF33FF", //线颜色
//        strokeOpacity: 0.2, //线透明度
//        strokeWeight: 3,    //线宽
//        fillColor: "#1791fc", //填充色
//        fillOpacity: 0.35//填充透明度
//      });
//      polygon.setMap(map);
//      map.setFitView();
    },
    components: {
      scroll
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
      padding: 0 .6rem;
      background-color: #ffffff;
      .item {
        height: 3rem;
        background: url("../../common/img/location/maps.png") no-repeat left .6rem;
        background-size: .6rem .75rem;
        padding-left: 1rem;
        padding-top: .5rem;
        box-sizing: border-box;
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
