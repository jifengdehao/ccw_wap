/*
 * @Author: ZengFanlu 
 * @Date: 2018-01-10 16:59:24 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 结算页面 
 */

 <template>
   <div class="settlementPage">
    <div class="header">
      <top-bar></top-bar>
    </div>
    <div class="bar"></div>
    <div class="settlementInfo">
      <!-- 配送地址start -->
      <div class="group-item-address">
        <p class="no-address" v-if="showNoAddress"><span>设置收货地址</span><a href="#"> &gt; </a></p>
         <ul>
           <li class="gray"> <p class="address-name" style="position: relative;"> <input type="radio" checked class="check" name="1"> <span>菜城专送</span></p> <p class="phone"> <span>菜城</span> <span>137 8767 3210</span> <a href="#"> &gt; </a> </p> <p class="position"> 广州市番禺区桥南街南堤东路836号自编A座206 </p> </li>
           <li style="border-bottom: 0 !important;"> <p class="address-name" style="position: relative;"> <input type="radio" class="check" name="1"> <span>自提</span></p> <p class="phone"> <span>菜城</span> <span>137 8767 3210</span> </p> <p class="position"> 广州市番禺区桥南街南堤东路836号自编A座206 </p> </li>
         </ul>
      </div>
      <div class="barCo"></div>
      <!-- 缺货配送 -->
      <div class="group-item-lack">
        <ul>
          <li style="border-bottom: 0.5px solid #E5E5E5;">
            <p class="lacking">商品缺货时您需要 <a href="javascript:void(0)" @click="onOutProduct">其他商品继续配送(部分商品退款) </a> </p>
          </li>
          <li>
            <p class="distributionTime">选择配送时间 <a href="javascript:void(0)" @click="choiceSendTime">两小时达 <strong>&gt;</strong> </a>  </p>
          </li>
        </ul>
      </div>
      <!-- 购买商品 -->
      <div style="border-bottom: 10px solid #F5F5F5;"></div>
      <div class="group-item-product">
        <div class="product-name">
          <i></i> <span>市桥水果店</span>
        </div>
        <ul class="item-img" @click="onSeeProduct">
          <li>
            <img src="../../common/img/cart/select_selected_btn.png" alt="">
            <img src="../../common/img/cart/select_selected_btn.png" alt="">
            <img src="../../common/img/cart/select_selected_btn.png" alt="">
            <img src="../../common/img/cart/select_selected_btn.png" alt="">
            <div class="number">共{{ num }}件 <span>&gt;</span></div>
          </li>
        </ul>
        <p class="product-price"> 商品金额:￥46.5 </p>
      </div>
      <div class="bar"></div>
      <!-- 运费 -->
      <div class="fee-deduction">
        <ul>
          <li> <span>优惠券</span> 
            <!-- <i class="red">￥2</i> -->
            <i class="gray" @click="onCoupon" style="font-size: 14px; display: inlne-block;">选择可用优惠券 <a href="#" style="margin-left: 7px;" class="gray">&gt;</a></i>
          </li>
          <li> <span>订单运费</span> <i>￥2</i> </li>
        </ul>
        <div class="total-amount"> <span>合计：</span> <i class="red">¥480</i> </div>
      </div>
      <div class="bar"></div>
      <!-- 备注信息 -->
      <div class="text">
        <span>备注：</span>
        <textarea placeholder="订单备注（30字以内）" maxlength="30"></textarea>
      </div>
      <div class="bar"></div>
      <!-- 去支付 -->
      <div class="payment">
        <div class="payment-amount">
          <span> 付款：</span>
          <i class="red">¥480</i>
        </div>
        <button @click="openPayment">去支付</button>
      </div>
    </div>
    <!-- 支付弹框 -->
    <payment-method></payment-method>
    <!-- 缺货发货弹框 -->
    <out-product></out-product>
    <!-- 余额不可支付弹框 -->
    <alert-down></alert-down>  
    <!-- 支付失败 -->
    <payment-fail></payment-fail>
   </div>
 </template>
 <script>
import topBar from '@/components/header/topBar'
import paymentMethod from '@/page/cart/bottom_alert/payment_method'
import outProduct from '@/page/cart/bottom_alert/out_product'
import alertDown from '@/page/cart/bottom_alert/alert_down'
import paymentFail from '@/page/cart/bottom_alert/payment_fail'
import * as http from '@/api/http'
import {mapState} from 'vuex'
export default {
  components: { topBar, paymentMethod, outProduct, alertDown, paymentFail },
  data () {
    return {
      num: 8,
      showNoAddress: false
    }
  },
  methods: {
    openPayment() { // 跳转支付成功页面
      this.$router.push('paymentSuccess')
    },
    onCoupon () { // 跳转我的优惠券页面
      this.$router.push('cartMyCoupon')
    },
	 onOutProduct() {},
	//  选择配送时间
    choiceSendTime(){
		 	this.getShopStoreNum();
	 },
	//  获取用户购物车数量
	 getShopStoreNum(){
    let userid = JSON.parse(this.$store.state.loginInfo).cust_id; 
    let marketId = this.$store.state.market.marketId; 
    // console.log(this.$store.state.market);

    // return
		// http.getShopStoreNum(userid,marketId).then(response=>{
		// 	console.log(response);
		// })
	 },
    onSeeProduct() { // 跳转我购买商品页面
      this.$router.push('cartMyProduct')
    }
  },
  computed: {
    showModal() {
      return this.$store.contPaymentAlertShow
    }
  }
}
 </script>
 <style lang="less" scoped>
	* { font-family: PingFangSC-Regular; }
	.red { color: #FF3C00; }
	.gray { color: #BBBBBB !important; }
	input[type='radio'] { -webkit-appearance: none; outline: none; }
	input.check {  background: url(../../common/img/cart/select_default_btn.png) no-repeat center left; background-size: 20 / 20rem 20 / 20rem; position: absolute; top: 50%; left: 10 / 20rem; margin-top: -19 / 20rem; width: 20 / 20rem; height: 40 / 20rem; }
	input.check:checked { background: url(../../common/img/cart/select_selected_btn.png) no-repeat center left; background-size: 20 / 20rem 20 / 20rem; }
	.settlementPage { position: relative; height: 100%; }
	.header { height: 44 / 20rem; }
	.bar { height: 10 / 20rem; background-color: #F5F5F5; clear: both; }
	.group-item-address { padding: 0  10 / 20rem; font-size: 16px; color: #333333; }
	.group-item-address .no-address { height: 50 / 20rem; line-height: 50 / 20rem; font-size: 16px; color: #333333; padding-left: 38 / 20rem; border-bottom: 0.5 / 20rem solid #E5E5E5; }
	.group-item-address .no-address a { float: right; color: #BBBBBB; }
	.group-item-address ul li { border-bottom: 0.5 / 20rem solid #E5E5E5; padding: 10 / 20rem 0;}
	.group-item-address ul li > p { margin-bottom: 4px; }
	.group-item-address ul li > p.address-name > span { margin-left: 38 / 20rem; }
	.group-item-address ul li > p.phone { font-size: 14px; margin-left: 38 / 20rem; }
	.group-item-address ul li > p.phone a { float: right; color: #BBBBBB; }
	.group-item-address ul li > p.position { font-size: 12px; margin-left: 38 / 20rem; }
	.group-item-address ul li > p.position:before { content: ''; width: 12 / 20rem; height: 15 / 20rem; display: inline-block; vertical-align: middle; background: url(../../common/img/cart/maps_ic.png) no-repeat center; background-size: 100% 100%; }
	.barCo { height: 2 / 20rem; border-bottom: 10px solid #F5F5F5; background: url(../../common/img/cart/address_strip.png) no-repeat center; background-size: 100% 100%; }
	.group-item-lack { padding: 0 10 / 20rem; font-size: 12px; color: #333333; }
	.group-item-lack ul li { height: 38 / 20rem; line-height: 38 / 20rem; }
	.group-item-lack ul li > p:before { content: ''; width: 12 / 20rem; height: 12 / 20rem; display: inline-block; margin-right: 4 / 20rem; vertical-align: middle; }
	.group-item-lack ul li > p.lacking:before { background: url(../../common/img/cart/os_ic.png)no-repeat center; background-size: 100% 100%;}
	.group-item-lack ul li > p.distributionTime:before { background: url(../../common/img/cart/Shopping_time.png)no-repeat center; background-size: 100% 100%;}
	.group-item-lack ul li > p > a { float: right; color: #FF3C00; }
	.group-item-lack ul li > p > a > strong { color: #BBBBBB; }
	.group-item-product { height: 100%; background-color: #ffffff; }
	.group-item-product .product-name { height: 44 / 20rem; line-height: 44 / 20rem; background-color: #FAFAFA; font-size: 14px; color: #333333; display: flex; justify-content: flex-start; align-items: center; -webkit-box-sizing: border-box; box-sizing: border-box; padding-left: 10 / 20rem;  }
	.group-item-product .product-name > i { width: 16 / 20rem; height: 16 / 20rem; background: url(../../common/img/cart/shop_ic.png) no-repeat center; background-size: 100% 100%; margin-right: 4px; }
	.group-item-product ul.item-img { padding: 8 / 20rem 12 / 20rem; border: 0.5 / 20rem solid #E5E5E5;; box-sizing: border-box; -webkit-box-sizing: border-box; border-left: 0; border-right: 0; }
	.group-item-product ul.item-img li { width: 100%; height: 60 / 20rem; display: inline-block; }
	.group-item-product ul.item-img li > img { width: 60 / 20rem; height: 100%; margin-right: 8 / 20rem; }
	.group-item-product ul.item-img li .number { float: right; width: 50 / 20rem; line-height: 60 / 20rem; font-size: 12px; color: #666666;text-align: center; }
	.group-item-product ul.item-img li .number span { width: 5 / 20rem; height: 9 / 20rem; color: #BBBBBB; margin-left: 7 / 20rem; }
	.group-item-product .product-price { height: 44 / 20rem; line-height: 44 / 20rem; color: #333333; font-size: 12px; float: right; margin-right: 12 / 20rem; }
	.fee-deduction { padding: 0 12 / 20rem; }
	.fee-deduction ul li { height: 40 / 20rem; line-height: 40 / 20rem; font-size: 12px; color: #333333; border-bottom: 0.5 / 20rem solid #E5E5E5; }
	.fee-deduction ul li > i { float: right; font-style: normal; }
	.fee-deduction .total-amount { height: 58 / 20rem; line-height: 58 / 20rem; float: right; font-size: 16px; }
	.fee-deduction .total-amount i { font-style: normal; }
	.text { height: 44 / 20rem; line-height: 44 / 20rem; padding: 0 12 / 20rem; display: flex; justify-content: flex-start; align-items: center; }
	.text span { font-size: 14px; color: #333333; }
	.text textarea { width: 88%; height: 44 / 20rem; line-height: 44 / 20rem; white-space: nowrap; }
	.payment { width: 100%; height: 50 / 20rem; font-size: 16px; color: #222222; padding-left: 12 / 20rem; -webkit-box-sizing: border-box; box-sizing: border-box; }
	.payment .payment-amount { display: inline-block; line-height: 50 / 20rem; }
	.payment .payment-amount i { font-style: normal; font-weight: 400;}
	.payment > button { float: right; width: 110 / 20rem; height: 50 / 20rem; background-color: #FFBD52; font-size: 18px; color: #ffffff; }
</style>

