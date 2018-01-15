/*
 * @Author: Zeng Fanlu 
 * @Date: 2017-12-26 09:27:07 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint:  购物车模块首页
 */
<template>
  <div class="maximum">
    <div class="header">
      <div class="header-position">
        <div class="bar">桥南街道</div>
      </div>
    </div>

    <!-- 购物车列表 -->
    <div class="shopping"> 
      <div class="shop-group-item">
        <div class="shop-name">
          <input type="checkbox" class="check">
          <h4> <a href="#">祈福水果店</a> </h4>
          <div class="goback"> <a href="#"><img src="../../common/img/cart/jump_gray_ic.png" alt=""></a>  </div>
        </div>
        <div>
          <swipeout>
            <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
              <div slot="right-menu">
                <swipeout-button @click.native="onButtonClick('delete')" style="background-colo: #FF3C00;" type="warn">删除</swipeout-button>
              </div>
              <div slot="content" class="demo-content vux-1px-t" style="barckground-color: red">
                <ul>
                  <li class="pr">
                    <div class="shop-info">
                      <div class="shop-info-img"> <a href="#"> <img src="../../common/img/cart/select_selected_btn.png" alt=""> </a> </div>
                      <div class="shop-info-text"> 
                        <h4>越南进口红心火龙果2个装大果单果约新鲜水果大果单果</h4>
                        <div class="shop-brief">  <span>约2斤/份</span> <span>不切</span>  </div> 
                        <div class="shop-price">
                          <div class="shop-pices">￥<b class="price">100.00</b> </div>
                          <div class="shop-arithmetic">
                            <a href="javascript:void(0);" class="minus"><img src="../../common/img/cart/reduce_ic.png" alt=""></a> <span class="num">1</span> <a href="javascript:void(0);" class="plus"><img src="../../common/img/cart/plus_ic.png" alt=""></a>
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
      <div class="price-free">订单总额还差60元，即免配送费</div>
      <div class="bar-price">
        <div class="all-checkbox">
          <input type="checkbox" class="all-check check">全选
        </div>
        <div class="shop-total">
          <strong> 总价：<i>￥100</i> </strong> 
        </div>
        <button class="settlement disabled" @click="toSettlement">结算<i>(5)</i></button>
      </div>
    </div>
    <menu-bar></menu-bar>
    <Alert></Alert> 
  </div>

</template>
<script>
import menuBar from '@/components/footer/menuBar'
import Alert from '@/components/alert/open_alert'
import { GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton, XButton, CheckIcon } from 'vux'
export default {
  name: 'cartIndex',
  components: { menuBar, Alert, GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton, XButton, CheckIcon },
  props: {},
  data() {
    return {
      disabled: false,
      checkProduct: false
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
    }
  },
  filter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" scoped>
* {
  font-family: PingFangSC-Regular;
  font-weight: 400;
}

.pr {
  position: relative;
}
input[type='checkbox'] {
  -webkit-appearance: none;
  outline: none;
}
input.check {
  background: url(../../common/img/cart/select_default_btn.png) no-repeat center
    left;
  background-size: 20 / 20rem 20 / 20rem;
  position: absolute;
  top: 50%;
  left: 10 / 20rem;
  margin-top: -19 / 20rem;
  width: 20 / 20rem;
  height: 40 / 20rem;
}
input.check:checked {
  background: url(../../common/img/cart/select_selected_btn.png) no-repeat
    center left;
  background-size: 20 / 20rem 20 / 20rem;
}
.maximum {
  height: 100%;
  background-color: #fafafa;
  .header {
    padding: 10 / 20rem 0;
    .header-position {
      width: 122 / 20rem;
      height: 22 / 20rem;
      line-height: 22 / 20rem;
      margin: 0 auto;
      text-align: center;
      background-color: #ffbd52;
      border: 4 / 20rem solid #ffda9e;
      border-radius: 15 / 20rem;
      color: #ffffff;
      font-size: 12px;
    }
    div.bar:before {
      content: '';
      width: 10 / 20rem;
      height: 12 / 20rem;
      display: inline-block;
      vertical-align: middle;
      margin-right: 8 / 20rem;
      background: url('../../common/img/cart/location_ic.png') no-repeat center;
      background-size: 100% 100%;
    }
  }
  .shopping {
    clear: both;
    overflow: hidden;
    height: auto;
    margin-bottom: 10 / 20rem;
    padding: 0 12 / 20rem;
    .shop-group-item {
      border: 0.5 / 20rem solid #e5e5e5;
    }
    .shop-name {
      height: 40 / 20rem;
      line-height: 40 / 20rem;
      padding: 0 10 / 20rem;
      position: relative;
    }
    // .check {
    //   background: url(../../common/img/cart/select_default_btn.png) no-repeat center left;
    //   background-size: 20 / 20rem 20 / 20rem;
    //   position: absolute;
    //   top: 50%;
    //   left: 10 / 20rem;
    //   margin-top: -19 / 20rem;
    //   width: 20 / 20rem;
    //   height: 40 / 20rem;
    // }
    .shop-name h4 {
      float: left;
      background: url(../../common/img/cart/shop_ic.png) no-repeat left center;
      background-size: 16 / 20rem 16 / 20rem;
      font-size: 14 / 20rem;
      font-weight: 400;
      padding-left: 20 / 20rem;
      margin-left: 36 / 20rem;
    }
    .shop-name h4 > a {
      color: #333333;
    }
    .shop-name .goback > a {
      position: absolute;
      top: 0;
      right: 0;
      width: 20 / 20rem;
      height: 20 / 20rem;
    }
    .shop-name .goback > a > img {
      width: 100%;
      height: 100%;
    }
    .shop-info {
      background: #ffffff;
      height: 104 / 20rem;
      padding: 10 / 20rem;
      box-sizing: border-box;
      border: 1 / 20rem solid #e5e5e5;
      border-top: none;
      border-left: none;
      z-index: 3;
      position: relative;
    }
    .shop-info .shop-info-img {
      position: absolute;
      margin-left: 1rem;
      width: 80 / 20rem;
      height: 80 / 20rem;
    }
    .shop-info .shop-info-img a > img {
      width: 100%;
      height: 100%;
      display: inline-block;
    }
    .shop-info .shop-info-text {
      margin-left: 112 / 20rem;
    }
    .shop-info .shop-info-text h4 {
      font-size: 12 / 20rem;
      color: #333333;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      margin-bottom: 2 / 20rem;
    }
    .shop-info .shop-info-text .shop-brief {
      height: 17 / 20rem;
      line-height: 17 / 20rem;
      font-size: 12px;
      font-weight: 400;
      color: #999999;
      white-space: nowrap;
      margin-bottom: 10 / 20rem;
    }
    .shop-info .shop-info-text .shop-brief span {
      margin-right: 12 / 20rem;
    }
    .shop-info .shop-info-text .shop-price {
      height: 24 / 20rem;
      line-height: 24 / 20rem;
      position: relative;
    }
    .shop-info .shop-info-text .shop-price .shop-pices {
      color: #ff3c00;
      font-size: 16 / 20rem;
    }
    .shop-info .shop-info-text .shop-arithmetic {
      position: absolute;
      right: 0px;
      top: 0;
      width: 80 / 20rem;
      height: 100%;
      border: 0.5 / 20rem solid #e5e5e5;
      border-radius: 4 / 20rem;
      box-sizing: border-box;
      white-space: nowrap;
    }
    .shop-info .shop-info-text .shop-arithmetic .minus {
      border-right: 0.5 / 20rem solid #e5e5e5;
    }
    .shop-info .shop-info-text .shop-arithmetic a {
      display: inline-block;
      width: 23 / 20rem;
      height: 23 / 20rem;
      text-align: center;
      // font-size: 16 / 20rem;
      vertical-align: top;
    }
    .shop-info .shop-info-text .shop-arithmetic a > img {
      width: 100%;
      height: 100%;
    }
    .shop-info .shop-info-text .shop-arithmetic .num {
      width: 32 / 20rem;
      height: 100%;
      font-size: 14px;
      text-align: center;
      border: none;
      display: inline-block;
      box-sizing: border-box;
      vertical-align: top;
      margin: 0 -6 / 20rem;
    }
    .shop-info .shop-info-text .shop-arithmetic .plus {
      border-left: 0.5 / 20rem solid #e5e5e5;
    }
  }
  .payment-bar {
    clear: both;
    overflow: hidden;
    width: 100%;
    height: 80 / 20rem;
    position: fixed;
    bottom: 50 / 20rem;
    z-index: 66;
  }
  .payment-bar .price-free {
    height: 30 / 20rem;
    line-height: 30 / 20rem;
    background-color: #fff8ed;
    color: #ff3c00;
    font-size: 12 / 20rem;
    text-align: center;
  }
  .payment-bar .bar-price {
    background-color: #ffffff;
    height: 50 / 20rem;
  }
  .payment-bar .bar-price .all-checkbox {
    line-height: 50 / 20rem;
    float: left;
    padding-left: 30 / 20rem;
    font-size: 12px;
    color: #999999;
  }
  .payment-bar .bar-price .all-checkbox input {
    margin-top: -5 / 20rem;
  }
  .payment-bar .bar-price .shop-total {
    float: left;
    -webkit-box-flex: 1;
    box-flex: 1;
    line-height: 50 / 20rem;
    margin-left: 94 / 20rem;
    margin-right: 20 / 20rem;
  }
  .payment-bar .bar-price .shop-total strong {
    display: block;
    font-size: 16 / 20rem;
    color: #222222;
    font-weight: 400;
  }
  .payment-bar .bar-price .shop-total strong i {
    font-style: normal;
    color: #ff0000;
    font-size: 18 / 20rem;
  }
  .payment-bar .settlement {
    display: inline-block;
    font-family: PingFangSC-Light;
    font-weight: 400;
    float: right;
    width: 110 / 20rem;
    height: 50 / 20rem;
    line-height: 50 / 20rem;
    text-align: center;
    color: #fff;
    font-size: 18 / 20rem;
    background: #ffbd52;
  }
  .payment-bar .settlement i {
    font-style: normal;
    font-size: 10 / 20rem;
  }
  .disabled {
    background-color: #BBBBBB !important;
  }
}
</style>