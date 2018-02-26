/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：搜索
*/
<template>
  <transition name="slide">
    <div class="search-wrapper">
      <div class="header border-1px">
        <i class="back" @click="back"></i>
        <div class="search-content">
          <input type="text" class="search" placeholder="附近档口商品" v-model.trim="search" @keyup.enter="submit"/>
          <i class="clear" v-show="search" @click="clearSearch"></i>
        </div>
        <button type="button" class="btn-search">搜索</button>
      </div>
      <div class="tab border-1px">
        <div class="tab-item" :class="{active:status === 1}" @click="selectStatus(1)">
          <span>商品</span>
        </div>
        <div class="tab-item" :class="{active:status === 2}" @click="selectStatus(2)">
          <span>档口</span>
        </div>
      </div>
      <div class="tab-content" v-show="status===1">
        <div class="mescroll" id="mescroll_1" ref="mescroll">
          <show-cart></show-cart>
          <ul class="goods-list" v-if="goods.length>0">
            <router-link :to="{path:'/goods/'+item.productId}"
                         v-for="(item,index) in goods"
                         :key="index"
                         tag="li"
                         class="item border-1px">
              <div class="item-img">
                <img v-lazy="item.proImgUrl">
              </div>
              <div class="item-content">
                <div class="name">{{item.productName}}</div>
                <div class="sales">月销量{{item.monthSalesAmount}}&nbsp;&nbsp;|&nbsp;&nbsp;好评率{{item.goodRemarkRate *
                  100}}%
                </div>
                <div class="spec">约{{item.items | capitalize}}</div>
                <div class="seller">{{item.shopName}}</div>
                <div class="price">¥{{item.price / 100}}</div>
                <div class="selectIcon" v-if="selectGood" @click="changSelectStatus"></div>
                <div class="selectGood" v-else @click.native="selectSpec">多规格</div>
              </div>
            </router-link>
          </ul>
        </div>
      </div>
      <div class="tab-content" v-show="status===2">
        <div class="mescroll" id="mescroll_2" ref="mescroll">
          <ul class="sellers-list" v-if="sellers.length>0">
            <router-link :to="{path:/shopInfo/+item.msShopId}"
                         tag="li"
                         class="item border-1px" v-for="(item,index) in sellers" :key="index">
              <div class="item-img">
                <img v-lazy="item.headUrl">
              </div>
              <div class="item-content">
                <div class="name">{{item.shopName}}</div>
                <div class="star">
                  <rater :active-color="starColor" :fontSize="starFontSize" :disabled="starDisabled"
                         v-model="item.starLevel"></rater>
                  &nbsp;&nbsp;月销量{{item.monthSale}}&nbsp;&nbsp;|&nbsp;&nbsp;关注{{item.focus}}
                </div>
                <div class="dec">{{item.notice}}</div>
              </div>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import * as api from '@/api/http'
  import MeScroll from 'mescroll'
  import {Rater} from 'vux'
  import showCart from '@/components/show-cart/show-cart'

  export default {
    data() {
      return {
        search: '',// 搜索
        status: 1, // 切换
        goods: [], // 商品列表
        sellers: [], // 商铺列表
        starColor: '#FFBD52', // 星星颜色
        starDisabled: true,  // 不允许选星
        starFontSize: 10,   // 星星大小
        selectGood: true
      }
    },
    computed: {
      ...mapGetters([
        'market'
      ])
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        return value[0].names
      }
    },
    mounted() {
      let self = this
      this.mescroll_1 = new MeScroll('mescroll_1', {
        up: {
          isBounce: false,
          callback: self.mescroll_1_upCallback
        }
      })
      this.mescroll_2 = new MeScroll('mescroll_2', {
        up: {
          isBounce: false,
          callback: self.mescroll_2_upCallback
        }
      })
    },
    methods: {
      mescroll_2_upCallback(page) {
        let params = {
          pageNum: page.num,
          pageSize: page.size,
        }
        api.getLikeSellersData(params, this.market.marketId).then((res) => {
          if (res.code === 200) {
            console.log(res.data)
            if (page.pageNum === 1) this.sellers = []
            this.sellers = this.sellers.concat(res.data.records)
            console.log(this.sellers)
            this.mescroll_2.endByPage(res.data.records.length,res.data.pages)
          }
        })
      },
      changSelectStatus() {
      },
      mescroll_1_upCallback: function (page) {
        let params = {
          pageNum: page.num,
          pageSize: page.size,
        }
        api.getLikeProductsData(params, this.market.marketId).then((res) => {
          if (res.code === 200) {
            if (page.pageNum === 1) this.goods = []
            this.goods = this.goods.concat(res.data.records)
            console.log(this.goods)
            this.mescroll_1.endByPage(res.data.records.length,res.data.pages)
          }
        })
      },
      // 切换
      selectStatus(type) {
        this.status = type
      },
      // 搜索
      submit() {
        console.log(this.search)
      },
      // 清除搜索条件
      clearSearch() {
        this.search = ''
      },
      // 返回上一级
      back() {
        this.$router.back()
      }
    },
    components: {
      Rater,
      showCart
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import '../../common/css/mixin.less';

  .search-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    overflow: hidden;
    .header {
      height: 2.2rem;
      line-height: 2.2rem;
      display: flex;
      .border-1px();
      .back {
        display: inline-block;
        flex: 0 0 2.4rem;
        width: 2.4rem;
        background: url("../../common/img/common/back.png") no-repeat center;
        background-size: 50%;
      }
      .search-content {
        flex: 1;
        display: inline-block;
        height: 1.5rem;
        line-height: 1.5rem;
        border-radius: 4px;
        margin: .35rem 0;
        box-sizing: border-box;
        background: #f5f5f5 url("../../common/img/location/search.png") no-repeat .4rem center;
        background-size: .65rem .65rem;
        padding-left: 1.3rem;
        padding-right: 1.5rem;
        font-size: 0;
        position: relative;
        & > input {
          height: 1.5rem;
          width: 100%;
          font-size: .6rem;
          color: #999999;
          background-color: #f5f5f5;
        }
      }
      .clear {
        display: inline-block;
        background: url("../../common/img/location/clean_btn.png") no-repeat center;
        width: 1.2rem;
        height: 1.2rem;
        background-size: .6rem .6rem;
        position: absolute;
        right: .15rem;
        top: .15rem;
      }
      .btn-search {
        width: 2.5rem;
        height: 1.5rem;
        flex: 0 0 2.5rem;
        font-size: .7rem;
        text-align: center;
        background-color: #FFFFFF;
        border: 0.5px solid #E5E5E5;
        border-radius: 4px;
        box-sizing: border-box;
        margin: .35rem .6rem .35rem .5rem;
        color: #666666;
      }
    }
    .tab {
      height: 2.2rem;
      line-height: 2.2rem;
      text-align: center;
      display: flex;
      .border-1px();
      .tab-item {
        flex: 1;
        font-size: .8rem;
        &.active {
          & > span {
            color: #FFBD52;
            border-bottom: 2px solid #FFBD52;
            padding-bottom: .55rem;
          }
        }
      }
    }
    .tab-content {
      position: absolute;
      top: 4.4rem;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      .sellers-list {
        padding: 0 .6rem;
        .item {
          &:last-child {
            .border-none()
          }
          .border-1px(#e5e5e5);
          display: flex;
          padding: .6rem 0;
          .item-img {
            width: 4rem;
            flex: 0 0 4rem;
            height: 4rem;
            & > img {
              width: 100%;
              height: 100%;
            }
          }
          .item-content {
            padding-left: .6rem;
            .name {
              font-size: .7rem;
              line-height: 1rem;
            }
            .star, .name {
              margin-bottom: .2rem;
            }
            .star, .dec {
              font-size: .5em;
              color: #999999;
              line-height: .7rem;
            }
          }
        }
      }
      .goods-list {
        padding: 0 .6rem;
        .item {
          &:last-child {
            .border-none()
          }
          .border-1px(#e5e5e5);
          display: flex;
          padding-bottom: .4rem;
          padding-top: .6rem;
          .item-img {
            width: 4rem;
            flex: 0 0 4rem;
            height: 4rem;
            & > img {
              width: 100%;
              height: 100%;
            }
          }
          .item-content {
            padding-left: .6rem;
            flex: 1;
            position: relative;
            .name {
              font-size: 12px;
              line-height: .85rem;
              margin-bottom: .1rem;
            }
            .sales, .spec, .seller {
              font-size: .5rem;
              color: #999999;
              margin-bottom: .1rem;
              line-height: .7rem;
            }
            .price {
              margin-top: .2rem;
              color: #FF3C00;
              font-size: .8rem;
              line-height: 1.1rem;
            }
            .selectIcon {
              position: absolute;
              right: 0;
              bottom: .1rem;
              width: 1.3rem;
              height: 1.3rem;
              background: url("../../common/img/productIndex/shopping_ic.png") no-repeat center;
              background-size: contain;
            }
            .selectGood {
              position: absolute;
              right: 0;
              bottom: .1rem;
              width: 2.7rem;
              line-height: 1.1rem;
              color: #FFFFFF;
              background-color: #FFBD52;
              height: 1.1rem;
              border-radius: 5rem;
              font-size: .6rem;
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>
