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
          <li class="gray"> 
            <p class="address-name" style="position: relative;"> 
              <input type="radio" checked class="check" name="1"> 
              <span>菜城专送</span>
            </p> 
            <p class="phone"> 
              <span>{{market_name}}</span> 
              <span>{{mobileno}}</span> 
              <a href="#"> &gt;</a> 
            </p> 
            <p class="position"> {{market_addrs}} </p> 
          </li>
          <li style="border-bottom: 0 !important;"> 
            <p class="address-name" style="position: relative;"> 
              <input type="radio" class="check" name="1"> 
              <span>自提</span>
            </p> 
            <p class="phone"> 
              <!-- <span>{{Zt_market_info.selfPickAddress}}</span>  -->
              <span>{{ selfPickNumbero }}</span> 
              <span>{{ selfPickNumbert }}</span>
              <span>{{ selfPickNumberr }}</span>
            </p> 
            <p class="position"> {{selfPickAddress}} </p> 
          </li>
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
      <div v-for="(item,index) in goodsList" :key="index">
        <!-- <div style="border-bottom: 5px solid #F5F5F5;"></div> -->
        <div class="group-item-product">
          <div class="product-name">
            <i></i> <span>{{item.store_name}}</span>
          </div>
          <ul class="item-img" @click="onSeeProduct(item)">
            <li>
              <img v-for="(item,index) in item.items_list" :key="index" :src="item.items_image" alt="">
              <div class="number">共{{ item.items_list.length }}件 <span>&gt;</span></div>
            </li>
          </ul>
          <p class="product-price">商品金额:￥{{item.amount}}</p>
        </div>
        <div class="bar"></div>
      </div>
      <!-- 运费 -->
      <div class="fee-deduction">
        <ul>
          <li @click="onCoupon"> 
            <span>优惠券</span> 
            <i class="gray" style="font-size: 14px; display: inlne-block;" v-show="!show_couponNum">
              选择可用优惠券 <a href="#" style="margin-left: 7px;" class="gray">&gt;</a>
            </i>
            <i class="red" style="font-size: 14px; display: inlne-block;" v-show="show_couponNum">
               {{couponAmount}}<a href="#" style="margin-left: 7px;" class="gray">&gt;</a>
            </i>
          </li>
          <li> 
            <span>订单运费</span> <i>￥{{delivery_cost}}</i> 
          </li>
        </ul>
        <div class="total-amount"> 
          <span>合计：</span> <i class="red">¥{{allShopTotalPrice}}</i> 
        </div>
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
          <i class="red">¥{{allShopTotalPrice}}</i>
        </div>
        <button @click="openPayment">去支付</button>
      </div>
    </div>
    <!-- 支付弹框 -->
    <payment-method v-show="show_paymentMethod"></payment-method>
    <!-- 缺货发货弹框 -->
    <out-product v-show="show_outProduct"></out-product>
    <!-- 余额不可支付弹框 -->
    <alert-down v-show="show_alertDown"></alert-down>  
    <!-- 支付失败 -->
    <payment-fail v-show="show_paymentFail"></payment-fail>
   </div>
 </template>
 <script>
import * as http from '@/api/http';
import topBar from '@/components/header/topBar'
import paymentMethod from '@/page/cart/bottom_alert/payment_method'
import outProduct from '@/page/cart/bottom_alert/out_product'
import alertDown from '@/page/cart/bottom_alert/alert_down'
import paymentFail from '@/page/cart/bottom_alert/payment_fail'
import {mapState} from 'vuex'
export default {
  components: { topBar, paymentMethod, outProduct, alertDown, paymentFail },
  data () {
    return {
      cartObj:null,//结算接口后台返回数据对象,用于渲染整个界面
      market_name:null,
      mobileno:null,
      market_addrs:null,
      selfPickNumbero:null,
      selfPickNumbert:null,
      selfPickNumberr:null,
      selfPickAddress:null,
      goodsList:[],
      delivery_cost:0,//配送费
      allShopTotalPrice:0,//商品总金额
      couponAmount:0,//已经选择的优惠券金额
      show_outProduct:false,//缺货提示弹窗
      show_paymentMethod:false,//支付方式选择弹窗
      show_paymentFail:false,//支付失败的弹窗
      show_alertDown:false,//余额不可支付弹窗
    }
  },
  methods: {
    // 跳转支付成功页面
    openPayment() { 
      this.$router.push('paymentSuccess')
    },
    // 跳转我的优惠券页面
    onCoupon () { 
      this.$store.commit('change_recordNum',this.allShopTotalPrice);
      this.$router.push('cartMyCoupon');
    },
    // 点击其它商品
	  onOutProduct(){

    },
	  // 选择配送时间
    choiceSendTime(){

    },
    // 跳转我购买商品页面
    onSeeProduct(val){
      let arrs = [];
      let arr = val.items_list;
      for(let i=0;i<arr.length;i++){
          let attrId = arr[i].attrId;
          let sku = arr[i].sku;
          let items_image = arr[i].items_image;
          let product_name = arr[i].product_name;
          let unit = arr[i].unit;
          let attrValue = arr[i].attrValue;
          let current_price = arr[i].current_price;
          let store_name = val.store_name;
          let obj={
            attrId:attrId,sku:sku,items_image:items_image,product_name:product_name,
            unit:unit,attrValue:attrValue,current_price:current_price,store_name:store_name
          }
          arrs.push(obj)
      }
      this.$store.commit('getGoodsList',arrs)
      this.$router.push('cartMyProduct')
    },
    // 店铺金额数据转码
    getDataList(){
      let arr = JSON.parse(this.$store.state.goodsList).Shopping_stroe_info;
      let arrlist=[];
      for(let i=0;i<arr.length;i++){
        let num=0;
        let arrs = arr[i].items_list;
        for(let j=0;j<arrs.length;j++){
          num+=arrs[j].current_price*arrs[j].unit;
        }
        let store_name=arr[i].store_name;
        let status=arr[i].status;
        let store_id=arr[i].store_id;
        let items_list=arr[i].items_list;
        let obj={
          store_name:store_name,status:status,
          store_id:store_id,items_list:items_list,amount:num
        }
        arrlist.push(obj)
      }
      this.goodsList=arrlist
    }
  },
  computed: {
    show_couponNum:{
      get:function(){
        return this.$store.state.couponNum
      }
    }
  },
  mounted(){
    this.couponAmount = this.$store.state.couponNum;
    let obj = JSON.parse(this.$store.state.goodsList);
    this.getDataList();
    this.market_name=obj.Zt_market_info.market_name;
    this.mobileno=obj.Zt_market_info.mobileno;
    this.market_addrs=obj.Zt_market_info.market_addrs;
    this.selfPickNumbero=obj.Zt_market_info.selfPickNumber.substr(0,3);
    this.selfPickNumbert=obj.Zt_market_info.selfPickNumber.substr(3,4);
    this.selfPickNumberr=obj.Zt_market_info.selfPickNumber.substr(7,4);
    this.selfPickAddress=obj.Zt_market_info.selfPickAddress;
    this.delivery_cost = obj.delivery_cost;//商品配送费
    this.allShopTotalPrice = obj.allShopTotalPrice-this.$store.state.couponNum;//商品总价
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

