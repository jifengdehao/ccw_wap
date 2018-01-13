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
      <img src="../../../common/img/productIndex/3.jpg" alt="">
    </div>
  </div>
</template>
<script>
import { XHeader } from 'vux'
export default {
  components: { XHeader },
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
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
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 315/20rem;
      height: 421/20rem;
      background-color: #fff;
      transform: translate(-50%,-50%);
    }
  }
}
</style>