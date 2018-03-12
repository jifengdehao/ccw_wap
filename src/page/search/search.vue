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
          <i class="clear" v-show="search" @click.stop="clearSearch"></i>
        </div>
        <button type="button" class="btn-search" @click="submit">搜索</button>
      </div>
      <div class="tab border-1px">
        <div class="tab-item" :class="{active:status === 2}" @click="selectStatus(2)">
          <span>商品</span>
        </div>
        <div class="tab-item" :class="{active:status === 1}" @click="selectStatus(1)">
          <span>档口</span>
        </div>
      </div>
      <div class="tab-content" v-show="status===2">
        <div class="mescroll" id="mescroll_1" ref="mescroll_1">
          <template v-if="goods.length>0">
            <div class="tab-content-tab border-1px">
              <div class="tab-item" :class="{'active':rankFlag==='default'}" @click="selectType('default')">综合排序
                <span class="icon-default" @click.stop="selectSort(1,'default')" v-if="defaultOrder === 0"></span>
                <span class="icon-active" @click.stop="selectSort(0,'default')" v-else></span>
              </div>
              <div class="tab-item" :class="{'active':rankFlag==='price'}" @click="selectType('price')">价格
                <span class="icon-default" @click.stop="selectSort(1,'price')" v-if="priceOrder === 0"></span>
                <span class="icon-active" @click.stop="selectSort(0,'price')" v-else></span>
              </div>
              <div class="tab-item" :class="{'active':rankFlag==='monthSale'}" @click="selectType('monthSale')">销量</div>
              <div class="tab-item" :class="{'active':rankFlag==='goodRate'}" @click="selectType('goodRate')">评价</div>
            </div>
            <show-cart></show-cart>
            <ul class="goods-list">
              <li class="item border-1px" v-for="(item,index) in goods" :key="index">
                <router-link tag="div" :to="/goods/+item.productId">
                  <div class="item-img">
                    <img v-lazy="item.proImgUrl">
                  </div>
                  <div class="item-content">
                    <div class="name">{{item.productName}}</div>
                    <div class="sales">月销量{{item.monthSalesAmount}}&nbsp;&nbsp;|&nbsp;&nbsp;好评率{{item.goodRemarkRate *
                      100}}%
                    </div>
                    <div class="spec">{{item.items | filterSpec}}</div>
                    <div class="seller">{{item.shopName}}</div>
                    <div class="price">¥{{item.items | filterPrice}}</div>
                  </div>
                </router-link>
                <div class="selectGood" v-if="item.items.length>1" @click="openSpec(item)">多规格</div>
                <div class="selectIcon" v-else @click="addCart(item)"></div>
              </li>
            </ul>
          </template>
          <template v-else>
            <no-search-result :title="noSearchGoodResultTitle"
                              :data="hotSearchTag"
                              @selectTag="selectTag"></no-search-result>
          </template>
        </div>
      </div>
      <div class="tab-content" v-show="status===1">
        <div class="mescroll" id="mescroll_2" ref="mescroll_2">
          <template v-if="sellers.length>0">
            <div class="tab-content-tab border-1px">
              <div class="tab-item" :class="{'active':rankFlag==='default'}" @click="selectType('default')">综合排序
                <span class="icon-default" @click.stop="selectSort(1)" v-if="order === 0"></span>
                <span class="icon-active" @click.stop="selectSort(0)" v-else></span>
              </div>
              <div class="tab-item" :class="{'active':rankFlag==='monthSale'}" @click="selectType('monthSale')">销量</div>
              <div class="tab-item" :class="{'active':rankFlag==='focus'}" @click="selectType('focus')">关注</div>
              <div class="tab-item" :class="{'active':rankFlag==='goodRate'}" @click="selectType('goodRate')">评价</div>
            </div>
            <ul class="sellers-list">
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
          </template>
          <template v-else>
            <no-search-result :title="noSearchSellerResultTitle"
                              :data="hotSearchTag"
                              @selectTag="selectTag"></no-search-result>
          </template>
        </div>
      </div>
      <div class="dialog" v-if="isShowDialog">
        <div class="mask" @click="isShowDialog=false"></div>
        <div class="dialog-content">
          <div v-if="spec.length>0">
            <div class="title">规格：</div>
            <ul class="list">
              <li class="item"
                  v-for="(item,index) in spec" :key="index"
                  @click="selectSpec(item,index)"
                  :class="{'active':specType === index}">{{item.names}}
              </li>
            </ul>
          </div>
          <div v-if="attr.length>0">
            <div class="title">属性：</div>
            <ul class="list">
              <li class="item"
                  v-for="(item,index) in spec" :key="index"
                  @click="selectAttr(item,index)"
                  :class="{'active':specType === index}">{{item.names}}
              </li>
            </ul>
          </div>
          <button type="button" class="btn-confirm" @click="hideDialog">确定¥{{price}}</button>
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
  import noSearchResult from '@/components/no-search-result/no-search-result'
  import Vue from 'vue'

  export default {
    data() {
      return {
        search: '',// 搜索字
        rankFlag: 'default',// 排序标记,default默认,price 价格,monthSale 月销量,goodRate 好评
        order: 0, // 升序降序,0降序 1升序
        defaultOrder: 0,// 默认的排序
        priceOrder: 0, // 价格的排序
        status: 2, // 切换商品和商铺 1是档口 2是商品
        goods: [], // 商品列表
        sellers: [], // 商铺列表
        starColor: '#FFBD52', // 星星颜色
        starDisabled: true,  // 不允许选星
        starFontSize: 10,   // 星星大小
        isShowDialog: false,  // 弹窗
        spec: [],  // 商品的规格组
        attr: [], // 商品的属性组
        currentSpec: {}, // 当前的选中商品的规格
        currentAttr: {},// 当前的选中商品属性
        specType: 0,  // 默认当前规格
        attrType: 0,  // 默认当前属性
        noSearchGoodResultTitle: '抱歉，未能找到您搜索的商品',
        noSearchSellerResultTitle: '抱歉，未能找到您搜索的档口',
        hotSearchTag: [], // 搜索关键字
        price: '', // 当前选中商品价格
      }
    },
    computed: {
      ...mapGetters([
        'market'
      ])
    },
    filters: {
      filterSpec: function (value) {
        if (!value) return ''
        return value[0].names
      },
      filterPrice: function (value) {
        if (!value) return ''
        return value[0].curPrice / 100
      }
    },
    created() {
      this.getHotSearchTag()
    },
    mounted() {
      this.mescroll_1 = new MeScroll("mescroll_1", {
        down: {
          auto: false
        },
        up: {
          isBounce: false,
          auto: false,
          callback: this.mescroll_1_upCallback
        }
      })
      this.mescroll_2 = new MeScroll("mescroll_2", {
        down: {
          auto: false
        },
        up: {
          isBounce: false,
          auto: false,
          callback: this.mescroll_2_upCallback
        }
      })
    },
    methods: {
      // 搜索关键字
      selectTag(item) {
        console.log(item)
        this.search = item.tagName
        this.submit()
      },
      // 选规格
      selectSpec(item, index) {
        this.specType = index
        this.currentSpec = item
        this.price = item.curPrice / 100
      },
      // 选属性
      selectAttr(item, index) {
        this.attrType = index
        this.currentAttr = item
      },
      // 打开规格选择
      openSpec(item) {
        console.log(item)
        this.isShowDialog = true
        this.spec = item.items
        this.attr = item.attrs
        this.price = item.items[0].curPrice / 100
      },
      // 关闭弹窗
      hideDialog() {
        this.isShowDialog = false
      },
      mescroll_2_upCallback(page) {
        let params = {
          pageNum: page.num,
          pageSize: page.size,
          order: this.order,
          rankFlag: this.rankFlag,
          queryString: this.search
        }
        if (params.queryString) {
          api.getSearchNearSeller(this.market.marketId, params).then((res) => {
            if (res.code === 200) {
              if (page.num === 1) {
                this.sellers = res.data.records
                this.mescroll_2.endByPage(res.data.records.length, res.data.pages)
              } else {
                this.sellers = this.sellers.concat(res.data.records)
                this.mescroll_2.endByPage(res.data.records.length, res.data.pages)
              }
            }
          })
        } else {
          this.mescroll_1.endErr();
        }
      },
      mescroll_1_upCallback: function (page) {
        let params = {
          pageNum: page.num,
          pageSize: page.size,
          order: this.order,
          rankFlag: this.rankFlag,
          queryString: this.search
        }
        if (params.queryString) {
          api.getSearchNearProduct(this.market.marketId, params).then((res) => {
            if (res.code === 200) {
              if (page.num === 1) {
                this.goods = res.data.records
                this.mescroll_1.endByPage(res.data.records.length, res.data.pages)
              } else {
                this.goods = this.goods.concat(res.data.records)
                this.mescroll_1.endByPage(res.data.records.length, res.data.pages)
              }
            }
          })
        } else {
          this.mescroll_1.endErr();
        }
      },
      // 添加购物车
      addCart(item) {
        console.log(item)
      },
      // 切换
      selectStatus(type) {
        this.status = type
        this.order = 0
        this.getHotSearchTag()
      },
      // 搜索
      submit() {
        if (this.search) {
          if (this.status === 2) {
            this.mescroll_1.resetUpScroll(); //重新搜索,重置列表数据
          } else {
            this.mescroll_2.resetUpScroll(); //重新搜索,重置列表数据
          }
        }
      },
      // 清除搜索条件
      clearSearch() {
        this.search = ''
      },
      // 返回上一级
      back() {
        this.$router.back()
      },
      // 排序
      selectType(type) {
        this.rankFlag = type
        this.order = 0
        this.defaultOrder = 0
        this.priceOrder = 0
        this.submit()
      },
      // 升序和降序
      selectSort(sort, type) {
        if (type === 'default' && this.rankFlag === 'default') {
          this.order = sort
          this.defaultOrder = sort
        } else if (type === 'price' && this.rankFlag === 'price') {
          this.order = sort
          this.priceOrder = sort
        } else {
          this.order = sort
        }
        this.submit()
      },
      // 获取搜索关键字
      getHotSearchTag() {
        let params = {
          type: this.status
        }
        api.getHotSearchTag(params).then((res) => {
          if (res.code === 200) {
            console.log(res.data)
            this.hotSearchTag = res.data
          }
        })
      }
    },
    components: {
      Rater,
      showCart,
      noSearchResult
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
      .tab-content-tab {
        height: 2rem;
        line-height: 2rem;
        display: flex;
        background: #FAFAFA;
        .border-1px();
        .tab-item {
          flex: 1;
          color: #999999;
          font-size: .6rem;
          text-align: center;
          .icon-default {
            display: inline-block;
            width: 12px;
            height: 6px;
            background: url("../../common/img/common/up_ic.png") no-repeat center;
            background-size: 6px 3px;
          }
          .icon-active {
            display: inline-block;
            width: 12px;
            height: 6px;
            background: url("../../common/img/common/down_sel_ic.png") no-repeat center;
            background-size: 6px 3px;
          }
        }
        .active {
          color: #333333;
        }
      }
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
          padding-bottom: .4rem;
          padding-top: .6rem;
          position: relative;
          & > div {
            display: flex;
          }
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
          }
          .selectIcon {
            position: absolute;
            right: 0;
            bottom: .4rem;
            width: 1.3rem;
            height: 1.3rem;
            background: url("../../common/img/productIndex/shopping_ic.png") no-repeat center;
            background-size: contain;
          }
          .selectGood {
            position: absolute;
            right: 0;
            bottom: .4rem;
            color: #FFFFFF;
            background-color: #FFBD52;
            padding: .25rem .4rem;
            border-radius: 5rem;
            font-size: .6rem;
          }
        }
      }
    }
    .dialog {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      z-index: 1999;
      display: flex;
      align-items: center;
      justify-content: center;
      .mask {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #000000;
        opacity: .6;
      }
      .dialog-content {
        position: fixed;
        width: 70%;
        background-color: #FFFFFF;
        z-index: 1200;
        border-radius: 4px;
        padding: .6rem;
        box-sizing: border-box;
        .title {
          font-size: .7rem;
          margin-bottom: .5rem;
        }
        .list {
          font-size: 0;
          margin-bottom: .5rem;
          .item {
            font-size: .7rem;
            display: inline-block;
            margin-right: .5rem;
            padding: .2rem .5rem;
            border-radius: 5rem;
            color: #999999;
            border: 0.5px solid #e5e5e5;
          }
          .active {
            color: #fff;
            background-color: #ffbf51;
            border: none;
          }
        }
        .btn-confirm {
          display: block;
          width: 100%;
          height: 1.7rem;
          color: #fff;
          font-size: .7rem;
          background-color: #ffbf51;
          margin-top: 1rem;
          border-radius: 5rem;
        }
      }
    }
  }
</style>
