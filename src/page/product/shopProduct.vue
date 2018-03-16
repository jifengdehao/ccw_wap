/*
 * @Author: huShangJun 
 * @Date: 2018-01-08 09:34:44 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 店铺详情 
 */
<template>
  <div id="shopProduct">
    <loading v-if="showLoading"></loading>
    <div v-else style="height: 100%">
      <!-- 头部大图区域 -->
    <div style="position:absolute;zIndex:1000">
      <div class="topImg">
        <!-- 返回上一页图标 -->
        <img src="../../common/img/productIndex/shop_bg.png" alt="">
        <i class="goback" @click="goback"></i>
        <div class="shopMessage" @click="goShopInfo">
          <div class="shopMessageLeft">
            <img :src="shopDesc.headUrl" alt="">
          </div>
          <div class="shopMessageRight">
            <p>
              <span>{{shopDesc.shopName}} </span>
              <i class="showIcon" v-if="showIcon"></i>
            </p>
            <rater v-model="shopDesc.starLevel" active-color="#ffbd52" :font-size="13" disabled></rater>
          </div>
        </div>
      </div>
      <!-- 公告 -->
      <div class="notic">
        <span>公告：</span>{{shopDesc.notice}}
      </div>
    </div>
    <!-- 产品列表 -->
    <div class="product">
      <!-- 一级分类 -->
      <aside>
        <ul>
          <li v-for="(item,index) in shopProduct" :key="index" :class="{current:selected==index}" @click="selectedList(index)">{{item.catName}}</li>
        </ul>
      </aside>
      <!-- 二级分类 -->
      <div class="productList">
        <ul>
          <li v-for="(item,index) in products" :key="index">
            <router-link :to="'/goods/'+ item.productId">
              <div class="listLeft">
                <img :src="item.proImgUrl" alt="">
              </div>
              <div class="listRight">
                <p class="first">{{item.productName}}</p>
                <p class="second">
                  <span>月销量{{item.monthSalesAmount}}</span>
                  <i>|</i>
                  <span>好评率{{item.goodRemarkRate*100}}%</span>
                </p>
                <p class="third">每斤{{item.price/100}}元</p>
                <p class="last">¥{{item.items[0].curPrice/100}}
                  <span>{{item.items[0].names}}</span>
                </p>
              </div>
            </router-link>
            <div v-if="item.items.length === 1" class="cartIcon icon" @click="postCarts(item.items[0].itemId)">
              <img src="../../common/img/productIndex/shopping_ic.png" alt="">
            </div>
            <div v-else class="fontIcon icon" @click="showChang(index)">多规格</div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 购物栏 -->
    <div class="cartBar">
      <!-- 提示 -->
      <!-- <p class="prompt" v-if="notSettlement">含有下架商品无法结算</p> -->
      <!-- 内容购物车 -->
      <div class="cartContent">
        <div class="left">
          <p class="first" >
            <span>￥</span>{{cartdata.cartAmount/100}}</p>
          <!-- <p class="second">差{{cartdata.instantRebateDeliveryCost/100 - cartdata.cartAmount}}元免配送费</p> -->
        </div>
        <div class="right" @click="toCart">去支付</div>
        <div class="bigCart"  @click="toCart">
          <p class="countIcon" v-if="cartdata.cartNum">{{cartdata.cartNum}}</p>
        </div>
      </div>

    </div>
    <!-- 弹窗 -->
    <div class="alert">
      <x-dialog class="dialog" v-model="show">
        <div class="alertContent clearfix" >
          <h5>规格：</h5>
          <checker v-model="params.skuid" default-item-class="demo2-item" selected-item-class="demo2-item-selected">
            <checker-item :value="item.itemId" v-for="(item,index) in items" :key="index" @on-item-click = "changeitem(index)">{{item.names}}</checker-item>
            <!-- <checker-item value="3">不切</checker-item> -->
          </checker>
        </div>
        <div class="alertFooter" @click="postCarts">
          确定( ¥ {{price/100}} )
        </div>
      </x-dialog>
    </div>
  </div>
    
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { Rater, XDialog, Checker, CheckerItem } from 'vux'
import * as api from '@/api/http'
import loading from '@/components/loading/loading'
export default {
  components: { Rater, XDialog, Checker, CheckerItem, loading },
  props: {},
  data() {
    return {
      showLoading: true,
      index: 0,
      showIcon: true, // 到店铺详情的箭头
      selected: 0,
      shopDesc: {}, // 店铺详情介绍
      countStar: 4.5, // 店铺评价星数
      shopProduct: [], // 店铺产品信息
      products: [], // 二级产品列表
      items: [],
      showCart: false,
      show: false, // 弹框
      price: '',
      cartdata: {}, // 购物车信息
      params: {
        // 添加商品到购物车的数据
        attrId: null, // 规格
        marketId: JSON.parse(window.sessionStorage.market).marketId, // 市场id
        shopId: this.$route.params.id, // 店铺id
        skuid: null, // 产品id
        userId: this.$store.state.loginInfo.cust_id // 用户id
      },
      notSettlement: false
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.getShopDesc()
    this.getProductByShopId()
    this.getCartAmountAndNum()
  },
  methods: {
    // 获取店铺信息
    getShopDesc() {
      api.getShopDesc(this.$route.params.id).then(res => {
        this.shopDesc = res.data
        setTimeout(() => {
          this.showLoading = false
        }, 500)
      })
    },
    // 进入店铺页面   获取该店铺产品信息
    getProductByShopId() {
      api.getProductByShopId(this.$route.params.id).then(res => {
        this.shopProduct = res.data
        if (res.data[0]) {
          this.products = this.shopProduct[0].product
        } else {
          alert('该店铺暂无商品')
        }
      })
    },
    // 获取购物车内总件数，满多少减免运费和总金额
    getCartAmountAndNum() {
      api
        .getCartAmountAndNum(
          this.$store.state.loginInfo.cust_id,
          JSON.parse(window.sessionStorage.market).marketId
        )
        .then(res => {
          this.cartdata = res.data
        })
    },
    goback() {
      this.$router.go(-1)
    },
    goShopInfo() {
      this.$router.push('/shopInfo/' + this.$route.params.id)
    },
    selectedList(index) {
      this.selected = index
      // 二级产品列表信息
      this.products = this.shopProduct[index].product
    },
    // 点击弹出弹框
    showChang(index) {
      this.show = true
      this.items = this.products[index].items
      // this.params.skuid = this.products[index].productId
      this.params.skuid = this.items[0].itemId
    },
    // 多规格时选择
    changeitem(index) {
      this.price = this.items[index].curPrice
      this.params.skuid = this.items[index].itemId
    },

    // 添加商品进入购物车
    postCarts(skuid) {
      if (typeof skuid == 'number') {
        this.params.skuid = skuid
      }
      api.postCarts(this.params).then(res => {
        this.getCartAmountAndNum()
        this.show = false
      })
    },
    // 去购物车结算
    toCart() {
      if (this.notSettlement === false) {
        this.$router.push('/cart')
      }
    },
    alert() {}
  },
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" >
#shopProduct {
  position: relative;
  height: 100%;
  background-color: #f5f5f5;
  .weui-cells {
    margin-top: 0 !important;
  }
  .weui-cell:before {
    left: 12px;
    right: 12px;
  }
  .topImg {
    width: 100%;
    img {
      width: 100%;
      height: 127/20rem;
    }
    .goback {
      position: absolute;
      top: 14/20rem;
      left: 10/20rem;
      width: 30px;
      height: 30px;
      // background-color: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      background: url('../../common/img/productIndex/back_white.png') no-repeat;
      background-size: 25px;
    }
    .shopMessage {
      position: absolute;
      top: 2.5rem;
      min-width: 204/20rem;
      height: 3.5rem;
      padding: 12px 10px 0 10px;
      box-sizing: border-box;
      border-bottom-right-radius: 2rem;
      border-top-right-radius: 2rem;
      // background-color: rgba(0, 0, 0, 0.5);
      .shopMessageLeft {
        float: left;
        margin-right: 10px;
        img {
          width: 2.5rem;
          height: 2.5rem;
        }
      }
      .shopMessageRight {
        float: left;
        vertical-align: middle;
        p {
          height: 1.25rem;
          span {
            float: left;
            line-height: 1.24rem;
            font-size: 0.9rem;
            color: #ffffff;
            letter-spacing: -0.08px;
          }
          .showIcon {
            display: inline-block;
            width: 1.25rem;
            height: 1.25rem;
            background: url('../../common/img/productIndex/core_Jump.png');
            background-size: contain;
          }
        }
      }
    }
  }
  .notic {
    height: 26/20rem;
    line-height: 26/20rem;
    margin-bottom: 0.5rem;
    padding-left: 0.6rem;
    font-size: 10px;
    color: #666666;
    overflow: auto;
    letter-spacing: -0.06px;
    background-color: #fff;
  }
  .product {
    height: 100%;
    padding: 163/20rem 0 2.5rem 0;
    // background-color: #fafafa;
    box-sizing: border-box;
    aside {
      float: left;
      width: 4rem;
      height: 100%;
      background-color: #fafafa;
      overflow: scroll;
      li {
        height: 2.5rem;
        line-height: 2.5rem;
        text-align: center;
        font-size: 14px;
        color: #666666;
        letter-spacing: -0.08px;
        border: 0.5px solid #e5e5e5;
        border-left: none;
        box-sizing: border-box;
        margin-top: -1px;
      }
      li:nth-of-type(1) {
        margin-top: 0;
      }
      li.current {
        background-color: #fff;
        border-left: 2px solid #ffbd52;
        border-right: none;
        color: #ffbd52;
      }
    }
    ::-webkit-scrollbar {
      display: none;
    }
    .productList {
      width: 295/20rem;
      height: 100%;
      margin-left: 4rem;
      padding: 0 8px 12px;
      background-color: #fff;
      overflow: scroll;
      box-sizing: border-box;
      li {
        position: relative;
        height: 96/20rem;
        padding: 0.4rem 0;
        overflow: hidden;
        box-sizing: border-box;
        border-bottom: 0.5px solid #e5e5e5;
        .listLeft {
          float: left;
          width: 4rem;
          height: 4rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .listRight {
          float: left;
          width: 195/20rem;
          padding-left: 0.25rem;
          box-sizing: border-box;
          .first {
            font-size: 12px;
            color: #333333;
            letter-spacing: -0.07px;
            line-height: 0.85rem;
            margin-bottom: 0.2rem;
          }
          .second,
          .third {
            font-size: 10px;
            line-height: 0.7rem;
            color: #999999;
            letter-spacing: -0.07px;
          }
          .third {
            display: inline;
            background: #fff8ed;
            border: 0.5px solid #ffae28;
            border-radius: 2px;
            color: #ffbd52;
          }
          .last {
            font-size: 16px;
            color: #ff3c00;
            letter-spacing: -0.08px;
            line-height: 1.1rem;
            margin-top: 0.35rem;
            span {
              font-size: 10px;
              line-height: 0.9rem;
              color: #999999;
              margin-left: 0.1rem;
            }
          }
        }
        .icon {
          position: absolute;
          right: 0;
          bottom: 0.4rem;
        }
        .cartIcon {
          img {
            width: 26/20rem;
          }
        }
        .icon.fontIcon {
          width: 54/20rem;
          height: 1.1rem;
          line-height: 1.1rem;
          font-size: 0.6rem;
          border-radius: 100px;
          color: #fff;
          background-color: #ffbd52;
          text-align: center;
        }
      }
    }
  }
  .alert {
    .dialog .weui-dialog {
      border-radius: 12px;
      padding: 12px;
      width: 270/20rem;
      box-sizing: border-box;
      .alertContent {
        padding-bottom: 30px;
      }
      .alertFooter {
        background-color: #ffbd52;
        border-radius: 3px;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        color: #fff;
      }
      h5 {
        font-size: 14px;
        color: #bcbcbc;
        font-weight: 400;
        text-align: left;
      }
      .demo2-item {
        // width: 74px;
        font-size: 14px;
        color: #333333;
        line-height: 30px;
        padding: 0 12px;
        border-radius: 15px;
        box-sizing: border-box;
        float: left;
        margin: 6px 10px 0 0;
        border: 0.5px solid #e5e5e5;
      }
      .demo2-item-selected {
        color: #fff;
        background-color: #ffbf51;
      }
    }
  }
  .cartBar {
    position: fixed;
    bottom: 0;
    width: 100%;
    .prompt {
      height: 1.5rem;
      line-height: 1.5rem;
      padding-left: 12px;
      font-size: 12px;
      color: #ff3c00;
      background: #fff8ed;
    }
    .cartContent {
      position: relative;
      height: 2.5rem;
      line-height: 2.5rem;
      width: 100%;
      // overflow: hidden;
      background-color: #fff;
      .left {
        padding-left: 77/20rem;
        padding-right: 0.4rem;
        width: 265/20rem;
        height: 2.5rem;
        position: relative;
        box-sizing: border-box;
        .first {
          display: inline-block;
          // width: 2.4rem;
          font-size: 20px;
          color: red;
          span {
            font-size: 12px;
          }
        }
        .second {
          float: right;
          right: 0;
          font-size: 12px;
          color: #bbbbbb;
        }
      }
      .right {
        position: absolute;
        right: 0;
        width: 5.5rem;
        height: 100%;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: -0.1px;
        text-align: center;
        background-color: #ffbd52;
      }
      .right.current {
        background-color: #bbb;
      }
      .bigCart {
        position: absolute;
        left: 12px;
        top: -6px;
        width: 2.5rem;
        height: 2.5rem;
        background: url('../../common/img/productIndex/shopping_ic.png');
        // background-color: red;
        background-size: 100%;
        .countIcon {
          position: absolute;
          right: 0;
          top: -5px;
          width: 1rem;
          height: 1rem;
          line-height: 1rem;
          text-align: center;
          border-radius: 50%;
          background: #ff3c00;
          font-size: 14px;
          color: #ffffff;
          letter-spacing: -0.09px;
        }
      }
    }
  }
}
</style>