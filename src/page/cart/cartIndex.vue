/*
 * @Author: Zeng Fanlu 
 * @Date: 2017-12-26 09:27:07 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint:  购物车模块首页
 */
<template>
  <div class="maximum">
    <div class="top">
      <div class="top-bar"> {{$route.name}} </div>
    </div>
    <div v-if="showCartContent">
    <div class="header">
      <div class="header-position">
        <i></i>
        <div class="bar">桥南街道</div>
      </div>
    </div>

    <!-- 购物车列表 -->
    <div class="shopping"> 
      <div class="shop-group-item">
        <div class="shop-name">
          <input type="checkbox" class="check">
          <h4> <i></i> <a href="#">祈福水果店</a> </h4>
          <div class="pic"> <a><img src="../../common/img/cart/jump_gray_ic.png" alt=""></a> </div>
        </div>
        <div>
          <swipeout>
            <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')">
              <div slot="right-menu">
                <swipeout-button @click.native="onButtonClick('delete')" style="background-color: #FF3C00" :width="60">删除</swipeout-button>
              </div>
              <div slot="content" class="demo-content vux-1px-t">
                <ul>
                  <li>
                    <div class="shop-info">
                      <div class="shop-info-img"> <img src="../../common/img/cart/select_selected_btn.png" alt=""> </div>
                      <div class="shop-info-text"> 
                        <h4>越南进口红心火龙果2个装大果单果约新鲜水果大果单果</h4>
                        <div class="shop-brief">  <span>约2斤/份</span> <span>不切</span>  </div> 
                        <div class="shop-price">
                          <div class="shop-pices">￥<b class="price">100.00</b> </div>
                          <div class="shop-arithmetic">
                            <a href="javascript:void(0);" class="minus"><img src="../../common/img/cart/reduce_ic.png" alt="" @click="addProduce('reduce')"></a> <span class="num">{{ count }}</span> <a href="javascript:void(0);" class="plus" @click="addProduce('add')"><img src="../../common/img/cart/plus_ic.png" alt=""></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </swipeout-item>
          </swipeout>

        </div>
      </div> 
    </div>
    

    
    <div class="payment-bar">
      <div class="price-free">满 <span>60</span> 元即免配送费</div>
      <div class="bar-price">
        <div class="all-checkbox">
          <input type="checkbox" class="all-check check">
          <span>全选</span>
        </div>
        <div class="shop-total">
          <strong> 总价：<i>￥588</i> </strong> 
        </div>
        <button class="yellow" @click="toSettlement">结算<i>&nbsp;(5)</i></button>
      </div>
    </div>
    </div>
    <menu-bar></menu-bar>
    <Alert></Alert>
    <!-- 购物车空白页 -->
    <div class="cartIndex-blank" v-if="showCartBlank">
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
import menuBar from '@/components/footer/menuBar'
import Alert from '@/components/alert/open_alert'
import { GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton, XButton, CheckIcon } from 'vux'
import topBar from '@/components/header/topBar'
export default {
  name: 'cartIndex',
  components: { menuBar, Alert, GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton, XButton, CheckIcon, topBar },
  props: {},
  data() {
    return {
      showCartContent: true, // 显示购物车内容
      showCartBlank: false, // 显示购物车空白页
      showLoad: false, // 购物车加载失败
      count: 0, // 购物车数量
    }
  },
  created() {},
  methods: {
    toSettlement() {
      this.$router.push('settlementPage')
    },
    onButtonClick (type) {
    alert('on button click ' + type)
    },
    handleEvents (type) {
      console.log('event: ', type)
    },
    // 购物车数量增加/ 减少
    addProduce(type) {
      if (type === 'add') {
        // this.count++
        const login = JSON.parse(JSON.parse(window.sessionStorage.getItem('userInfo')))
        console.log(login.cust_id)
      }
    }
  },
  filter: {},
  computed: {},
  watch: {}
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