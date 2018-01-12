/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：位置
*/
<template>
  <transition name="slide">
    <div class="location">
      <div class="header vux-1px-b">
        <i class="back"></i>
        <div class="search-content">
          <input type="text" class="search" placeholder="请输入收货地址" v-model.trim="search" @keyup.enter="submit"/>
          <i class="clear" v-show="search" @click.stop="clearSearch"></i>
        </div>
      </div>
      <div class="map-tip">蓝色区域为当前市场配送范围</div>
      <div class="map" id="map">
        <!--<i class="icon-location"></i>-->
      </div>
      <div class="content">
        <scroll>
          <div>
            <ul class="list">
              <li class="item vux-1px-b">
                <div class="name">黄沙冷仓<span class="current">当前</span></div>
                <div class="dec">广州市番禺区南桥街道南堤东路836号</div>
              </li>
              <li class="item vux-1px-b">
                <div class="name">黄沙冷仓</div>
                <div class="dec">广州市番禺区南桥街道南堤东路836号</div>
              </li>
              <li class="item vux-1px-b">
                <div class="name">黄沙冷仓</div>
                <div class="dec">广州市番禺区南桥街道南堤东路836号</div>
              </li>
              <li class="item vux-1px-b">
                <div class="name">黄沙冷仓</div>
                <div class="dec">广州市番禺区南桥街道南堤东路836号</div>
              </li>
              <li class="item vux-1px-b">
                <div class="name">黄沙冷仓</div>
                <div class="dec">广州市番禺区南桥街道南堤东路836号</div>
              </li>
              <li class="item vux-1px-b">
                <div class="name">黄沙冷仓</div>
                <div class="dec">广州市番禺区南桥街道南堤东路836号</div>
              </li>
              <li class="item vux-1px-b">
                <div class="name">黄沙冷仓</div>
                <div class="dec">广州市番禺区南桥街道南堤东路836号</div>
              </li>
              <li class="item vux-1px-b">
                <div class="name">黄沙冷仓</div>
                <div class="dec">广州市番禺区南桥街道南堤东路836号</div>
              </li>
              <li class="item vux-1px-b">
                <div class="name">黄沙冷仓</div>
                <div class="dec">广州市番禺区南桥街道南堤东路836号</div>
              </li>
            </ul>
          </div>
        </scroll>
      </div>
      <div class="search-list" v-show="search">
        <ul class="list">
          <li class="item vux-1px-b">
            <div class="name">黄沙冷仓<span class="current">当前</span></div>
            <div class="dec">广州市番禺区南桥街道南堤东路836号</div>
          </li>
          <li class="item vux-1px-b">
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
import AMap from 'AMap' //在页面中引入高德地图

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
  mounted() {
    //      const map = new AMap.Map('map', {
    //        resizeEnable: true,
    //        zoom: 10,
    //        center: [116.480983, 40.0958]
    //      });
    //      console.log(map)
    var map, geolocation
    //加载地图，调用浏览器定位服务
    map = new AMap.Map('map', {
      resizeEnable: true,
      zoom: 13
    })
    map.plugin('AMap.Geolocation', function() {
      geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：无穷大
        maximumAge: 0, //定位结果缓存0毫秒，默认：0
        convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true, //显示定位按钮，默认：true
        buttonPosition: 'RB', //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      })
      map.addControl(geolocation)
      geolocation.getCurrentPosition()
      //        AMap.event.addListener(geolocation, 'complete', this.onComplete);//返回定位信息
      //        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    })

    //解析定位结果
    function onComplete(data) {
      console.log(data)
      debugger
      var str = ['定位成功']
      str.push('经度：' + data.position.getLng())
      str.push('纬度：' + data.position.getLat())
      if (data.accuracy) {
        str.push('精度：' + data.accuracy + ' 米')
      } //如为IP精确定位结果则没有精度信息
      str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'))
      document.getElementById('tip').innerHTML = str.join('<br>')
    }

    //解析定位错误信息
    function onError(data) {
      document.getElementById('tip').innerHTML = '定位失败'
      console.log(data)
    }
  },
  components: {
    scroll
  }
}
</script>
<style scoped lang="less" type="text/less">
@import '../../common/css/mixin';
@import '~vux/src/styles/1px.less';

.location {
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 2.2rem;
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
  .search {
    flex: 1;
    display: inline-block;
    height: 1.5rem;
    border: 0.5px #e5e5e5 solid;
    border-radius: 0.2rem;
    margin: 0.35rem 0;
    box-sizing: border-box;
    background: #ffffff url('../../common/img/location/search.png') no-repeat
      0.4rem center;
    background-size: 0.65rem 0.65rem;
    padding-left: 1.3rem;
    font-size: 0.6rem;
    color: #999999;
    padding-right: 2rem;
  }
  .map {
    height: 12.3rem;
    width: 100%;
    .icon-location {
      position: absolute;
      right: 0;
      bottom: 1rem;
      width: 2.4rem;
      height: 2.4rem;
      background: #ffffff url('../../common/img/location/map_location_ic.png')
        no-repeat center;
      background-size: 2.35rem 2.35rem;
      border-radius: 50%;
      border: 0.05rem solid #e5e5e5;
      z-index: 200;
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
    background-color: #ffffff;
    padding-right: 0.6rem;
    .back {
      display: inline-block;
      flex: 0 0 2.4rem;
      width: 2.4rem;
      background: url('../../common/img/common/back.png') no-repeat center;
      background-size: 50%;
    }
    .search-content {
      flex: 1;
      display: inline-block;
      height: 1.5rem;
      line-height: 1.5rem;
      border-radius: 4px;
      margin: 0.35rem 0;
      box-sizing: border-box;
      background: #f5f5f5 url('../../common/img/location/search.png') no-repeat
        0.4rem center;
      background-size: 0.65rem 0.65rem;
      padding-left: 1.3rem;
      padding-right: 1.5rem;
      font-size: 0;
      position: relative;
      & > input {
        height: 1.5rem;
        width: 100%;
        font-size: 0.6rem;
        color: #999999;
        background-color: #f5f5f5;
      }
    }
    .clear {
      display: inline-block;
      background: url('../../common/img/location/clean_btn.png') no-repeat
        center;
      width: 1.2rem;
      height: 1.2rem;
      background-size: 0.6rem 0.6rem;
      position: absolute;
      right: 0.15rem;
      top: 0.15rem;
    }
  }
  .search-list {
    position: fixed;
    top: 2.7rem;
    left: 0.6rem;
    right: 0.6rem;
    bottom: 0;
    z-index: 999;
    background: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    overflow-y: scroll;
  }
  .list {
    padding: 0 0.6rem;
    background-color: #ffffff;
    .item {
      height: 3rem;
      background: url('../../common/img/location/maps.png') no-repeat left
        0.6rem;
      background-size: 0.6rem 0.75rem;
      padding-left: 1rem;
      padding-top: 0.5rem;
      box-sizing: border-box;
      &:last-child {
        .border-none();
      }
      .name {
        font-size: 0.7rem;
        line-height: 1rem;
      }
      .current {
        font-size: 0.55rem;
        display: inline-block;
        width: 1.5rem;
        height: 0.8rem;
        background: #ffbd52;
        border-radius: 2px;
        color: #ffffff;
        line-height: 0.8rem;
        text-align: center;
        margin-left: 0.35rem;
      }
      .dec {
        font-size: 0.6rem;
        line-height: 0.85rem;
        color: #999999;
        margin-top: 0.2rem;
      }
    }
  }
}
</style>
