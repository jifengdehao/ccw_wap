/*
 * @Author: ZengFanlu 
 * @Date: 2018-01-18 16:47:45 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 支付失败弹框 
 */

<template>
  <div class="payment-fail" v-if="showPaymentFail">
    <div class="info">
      <img src="../../../common/img/cart/fail_ic.png" alt="">
      <p class="first">支付失败</p>
      <p>该订单商品含有异常商品</p>
      <p>（如下架、停售等商品）无法支付</p>
      <button>{{ buttonName }}</button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showPaymentFail: true,
      buttonName: '返回购物车'
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
    100% {
        opacity:1;
    }
}
.payment-fail { width:100%;height:100%;position: fixed;  top: 0; left: 0;display: flex; justify-content: center; align-items: center; background-color: rgba(0,0,0,0.35); z-index:100; -webkit-animation-name: fadeIn; -webkit-animation-duration: 1s; -webkit-animation-iteration-count: 1; -webkit-animation-delay: 0s; }
.info { background-color: #ffffff; z-index: 101; border-radius: 8px; text-align: center; padding: 12 / 20rem; }
.info > img { width: 52 / 20rem; height: 52 / 20rem; margin-top: 18 / 20rem; margin-bottom: 14 / 20rem; }
.info > p { font-size: 12px; color: #FF3C00; margin-bottom:  4 / 20rem;}
.info > p.first { font-size: 18px; color: #333333; margin-bottom: 13 / 20rem; }
.info > button { width: 246 / 20rem; height: 40 / 20rem; background-color: #FFBD52; font-size: 18px; color: #ffffff; border-radius: 4px; margin-top: 21 / 20rem;  }
.br { margin-bottom: 16 / 20rem !important; }
</style>