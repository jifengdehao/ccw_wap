/*
 * @Author: ZengFanlu 
 * @Date: 2018-01-16 15:22:02 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 功能开发点 
 */

<template>
  <div class="payment-method" v-if="showModal">
    <div class="mask"></div>
    <div class="method-alert">
      <div class="total-amount">
        <a href="#" class="close" @click="showModal=false">
          <img src="../../../common/img/cart/cancel_ic.png" alt="">
        </a>
        <div class="amount">
          <span>支付金额</span>
          <i>¥187.5</i>
        </div>
      </div>
      <ul>
        <li>
          <!-- <img src="../../../common/img/cart/payment_WeChat.png" alt=""> -->
          <span>微信支付</span>
          <input type="radio" name="name" class="check">
        </li>
        <li>
          <!-- <img src="../../../common/img/cart/payment_Alipay.png" alt=""> -->
          <span>支付宝支付</span>
          <input type="radio" name="name" class="check">
        </li>
        <li class="endbor">
          <img src="../../../common/img/cart/payment_balance.png" alt="">
          <span>余额支付</span>
          <input type="radio" name="name" class="check">
        </li>
      </ul>
      <button>立即支付</button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showModal: false
    }
  },
  created() {
  },
  methods: {
  }
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

.endbor { border: 0 !important; }
input[type='radio'] { -webkit-appearance: none; outline: none; }
input.check {  background: url(../../../common/img/cart/select_default_btn.png) no-repeat center left; background-size: 20 / 20rem 20 / 20rem; position: absolute; top: 50%; right: 10 / 20rem; margin-top: -19 / 20rem; width: 20 / 20rem; height: 40 / 20rem; }
input.check:checked { background: url(../../../common/img/cart/select_selected_btn.png) no-repeat center left; background-size: 20 / 20rem 20 / 20rem; }
.payment-method { width: 100%; position: relative; }
.payment-method .mask { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.35); z-index: 55; -webkit-animation-name: fadeIn; -webkit-animation-duration: 2s; -webkit-animation-iteration-count: 1; -webkit-animation-delay: 0s;   }
.payment-method .method-alert { width: 100%; position: fixed; left: 0; bottom: 0; background-color: #ffffff; z-index: 66; -webkit-animation-name: fadeInOut; -webkit-animation-duration: 1s; -webkit-animation-iteration-count: 1; -webkit-animation-delay: 0s; }
.payment-method .method-alert .total-amount { height: 50 / 20rem; line-height: 50 / 20rem; background-color: #f5f5f5; padding-left: 12 / 20rem; text-align: center; }
.payment-method .method-alert .total-amount .close { width: 15.8 / 20rem; height: 15.8 / 20rem; float: left; }
.payment-method .method-alert .total-amount .close > img { width: 100%; height: 100%; }
.payment-method .method-alert .total-amount .amount { font-size: 14px; color: #666666; }
.payment-method .method-alert ul { padding: 0 12/ 20rem; }
.payment-method .method-alert .total-amount .amount > i { font-style: normal; font-size: 20px; color: #FF3C00; margin-left: 14 / 20rem; }
.payment-method .method-alert ul li { height: 50 / 20rem; line-height: 50 / 20rem; font-size: 14px; color: #333333; position: relative; border-bottom: 0.5 / 20rem solid #E5E5E5; }
.payment-method .method-alert ul li > img { width: 20 / 20rem; height: 20 / 20rem; display: inline-block; margin-right: 10 / 20rem; }
.payment-method .method-alert ul li > input { float: right; line-height: 50 / 20rem; }
.payment-method .method-alert > button { width: 100%; height: 50 / 20rem; background-color: #FFBD52; font-size: 18px; color: #ffffff; }
</style>