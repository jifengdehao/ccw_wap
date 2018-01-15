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
         <ul>
           <li> <p class="address-name" style="position: relative;"> <input type="radio" checked class="check" name="1"> <span>菜城专送</span></p> <p class="phone"> <span>菜城</span> <span>137 8767 3210</span> <a href="#"> &gt; </a> </p> <p class="position"> 广州市番禺区桥南街南堤东路836号自编A座206 </p> </li>
           <li style="border-bottom: 0 !important;"> <p class="address-name" style="position: relative;"> <input type="radio" class="check" name="1"> <span>自提</span></p> <p class="phone"> <span>菜城</span> <span>137 8767 3210</span> </p> <p class="position"> 广州市番禺区桥南街南堤东路836号自编A座206 </p> </li>
         </ul>
      </div>
      <div class="barCo"></div>
      <!-- 缺货配送 -->
      <div class="group-item-lack">
        <ul>
          <li style="border-bottom: 0.5px solid #E5E5E5;">
            <p class="lacking">商品缺货时您需要 <a href="#">其他商品继续配送(部分商品退款) <strong>&gt;</strong> </a> </p>
          </li>
          <li>
            <p class="distributionTime">选择配送时间 <a href="#">两小时达 <strong>&gt;</strong> </a>  </p>
          </li>
        </ul>
      </div>
      <!-- 购买商品 -->
      <div style="border-bottom: 10px solid #F5F5F5;"></div>
      <div class="group-item-product">
        <div class="product-name">
          <i></i> <span>市桥水果店</span>
        </div>
        <ul class="item-img">
          <li>
            <img src="../../common/img/cart/select_selected_btn.png" alt="">
            <img src="../../common/img/cart/select_selected_btn.png" alt="">
            <img src="../../common/img/cart/select_selected_btn.png" alt="">
            <img src="../../common/img/cart/select_selected_btn.png" alt="">
            <div class="number">共{{ num }}件 <span>  &gt;</span></div>
          </li>
        </ul>
        <p class="product-price"> 商品金额:￥46.5 </p>
      </div>
      <div class="bar"></div>
      <!-- 运费 -->
      <div class="fee-deduction">
        <ul>
          <li> <span>优惠券</span> <i class="red">-¥2</i> </li>
          <li> <span>订单运费</span> <i>￥2</i> </li>
        </ul>
        <div class="total-amount"> <span>合计：</span> <i>¥480</i> </div>
      </div>
    </div>
   </div>
 </template>
 <script>
import topBar from '@/components/header/topBar'
export default {
  components: { topBar },
  data () {
    return {
      num: 8
    }
  }
}
 </script>
 <style lang="less" scoped>
* { font-family: PingFangSC-Regular; }
.red { color: #FF3C00; }
input[type='radio'] { -webkit-appearance: none; outline: none; }
input.check {  background: url(../../common/img/cart/select_default_btn.png) no-repeat center left; background-size: 20 / 20rem 20 / 20rem; position: absolute; top: 50%; left: 10 / 20rem; margin-top: -19 / 20rem; width: 20 / 20rem; height: 40 / 20rem; }
input.check:checked { background: url(../../common/img/cart/select_selected_btn.png) no-repeat center left; background-size: 20 / 20rem 20 / 20rem; }
.settlementPage { position: relative; height: 100%; }
.settlementInfo { margin-top: 10 / 20rem; background-color: #ffffff; }
.bar { height: 10 / 20rem; background-color: #F5F5F5; clear: both; }
.group-item-address { padding: 0  10 / 20rem; font-size: 16px; color: #333333; }
.group-item-address ul li { border-bottom: 0.5 / 20rem solid #E5E5E5; padding: 10 / 20rem 0; }
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
.group-item-product ul.item-img li .number { width: 50 / 20rem; line-height: 60 / 20rem; font-size: 12px; color: #666666; display: inline-block; text-align: center; }
.group-item-product ul.item-img li .number span { width: 5 / 20rem; height: 9 / 20rem; color: #BBBBBB; margin-left: 7 / 20rem; }
.group-item-product .product-price { height: 44 / 20rem; line-height: 44 / 20rem; color: #333333; font-size: 12px; float: right; margin-right: 12 / 20rem; }
.fee-deduction { padding: 0 12 / 20rem; }
.fee-deduction ul li { height: 40 / 20rem; line-height: 40 / 20rem; font-size: 12px; color: #333333; border-bottom: 0.5 / 20rem solid #E5E5E5; }
.fee-deduction ul li > i { float: right; font-style: normal; }
.fee-deduction .total-amount { height: 58 / 20rem; line-height: 58 / 20rem; float: right; }
 </style>
