/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：商品详情
*/
<template>
  <transition name="slide">
    <div class="good-details">
      <i class="back" @click="back"></i>
      <div class="content">
        <scroll :data="swiperImg" ref="scroll">
          <div>
            <slide v-if="swiperImg.length>0">
              <div v-for="(item,index) in swiperImg" :key="index">
                <a>
                  <img :src="item" @load="loadImage">
                </a>
              </div>
            </slide>
            <div class="details">
              <div class="name">{{product.productName}}</div>
              <div class="price">
                <span class="current">¥{{currentSpec.curPrice / 100}}</span>
                <del>¥{{currentSpec.historyPrice}}</del>
              </div>
              <div class="place border-1px">
                <span>已售{{product.monthSalesAmount}}件</span><span>产地：{{product.originPlace}}</span>
              </div>
              <div class="spec border-1px" v-if="spec.length>0">规格
                <span class="spec-item"
                      :class="{'active':specType === index}"
                      @click="selectSpec(item,index)"
                      v-for="(item,index) in spec" :key="item.itemId">{{item.names}}</span>
              </div>
              <div class="attr" v-if="attr.length>0">属性
                <span class="attr-item"
                      :class="{'active':attrType===index}"
                      @click="selectAtrr(item,index)"
                      v-for="(item,index) in attr" :key="index">{{item.attrName}}</span>
              </div>
            </div>
            <div class="tab border-1px">
              <div class="tab-item" :class="{'active':type===0}" @click="getCurrent(0)"><span>商品介绍</span></div>
              <div class="tab-item" :class="{'active':type===1}" @click="getCurrent(1)"><span>好评率{{product.goodRemarkRate * 100}}%</span>
              </div>
            </div>
            <div class="tab-container" v-show="type===0">
              <div class="img-wrapper" v-if="introImg.length>0">
                <img v-lazy="item" v-for="(item,index) in introImg" :key="index"/>
              </div>
            </div>
            <div class="tab-container" v-show="type===1">
              <ul class="list" v-if="remarks.length>0">
                <li class="item border-1px" v-for="(item,index) in remarks" :key="index">
                  <div class="item-img" v-lazy:background-image="item.picUrl"></div>
                  <div class="item-content">
                    <div class="name">{{item.custName}}</div>
                    <div class="date">{{item.remarkAt|formatTime}}</div>
                  </div>
                  <i class="icon-status" :class="{active:item.goodRemarkFlag === 1}"></i>
                </li>
              </ul>
              <div class="no-result" v-else>近期暂无评价</div>
            </div>
          </div>
        </scroll>
      </div>
      <div class="shop-wrapper">
        <div class="shopcart border-top-1px">
          <router-link tag="div" class="seller" :to="{path:/shopInfo/+product.shopId}">
            <i class="icon-seller"></i>
            <div class="text">店铺</div>
          </router-link>
          <router-link tag="div" class="cart" to="/cart">
            <i class="icon-cart">
              <div class="badge" v-if="badge">{{badge}}</div>
            </i>
            <div class="text">购物车</div>
          </router-link>
          <div class="add-cart" @click="addCart">加入购物车</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import Slide from '@/components/slide/slide'
  import Scroll from '@/components/scroll/scroll'
  import * as api from '@/api/http.js'
  import * as time from '@/until/time.js'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        productId: (() => {   // 商品Id
          return this.$route.params.id
        })(),
        type: 0, // 商品介绍 0 好评率 1
        product: {},// 商品
        specType: 0, // 当前的商品的规格的下标
        attrType: 0, // 当前的商品属性的下标
        swiperImg: [], // 商品的轮播图
        introImg: [], // 商品的介绍图
        remarks: [], // 商品评价
        spec: [],  // 商品的规格组
        attr: [], // 商品的属性组
        currentSpec: {}, // 当前的商品的规格
        currentAttr: {}, // 当前的商品属性
        badge: '', // 购物车数量
      }
    },
    components: {
      Slide,
      Scroll
    },
    computed: {
      ...mapGetters([
        'user',
        'market'
      ])
    },
    created() {
      if (this.productId) {
        this.getProductDetails(this.productId)
        this.getProductRemarks(this.productId)
      }
    },
    filters: {
      formatTime: function (value) {
        if (!value) return ''
        return time.formatDateTime(value)
      }
    },
    methods: {
      // 加载图片
      loadImage() {
        if (!this.checkImg) {         /* 加载完一张图片时不再执行 */
          this.checkImg = true
          this.$refs.scroll.refresh()
        }
      },
      // 添加购物车
      addCart() {
        if (this.product.shopId) {
          let params = {
            marketId: this.market.marketId,
            userId: this.user.cust_id,
            shopId: this.product.shopId,
            skuid: this.currentSpec.itemId,
            attrId: this.currentAttr.attrId
          }
          api.addShopCart(params).then((res) => {
            if (res.code === 200 && res.data) {
              this.getProductShopCartTotal(this.product.shopId)
            }
          })
        }
      },
      // 切换商品介绍和好评率
      getCurrent(type) {
        this.type = type
      },
      // 选规格
      selectSpec(item, index) {
        this.specType = index
        this.currentSpec = item
      },
      // 选属性
      selectAtrr(item, index) {
        this.attrType = index
        this.currentAttr = item
      },
      // 返回
      back() {
        this.$router.back()
      },
      // 获取商品详情
      getProductDetails(productId) {
        api.getProductDetails(productId).then((res) => {
          if (res.code === 200) {
            console.log(res.data)
            this.product = res.data
            this.swiperImg = res.data.picUrl
            this.introImg = res.data.introducePicUrl
            if (res.data.items.length > 0) {
              this.spec = res.data.items
              this.currentSpec = res.data.items[0]
            }
            if (res.data.attrs.length > 0) {
              this.attr = res.data.attrs
              this.currentAttr = res.data.attrs[0]
            }
            this.getProductShopCartTotal(res.data.shopId)
          }
        })
      },
      // 获取商品评价
      getProductRemarks(productId) {
        let params = {
          pageNum: 1,
          pageSize: 10
        }
        api.getProductRemarks(productId, params).then((res) => {
          if (res.code === 200) {
            this.remarks = res.data.records
          }
        })
      },
      // 获取购物车的数量
      getProductShopCartTotal(shopId) {
        if (shopId) {
          let params = {
            shopId: shopId
          }
          api.getProductShopCartTotal(this.user.cust_id, this.market.marketId, params).then((res) => {
            if (res.code === 200) {
              this.badge = res.data
            }
          })
        }
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import "../../common/css/mixin";

  .good-details {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    overflow: hidden;
    .content {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 2.5rem;
      left: 0;
      overflow: hidden;
      background-color: #f5f5f5;
      .tab {
        height: 2.2rem;
        line-height: 2.2rem;
        text-align: center;
        display: flex;
        background-color: #FFFFFF;
        .border-1px(#e5e5e5);
        .tab-item {
          flex: 1;
          font-size: .7rem;
        }
        .active {
          & > span {
            color: #FFBD52;
            border-bottom: 2px solid #FFBD52;
            padding-bottom: .6rem;
          }
        }
      }
      .tab-container {
        background-color: #FFFFFF;
        .img-wrapper {
          padding: .5rem .6rem;
          & > img {
            max-width: 100%;
            height: auto;
            margin-bottom: .5rem;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
        .no-result {
          height: 3.5rem;
          line-height: 3.5rem;
          text-align: center;
          font-size: .6rem;
          color: #999999;
        }
        .list {
          padding: 0 .6rem;
          .item {
            height: 3rem;
            font-size: 0;
            display: flex;
            .border-1px();
            &:last-child {
              .border-none();
            }
            .item-img {
              display: inline-block;
              width: 1.5rem;
              height: 1.5rem;
              border-radius: 50%;
              flex: 0 0 1.5rem;
              background: url("../../assets/logo.png") no-repeat center;
              background-size: 1.5rem 1.5rem;
              margin-top: .75rem;
            }
            .item-content {
              flex: 1;
              padding-left: .4rem;
              padding-top: .75rem;
              box-sizing: border-box;
              .name {
                font-size: .7rem;
                margin-bottom: .2rem;
                line-height: 1rem;
              }
              .date {
                font-size: .5rem;
                color: #999999;
              }
            }
            .icon-status {
              position: absolute;
              right: .6rem;
              top: 1.1rem;
              width: .8rem;
              height: .8rem;
              background: url("../../common/img/good-details/bad_ic.png") no-repeat center;
              background-size: contain;
            }
            .active {
              background: url("../../common/img/good-details/good_ic.png") no-repeat center;
              background-size: contain;
            }
          }
        }
      }
      .details {
        margin-bottom: .5rem;
        padding: .6rem .6rem 0 .6rem;
        background-color: #FFFFFF;
        .name {
          font-size: .7rem;
          line-height: 1rem;
        }
        .price {
          font-size: 0;
          margin: .5rem 0;
          .current {
            color: #FF3C00;
            font-size: 1rem;
            margin-right: .5rem;
            line-height: .85rem;
          }
          & > del {
            font-size: .7rem;
            color: #999999;
            line-height: 1rem;
          }
        }
        .place {
          display: flex;
          justify-content: space-between;
          padding-bottom: .5rem;
          .border-1px();
          font-size: .6rem;
          line-height: .85rem;
          color: #999999;
        }
        .spec, .attr {
          line-height: 2rem;
          color: #999999;
          font-size: .7rem;
          .border-1px();
          .spec-item, .attr-item {
            padding: .2rem .5rem;
            border: 0.5px solid #e5e5e5;
            margin-left: .5rem;
            border-radius: 5rem;
            font-size: .6rem;
            color: #333333;
          }
          .active {
            color: #FFFFFF;
            background-color: #FFBD52;
            border: none;
          }
        }
        .attr {
          .border-none();
        }
      }
    }
    .back {
      position: fixed;
      top: .35rem;
      left: .6rem;
      width: 1.5rem;
      height: 1.5rem;
      background: url("../../common/img/productIndex/shops_back.png") no-repeat center;
      background-size: 1.5rem 1.5rem;
      z-index: 300;
    }
    .shop-wrapper {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2.5rem;
      overflow: hidden;
    }
    .shopcart {
      display: flex;
      text-align: center;
      .border-top-1px(#e5e5e5);
      .seller {
        border-right: 0.5px solid #e5e5e5;
      }
      .seller, .cart {
        width: 3rem;
        flex: 0 0 3rem;
        box-sizing: border-box;
        font-size: 0;
        .icon-seller, .icon-cart {
          display: inline-block;
          width: 1.2rem;
          height: 1.2rem;
          margin: .3rem 0 .1rem 0;
        }
        .icon-seller {
          background: url("../../common/img/good-details/detail_file.png") no-repeat center;
          background-size: 1.2rem 1.2rem;
        }
        .icon-cart {
          background: url("../../common/img/good-details/shopping_default.png") no-repeat center;
          background-size: 1.2rem 1.2rem;
          position: relative;
          .badge {
            position: absolute;
            top: -0.05rem;
            right: -0.05rem;
            width: .6rem;
            height: .6rem;
            line-height: .6rem;
            text-align: center;
            border-radius: 50%;
            color: #FFFFFF;
            background-color: #FF3C00;
            font-size: .5rem;
          }
        }
        .text {
          font-size: .5rem;
          color: #999999;
          line-height: .7rem;
        }
      }
      .add-cart {
        flex: 1;
        line-height: 2.5rem;
        text-align: center;
        background: #FFBD52;
        color: #FFFFFF;
        font-size: .9rem;
      }
    }
  }
</style>
