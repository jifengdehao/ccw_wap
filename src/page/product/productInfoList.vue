/*
 * @Author: huShangJun 
 * @Date: 2018-01-04 15:52:37 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 商品细分列表
 */
<template>
  <div id="productInfoList">
    <!-- 头部 -->
    <div class="header">
      <x-header :left-options="{backText: ''}" style="background-color:#fff;color: #333">
        <span>{{params.queryString}}</span>
      </x-header>
    </div>
    <!-- 一级分类列表 -->
    <div class="nav">
      <ul>
        <li :class="{current:selected==0}" @click="sort(0)">
          <span>综合排序</span><img src="../../common/img/productIndex/up_ic.png" alt=""></li>
        <li :class="{current:selected==1}" @click="sort(1)">
          <span>价格</span><img src="../../common/img/productIndex/down_ic.png" alt=""></li>
        <li :class="{current:selected==2}" @click="sort(2)">
          <span>销量</span>
        </li>
        <li :class="{current:selected==3}" @click="sort(3)">
          <span>评价</span>
        </li>
      </ul>
    </div>
    <!-- 一级分类下面的二级分类产品 -->
    <Scroller lock-x class="list">
      <ul>
        <li class="productMessage" v-for="(item, index) in listData" :key="index">
          <router-link :to="'goods/'+ item.productId">
            <div class="productMessageLeft left"><img :src="item.proImgUrl" alt="商品图片"></div>
            <div class="productMessageRight right">
              <p class="first">{{item.productName}}</p>
              <p class="second">
                <span>月销量 {{item.monthSalesAmount}}</span>
                <i class="border"></i>
                <span>好评率{{item.goodRemarkRate*100}}%</span>
              </p>
              <p class="third">{{item.shopName}}</p>
              <p class="fourth"><span>每斤{{item.price/100}}元</span></p>
              <p class="last">¥{{item.items[0].curPrice/100}} <span>约{{item.items[0].names}}</span></p>
            </div>
          </router-link>
          <div v-if="item.items.length === 1" class="cartIcon icon" @click="postCarts(item.items[0].itemId,item.shopId)">
            <img src="../../common/img/productIndex/shopping_ic.png" alt="">
          </div>
          <div v-else class="fontIcon icon" @click="showChang(item.items,item.shopId)">多规格</div>
        </li>
        <li class="footer">
          <p>没有更多了</p>
        </li>
      </ul>
    </Scroller>
    <!-- 购物车图标 -->
    <div class="bigCart" @click="toCart">
      <img src="../../common/img/productIndex/shopping_big_ic.png" alt="">
      <p class="smallIcon" v-if="countIcon">{{countIcon}}</p>
    </div>
    <!-- 弹窗 -->
    <div class="alert">
      <x-dialog class="dialog" v-model="show">
        <div class="alertContent clearfix" >
          <h5>规格：</h5>
          <checker v-model="cartparams.skuid" default-item-class="demo2-item" selected-item-class="demo2-item-selected">
            <checker-item :value="item.itemId" v-for="(item,index) in alertData" :key="index" @on-item-click = "changeitem(index)">{{item.names}}</checker-item>
            <!-- <checker-item value="2">不切</checker-item> -->
          </checker>
        </div>
        <div class="alertFooter" @click="postCarts">
          确定(￥{{price}})
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
import * as http from '@/api/http'
import { XHeader, XDialog, Checker, CheckerItem, Scroller } from 'vux'
// import alert from './productComponents/alert'
export default {
  components: { XHeader, XDialog, Checker, CheckerItem, Scroller },
  props: {},
  data() {
    return {
      selected: 0,
      showCart: false,
      show: false,
      price: '',
      countIcon: 0,
      marketId: 141, // 市场id
      listData: [], // 获取的数据
      alertData: [],
      params: {
        queryString: this.$route.query.queryString, // 商品名称
        rankFlag: 'default', // 排序标记,default默认,price 价格,monthSale 月销量,goodRate 好评
        order: 0, // 升序降序,0降序 1升序
        pageNum: 1,
        pageSize: 10
      },
      cartparams: {
        // 添加商品到购物车的数据
        attrId: null, // 规格
        marketId: JSON.parse(window.sessionStorage.market).marketId, // 市场id
        shopId: this.$route.params.id, // 店铺id
        skuid: null, // 产品id
        userId: this.$store.state.loginInfo.cust_id // 用户id
      }
    }
  },
  created() {
    this.getNearProducts()
  },
  mounted() {
    this.getCartNum()
  },
  methods: {
    sort(index) {
      switch (index) {
        case 0:
          this.params.rankFlag = 'default'
          break
        case 1:
          this.params.rankFlag = 'price'
          break
        case 2:
          this.params.rankFlag = 'monthSale'
          break
        case 3:
          this.params.rankFlag = 'goodRate'
          break
      }
      this.selected = index
      this.getNearProducts()
    },
    // 获取购物车数量
    getCartNum() {
      http
        .getCartNum(
          this.$store.state.loginInfo.cust_id,
          JSON.parse(window.sessionStorage.market).marketId
        )
        .then(res => {
          if (res.code === 200) {
            this.countIcon = res.data
          }
        })
    },
    // 添加商品进入购物车
    postCarts(skuid, shopId) {
      if (typeof skuid == 'number') {
        this.cartparams.skuid = skuid
        this.cartparams.shopId = shopId
      }
      http.postCarts(this.cartparams).then(res => {
        this.getCartNum()
        this.show = false
      })
    },
    // 弹出弹窗
    showChang(data,shopId) {
      this.show = true
      this.cartparams.skuid = data[0].itemId
      this.cartparams.shopId = shopId
      // if (data.length > 1) {
      this.alertData = data
      // }
    },
    // 多规格的时候选择规格
    changeitem(index) {
      this.price = this.alertData[index].curPrice
    },
    // 点击购物车图标进入购物车
    toCart() {
      this.$router.push('cart')
    },
    // 获取产品列表
    getNearProducts() {
      http.getNearProducts(this.marketId, this.params).then(res => {
        if (res.code === 200) {
          this.listData = res.data.records
          console.log(this.listData)
        }
      })
    }
  },
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" >
#productInfoList {
  height: 100%;
  position: relative;
  .header {
    position: absolute;
    width: 100%;
    z-index: 100;
    span {
      font-size: 16px;
      color: #333333;
      letter-spacing: -0.12px;
    }
  }
  .nav {
    position: absolute;
    top: 46px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    z-index: 100;
    text-align: center;
    background-color: #fafafa;
    border-top: 0.5px solid #d8d8d8;
    border-bottom: 0.5px solid #d8d8d8;
    box-sizing: border-box;
    li {
      float: left;
      width: 25%;
      font-size: 12px;
      color: #999999;
      letter-spacing: -0.09px;
      img {
        width: 6px;
        height: 3px;
        margin-left: 1.2px;
      }
    }
    li.current {
      color: #333333;
    }
  }
  .list {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 86px 0.6rem 0;
    box-sizing: border-box;
    .productMessage {
      height: 6.5rem;
      padding-top: 0.5rem;
      border-bottom: 0.5px solid #e5e5e5;
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
      .productMessageLeft {
        width: 4.5rem;
        height: 4.5rem;
        margin-right: 0.4rem;
        img {
          width: 4.5rem;
          height: 4.5rem;
        }
      }
      .productMessageRight {
        position: relative;
        width: 253/20rem;
        box-sizing: border-box;
        .first {
          line-height: 1rem;
          font-size: 0.7rem;
          color: #333333;
          letter-spacing: -0.08px;
        }
        .second,
        .third {
          font-size: 0.6rem;
          line-height: 0.85rem;
          color: #999999;
          letter-spacing: -0.07px;
        }
        .third {
          color: #666;
        }
        .fourth {
          font-size: 0.5rem;
          line-height: 0.7rem;
          color: #ffbd52;
          letter-spacing: -0.07px;
          span {
            background: #fff8ed;
            border: 0.5px solid #ffae28;
            border-radius: 2px;
          }
        }
        .last {
          font-size: 0.9rem;
          line-height: 1.25rem;
          color: #ff3c00;
          letter-spacing: -0.08px;
          span {
            font-size: 10px;
            color: #666666;
            letter-spacing: -0.07px;
            margin-left: 4px;
          }
        }
        .border {
          display: inline-block;
          width: 1px;
          height: 0.4rem;
          margin: 0 2px;
          background-color: #bbb;
        }
        p {
          margin-bottom: 4px;
        }
      }
      .icon {
        position: absolute;
        right: 0;
        bottom: 0.8rem;
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
    .footer {
      height: 50px;
      line-height: 50px;
      font-size: 12px;
      color: #888;
      text-align: center;
    }
  }
  .bigCart {
    position: absolute;
    left: 12px;
    bottom: 2rem;
    width: 2.5rem;
    height: 2.5rem;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 50%;
    img {
      width: 2.5rem;
    }
    .smallIcon {
      position: absolute;
      top: -4/20rem;
      right: -4/20rem;
      width: 1.2rem;
      height: 1.2rem;
      line-height: 1.2rem;
      background-color: #ff3c00;
      border-radius: 50%;
      font-size: 16px;
      color: #ffffff;
      letter-spacing: -0.1px;
      text-align: center;
    }
  }
  .alert {
    .dialog .weui-dialog {
      border-radius: 12px;
      padding: 12px;
      width: 280/20rem;
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
}
</style>