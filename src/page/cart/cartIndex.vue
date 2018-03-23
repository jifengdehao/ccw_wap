/*
 * @Author: Zeng Fanlu 
 * @Date: 2017-12-26 09:27:07 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint:  购物车模块首页
 */
<template>
  	<div class="maximum">
		<!-- 头部导航页 -->
    	<div class="top">
      	<div class="top-bar"> {{$route.name}} </div>
    	</div>
    	<!-- 购物车是否展示商品数据 -->
    	<div v-if="showCartContent">
			<!-- 定位地址 -->
      	<div class="header">
				<div class="header-position">
					<i></i>
					<div class="bar">桥南街道</div>
				</div>
			</div>
    		<!-- 购物车商品列表数据 -->
			<Scroller lock-x class="scrollGoodsList">
				<div class="shopping"> 
				<div class="shop-group-item" v-for="(item,index) in goodList" :key="index">
					<div class="shop-name">
						<input type="checkbox" @change="changeGoodsLIst(item)" class="check">
						<h4><i></i><a href="#">{{item.store_name}}</a></h4>
						<div class="pic"><a><img src="../../common/img/cart/jump_gray_ic.png" alt=""></a></div>
					</div>
					<div> 
						<ul>
							<li v-for="(arr,index) in item.items_list">
								<swipeout>
									<swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')">
									<div slot="right-menu">
										<swipeout-button @click.native="onButtonClick(arr)" style="background-color: #FF3C00" :width="60">删除</swipeout-button>
									</div>
									<div slot="content" class="demo-content vux-1px-t">
										<div class="shop-info">
											<div class="shop-info-img"> <img :src="arr.items_image" alt=""> </div>
											<div class="shop-info-text"> 
											<h4>{{arr.product_name}}</h4>
											<div class="shop-brief">  <span>{{arr.attrs_name}}</span></div> 
											<div class="shop-price">
												<div class="shop-pices">￥<b class="price">{{arr.current_price}}</b> </div>
												<div class="shop-arithmetic">
													<a href="javascript:void(0);" class="minus"><img src="../../common/img/cart/reduce_ic.png" alt="" @click="addProduce('reduce',arr)"></a> <span class="num">{{ arr.unit }}</span> <a href="javascript:void(0);" class="plus" @click="addProduce('add',arr)"><img src="../../common/img/cart/plus_ic.png" alt=""></a>
												</div>
											</div>
											</div>
										</div>
									</div>
									</swipeout-item>
								</swipeout>
							</li>
						</ul>
					</div>
				</div> 
				</div>
			</Scroller>
			<!-- 购物车购买结算布局 -->
			<div class="payment-bar">
				<div class="price-free">满 <span>60</span> 元即免配送费</div>
				<div class="bar-price">
					<div class="all-checkbox">
						<input type="checkbox" @change="allChangeGoodsList" class="all-check check">
						<span>全选</span>
					</div>
					<div class="shop-total">
						<strong> 总价：<i>￥{{amountTotal}}</i> </strong> 
					</div>
					<button class="yellow" @click="toSettlement">结算<i v-show="show_chooiceGoodsNum">&nbsp;{{(chooiceGoodsNum)}}</i></button>
				</div>
			</div>
    	</div>
    	<!-- 底部导航栏 -->
    	<menu-bar></menu-bar>
    	<!-- 购物车商品出错提示 -->
    	<Alert v-if="false"></Alert>
    	<!-- 购物车空白页 -->
		<div class="cartIndex-blank" v-if="!showCartContent">
			<div class="blank-pic">
			<img src="../../common/img/cart/no_commodity_ic.png" alt="">
			<p>还没有添加任何商品</p>
			</div>
		</div>
		<!-- 购物车加载失败 -->
		<div class="load-failure" v-if="showLoad">
			<div class="load-pic">
			<img src="../../common/img/cart/no_network.png" alt="">
			<p>网络不太顺畅哦！</p>
			<button>重新加载</button>
			</div>
		</div>
  </div>
</template>
<script>
import * as http from '@/api/http';
import menuBar from '@/components/footer/menuBar';
import Alert from '@/components/alert/open_alert';
import { GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton,ConfirmPlugin, XButton, CheckIcon,Scroller,LoadingPlugin } from 'vux';
import topBar from '@/components/header/topBar';
import { parse } from 'querystring';
// import { SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG } from 'constants';
// import { setTimeout } from 'timers';
// import { constants } from 'http2';
Vue.use(ConfirmPlugin);
Vue.use(LoadingPlugin);

export default {
	name: 'cartIndex',
	components: { menuBar, Alert, GroupTitle, Swipeout,Scroller, SwipeoutItem, SwipeoutButton, XButton, CheckIcon, topBar },
	props: {},
	data() {
		return {
			goodList:[],//购物车列表数据
			showCartContent: true, // 显示购物车内容
			showLoad: false,       // 购物车加载失败
			chooseGoodsList:[],		 //已选择好的商品数组数据
			amountTotal:0,				 //购物车总金额
		}
	},
	created(){

},
	methods: {
		//选择店铺商品勾选事件
		changeGoodsLIst(val){
			let ev = event||window.event;
			let arrs = val.items_list;
			if(ev.target.checked==true){
			// 选中
				this.chooseGoodsList=this.chooseGoodsList.concat(arrs);
			}else{
			// 不选中
				var arr = this.chooseGoodsList;
				for(let i=0;i<arr.length;i++){
					for(let j=0;j<arrs.length;j++){
						if(arrs[j].item_id==arr[i].item_id){
							this.chooseGoodsList.splice(i,1)
						}
					}
				}
			}
			this.getAmmountPrice();
		},
		allChangeGoodsList(val){
			if(val.target.checked==true){
			// 全选
				// this.chooseGoodsList=[];
			}else{

			}
		},
		// 购物车总价赋值
		getAmmountPrice(){
			let arr = this.chooseGoodsList;
			let num=0;
			for(let i=0;i<arr.length;i++){
				num+=arr[i].current_price*arr[i].unit;
			}
			this.amountTotal=num;
		},
		//结算接口调用
		payShopCartGoods(){
			let userid = this.$store.state.user.cust_id;
			let marketId = JSON.parse(window.sessionStorage.getItem('market')).marketId;
			let attrs=[];
			let arr = this.chooseGoodsList;
			for(let i=0;i<arr.length;i++){
				let attrId = arr[i].attrId;
				let attrName = arr[i].attrs_name;
				let skuid = arr[i].sku;
				let obj = {
					attrId:attrId,attrName:attrName,skuid:skuid,
				}
				attrs.push(obj)
			}
			let data_json={
				"attrs": attrs,
				"marketId":marketId,
				"userId": userid
			}
			http.payShopCartGoods(data_json).then(response=>{
				if(response.code==200){
					this.$store.commit('saveGoodsList',JSON.stringify(response.data));
				}
			})
		},
		// 购物车结算事件
		toSettlement(){
			if(this.amountTotal<=0){
				return
			}
			this.payShopCartGoods();
			this.$vux.loading.show({
				text: '结算中...'
			})
			setTimeout(() => {
				this.$vux.loading.hide();
				this.$router.push('settlementPage');
      }, 1000)
		},
		// 点击删除购物车商品事件
		onButtonClick (item) {
			let _this = this;
			let arr = this.goodList;
			let shop_id='';
			for(let i= 0;i<arr.length;i++){
				let arrs = arr[i].items_list;
				for(let j=0;j<arrs.length;j++){
					if(arrs[j]==item){
						shop_id=arr[i].store_id;
					}
				}
			}
			let goods={
			"sku":item.sku,
			"unit":item.unit,
			"shop_id":shop_id
			}
			let userid = this.$store.state.user.cust_id;
			let marketId = JSON.parse(window.sessionStorage.getItem('market')).marketId
			let obj = {
			"attrId": item.attrId,
			"attrName": item.product_name,
			"skuid": item.sku
			}
			let data_json ={
			"marketId":marketId,
			"userId":userid,
			"skuAttrs":[obj]
			}
			this.$vux.confirm.show({
				title: `是否删除商品`,
				onCancel () {
					// console.log('取消');
				},
				onConfirm () {
					_this.deleteShopCartGoods(data_json,goods);
				}
			})
		},
		// 滑块打开关闭事件
		handleEvents (type) {
			// console.log('滑块滑动事件')
			// console.log(type)
		},
		// 购物车数量增加/ 减少
		addProduce(type,val) {
			if (type === 'add') {
				val.unit++;
			}else{
				val.unit--
				if(val.unit<1){
					val.unit=1;
				}
			}
		},
		// 获取用户购物车商品列表
		getShopCartListData(){
			let userid = this.$store.state.user.cust_id;
			let marketId = JSON.parse(window.sessionStorage.getItem('market')).marketId
			http.getShopCartListData(marketId,userid).then(response=>{
				if(response.data.length>0){
					this.goodList = response.data;
					this.showCartContent=true;
				}else{
					this.goodList = [];
					this.showCartContent=false;
				}
			})
		},
		// 添加购物车事件
		addShopCart(obj){
			http.addShopCart(obj).then(response=>{
				if(response.code==200){
					this.getShopCartListData();
				}	
			})
		},
		// 删除购物车商品
		deleteShopCartGoods(arr,val){
			http.deleteShopCartGoods(arr).then(response=>{
			if(response.code==200){
					// this.updateShopCart(val);
					this.getShopCartListData();
			}
			})
		},
		// 更新购物车
		updateShopCart(val){
			let userid = this.$store.state.user.cust_id;
			let marketId = JSON.parse(window.sessionStorage.getItem('market')).marketId;
			let obj={
			"userId":userid,
			"marketId":marketId,
			"shopId":val.shop_id,
			"skuid":val.sku,
			"unit":val.unit
			}
			http.updateShopCart(obj).then(response=>{
			console.log('更新购物车');
			})
		}
	},
	filter: {},
	computed:{
		show_chooiceGoodsNum:{
			get:function(){
				return this.chooseGoodsList.length
			}
		},
		chooiceGoodsNum:{
			get:function(){
				return `(${this.chooseGoodsList.length})`
			}
		}
	},
	watch: {},
	mounted(){
		this.getShopCartListData();
	}
}
</script>
<style lang="less" scoped>
* {
  font-weight: 200;
}
input[type='checkbox'] { -webkit-appearance: none; outline: none; }
input.check {  background: url(../../common/img/cart/select_default_btn.png) no-repeat center left; background-size: 18 / 20rem 18 / 20rem; position: absolute; top: 50%; left: 10 / 20rem; margin-top: -19 / 20rem; width: 20 / 20rem; height: 40 / 20rem; }
input.check:checked { background: url(../../common/img/cart/select_selected_btn.png) no-repeat center left; background-size: 18 / 20rem 18 / 20rem; }
// 头部
.top {
  height: 44 / 20rem;
  .top-bar {
    width: 100%;
    height: 44px;
    line-height: 44px;
    background-color: #fff;
    text-align: center;
    font-size: 18px;
    color: #222;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 0;
      border-bottom: 1px solid #e5e5e5;
    }
  }
}
// 地址定位
.header {
  height: 33 / 20rem;
  .header-position {
    line-height: 33 / 20rem;
    color: #999999;
    font-size: 14px;
    display: flex; 
    justify-content: center; 
    align-items: center;
    background-color: #FAFAFA;
  }
  .header-position i {
    width: 12.8 / 20rem;
    height: 16.8 / 20rem;
    background: url(../../common/img/cart/shopping_location_ic.png) no-repeat center;
    background-size: 100% 100%;
    margin-right: 8.6 / 20rem;
  }
}
// 商品列表
.scrollGoodsList{

  .shopping {
    .shop-group-item {
      padding: 0 12 / 20rem;
    }
    .shop-name {
      position: relative;
      height: 40 / 20rem;
      line-height: 40 / 20rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .shop-name h4 {
      font-size: 14px;
      color: #333333;
    }
    .shop-name h4 > i {
      width: 16 / 20rem;
      height: 16 / 20rem;
      display: inline-block;
      vertical-align: middle;
      margin-left: 45px;
      background: url(../../common/img/cart/shop_ic.png) no-repeat center;
      background-size: 100% 100%;
      margin-right: 4px;
    }
    .shop-name > .pic {
      position: absolute;
      right: 0;
      top: -1px;
    }
    .shop-name > .pic > a  {
      width: 18px;
      height: 24px;
      display: inline-block;
    }
    .shop-name > .pic > a > img {
      width: 100%;
      height: 100%;
    }
    .shop-info {
      position: relative;
      border-top: 0.5px solid #E5E5E5;
      padding: 10px 0;
    }
    .shop-info-img {
      position: absolute;
      top: 10px;
      left: 35px;
      width: 70.5 / 20rem;
      height: 70.5 / 20rem;
      border: 1px solid red;
    }
    .shop-info-img > img {
      width: 100%;
      height: 100%;
    }
    .shop-info-text {
      margin-left: 120px;
      font-size: 12px;
      color: #333333;
    }
    .shop-info-text > h4 {
      line-height: 16 / 20rem;
      margin-bottom: 4px;
    }
    .shop-info-text .shop-brief {
      height: 17 / 20rem;
      color: #999999;
      margin-bottom: 6 / 20rem;
    }
    .shop-info-text .shop-brief > span:first-child {
      margin-right: 12 / 20rem;
    }
    .shop-info-text .shop-price {
      height: 22 / 20rem;
      line-height: 22 / 20rem;
    }
    .shop-info-text .shop-price > .shop-pices {
      font-size: 16px;
      color: #FF3C00;
    }
    .shop-info-text .shop-price > .shop-arithmetic {
      position: absolute;
      right: 0;
      bottom: 10 / 20rem;
      width: 80 / 20rem;
      border: 0.5 / 20rem solid #EEEEEE;
      border-radius: 2px;
    }
    .shop-info-text .shop-price > .shop-arithmetic > a {
      width: 20 / 20rem;
      height: 22 / 20rem;
      display: inline-block;
    }
    .shop-info-text .shop-price > .shop-arithmetic > a > img {
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
    .shop-info-text .shop-price > .shop-arithmetic > .num {
      width: 32 / 20rem;
      display: inline-block;
      text-align: center;
    }
    .shop-info-text .shop-price > .shop-arithmetic > a.minus {
      border-right: 0.5 / 20rem solid #EEEEEE;
    }
    .shop-info-text .shop-price > .shop-arithmetic > a.plus {
      border-left: 0.5 / 20rem solid #EEEEEE;
    }
  }
}
// 底部金额
.payment-bar {
  position: fixed;
  left: 0;
  bottom: 50 / 20rem;
  width: 100%;
  z-index: 3;
  .price-free {
    height: 30 / 20rem;
    line-height: 30 / 20rem;
    font-size: 12px;
    color: #FFFFFF;
    background-color: #6B4F4F;
    opacity: 0.74;
    filter: alpha(opacity=50);
    text-align: center;
  }
  .price-free > span {
     color: #F0CC27;
     font-size: 20px;
  }
  .bar-price {
    height: 50 / 20rem;
    line-height: 50 / 20rem;
    background-color: #FFFFFF;
    position: relative;
  }
  .all-checkbox > span {
    margin-left: 33 / 20rem;
    font-size: 12px;
    color: #999999;
  }
  .shop-total {
    position: absolute;
    right: 130 / 20rem;
    top: 0;
    font-size: 16px;
  }
  .shop-total > strong > i {
    font-style: normal;
    font-size: 18px;
    color: #FF3C00;
  }
  .bar-price > button {
    position: absolute;
    right: 0;
    top: 0;
    width: 110 / 20rem;
    height: 50 / 20rem;
    font-size: 18px;
    color: #ffffff;
    background-color: #bbbbbb;
  }
  .bar-price > button > i {
    font-style: normal;
    font-size: 12px;
  }
  .yellow {
    background-color: #FFBD52 !important;
  }
}

// 购物车空白页
.cartIndex-blank { width: 100%; height: 100%; background-color: #ffffff; position: fixed; top: 0; left: 0; display: flex; justify-content: center; align-items: center; }
.blank-pic > img{ width: 100 / 20rem; height: 100 / 20rem; margin-bottom: 28 / 20rem; }
.blank-pic > p { font-size: 12px; color: #999999; }
// 加载购物车失败
.load-failure { width: 100%; height: 100%; background-color: #ffffff; position: fixed; top: 0; left: 0; display: flex; justify-content: center; align-items: center; }
.load-pic > img { width: 100 / 20rem; height: 100 / 20rem; margin-bottom: 14 / 20rem; margin-left: 26 / 20rem; }
.load-pic > p { font-size: 12px; color: #999999; margin-bottom: 24 / 20rem; margin-left: 26 / 20rem; }
.load-pic > button { width: 140 / 20rem; height: 44 / 20rem; background-color: #FFBD52; border-radius: 4px; font-size: 18px; color: #ffffff; }
</style>