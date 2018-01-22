/*
 * @Author: ZengFanlu 
 * @Date: 2018-01-18 17:27:52 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 支付成功页面 
 */

<template>
  <div>
    <div class="header">
      <top-bar></top-bar>
    </div>
    <div class="content">
      <img src="../../common/img/cart/payment_Success.png" alt="">
      <p>支付金额：<span class="red">￥&nbsp;60.00</span></p>
      <p>&nbsp;支付方式：微信支付</p>
    </div>
    <div class="button">
      <button>查看订单</button>
      <button>继续购物</button>
    </div>
    <div class="bar"></div>
    <div class="footer"> 注意：菜城平台及销售商不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作 </div>
  </div>
</template>
<script>
import topBar from '@/components/header/topBar'
export default {
  components: { topBar },
  data () {
    return {
    }
  },
  // created: {},
  // mounted: {},
  methods: {}
}
</script>
<style lang="less" scoped>
.red { color: #FF3C00; }
.header { height: 44 / 20rem; }
.content { padding: 48 / 20rem  12 / 20rem 32 / 20rem; text-align: center;}
.content > img { width: 47 / 20rem; height: 54 / 20rem; margin-bottom: 26 / 20rem; }
.content > P { font-size: 18px; color: #333333; margin-bottom: 4px; }
.content > P:last-child { margin-bottom: 28px; }
.button > button { width: 170 / 20rem; height: 40 / 20rem; line-height: 40 / 20rem; background-color: #ffffff; border: 0.5px solid rgba(229,229,229,1); border-radius: 4px; margin-left: 12px; font-size: 16px; color: #333333; margin-bottom: 32 / 20rem; }
.button > button:last-child { background-color: #FFBD52; color: #ffffff; border: 0; }
.bar { height: 9 / 20rem; background-color: rgba(245,245,245,1); margin-bottom: 10 / 20rem; }
.footer { padding: 0 12 / 20rem; font-size: 12px; color: #999999; line-height: 1.6; }
</style>