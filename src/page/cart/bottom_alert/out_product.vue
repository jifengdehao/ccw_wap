/*
 * @Author: ZengFanlu 
 * @Date: 2018-01-18 11:55:57 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 功能开发点 
 */
<template>
  <div class="out-product" v-if="showOutProduct">
    <div class="mask"></div>
    <div class="item-info">
      <p> <span>所购商品如遇缺货，您需要：</span> <img src="../../../common/img/cart/cancel_ic.png" alt=""></p>
      <p>其他商品继续配送(部分商品退款)</p>
      <p>取消订单</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showOutProduct: false
    }
  },
  // created: {},
  // mounted: {},
  methods: {}
}
</script>
<style lang="less" scoped>
@-webkit-keyframes fadeIn {
    0% {
        opacity:0;
    }
    50% {
        opacity: 0.8;    
    }
    75% {
        opacity:1;
    }
}
@-webkit-keyframes fadeInOut {
  0% {
    bottom: -251px;
  }
  100% {
    bottom: 0;
  }
}

.out-product { width: 100%; }
.mask { position: fixed; top: 0; left: 0; bottom: 0; right: 0; background-color: rgba(0,0,0,0.35); z-index: 33; -webkit-animation-name: fadeIn; -webkit-animation-duration: 2s; -webkit-animation-iteration-count: 1; -webkit-animation-delay: 0s; }
.item-info { width: 100%; position: fixed; left: 0; bottom: 0; background-color: #ffffff; z-index: 34; font-size: 18px; color: #666666; text-align: center; -webkit-animation-name: fadeInOut; -webkit-animation-duration: 1s; -webkit-animation-iteration-count: 1; -webkit-animation-delay: 0s; }
.item-info p { padding: 0 12 / 20rem; height: 44 / 20rem; line-height: 44 / 20rem; }
.item-info p:first-child { height: 30 / 20rem; line-height: 30 / 20rem; background-color: #FFF8ED; font-size: 12px; }
.item-info p > img { width: 15.8 / 20rem; height: 15.8 / 20rem; position: absolute; top: 7 / 20rem; right: 12 / 20rem; }
.item-info > p:nth-child(2) { color: #FF3C00; border-bottom: 0.5 / 20rem solid #E5E5E5; }
.item-info > p:last-child { color: #BBBBBB; }
</style>