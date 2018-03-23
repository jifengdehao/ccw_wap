/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：定位后的首页
*/
<template>
  <div class="index">
    <top-bar @closeTopBar="closeTopBar"></top-bar>
    <div class="header">
      <div class="content">
        <router-link to="/address" tag="i" class="icon-location"></router-link>
        <div class="select-market" @click.stop="showMarketSelect" v-if="market">{{market.marketName}}</div>
        <router-link to="/search" class="icon-search" tag="i"></router-link>
      </div>
    </div>
    <div class="select-bar" v-if="marketList.length>0" v-show="isShowMarketSelect">
      <div class="mask" @click="isShowMarketSelect = !isShowMarketSelect"></div>
      <div class="list-wrapper" ref="selectBarList">
        <ul class="list">
          <li class="item border-1px" v-for="(item,index) in marketList" @click="selectMarket(item)" :key="index">
            {{item.marketName}}
          </li>
        </ul>
      </div>
    </div>
    <div class="tab" v-if="menuList.length>0">
      <div ref="tabScroll" class="tab-wrapper">
        <ul class="tab-list" ref="tabList">
          <li class="tab-item" v-for="(item,index) in menuList" :key="index">
            <span @click="selectType(item.businessType)" :class="{active:menuTypeActive===item.businessType}">{{item.businessTypeName}}</span>
          </li>
        </ul>
      </div>
      <div class="icon-wrapper" @click="isShowClassify=!isShowClassify">
        <i class="icon-menu"></i>
      </div>
    </div>
    <div class="classify" v-show="isShowClassify" v-if="menuList.length>0">
      <div class="content">
        <div class="title border-1px">全部品类</div>
        <i class="icon-close" @click="isShowClassify=!isShowClassify"></i>
        <ul class="list clearfix">
          <li class="item" v-for="(item,index) in menuList" @click="selectType(item.businessType)" :key="index">
            <img :src="item.iconUrl"/>
            <p>{{item.businessTypeName}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="tab-container" ref="tabContainer">
      <loading v-if="!sellerList.length>0"></loading>
      <scroll ref="scroll" :data="sellerList" v-else>
        <div>
          <slide :showDot="false">
            <div v-for="(item,index) in swiperList" :key="index">
              <a :href="item.linkUrl">
                <img @load="loadImage" :src="item.picUrl" class="needsclick"/>
              </a>
            </div>
          </slide>
          <div class="seller">
            <div class="title"></div>
            <ul class="seller-list" v-if="sellerList.length>0">
              <router-link :to="{path: '/shopProduct/' + item.msShopId}"
                           tag="li"
                           class="item border-1px"
                           v-for="(item,index) in sellerList"
                           :key="index">
                <div class="item-img">
                  <i class="status" v-if="item.businessStatus===2"></i>
                  <i class="seller-close" v-if="item.businessStatus===3">档口关店中</i>
                  <img v-lazy="item.headUrl"/>
                </div>
                <div class="item-content">
                  <div class="name">
                    <span class="recommend">{{item.shopName}}</span>
                    <span class="love">{{item.focus}}</span>
                  </div>
                  <div class="star">
                    <rater :active-color="starColor"
                           :fontSize="starFontSize"
                           :disabled="starDisabled"
                           v-model="item.starLevel"></rater>
                    <span class="num">月售&nbsp;{{item.monthSale}}</span>
                  </div>
                  <div class="dec">{{item.shopDesc}}</div>
                </div>
              </router-link>
            </ul>
          </div>
        </div>
      </scroll>
    </div>
    <m-footer></m-footer>
    <coupon></coupon>
  </div>
</template>
<script type="text/ecmascript-6">
  import Scroll from '@/components/scroll/scroll'
  import mFooter from '@/components/footer/menuBar'
  import Slide from '@/components/slide/slide'
  import loading from '@/components/loading/loading'
  import Coupon from '@/page/index/coupon'
  import TopBar from '@/page/index/topBar'
  import BScroll from 'better-scroll'
  import {Rater} from 'vux'
  import {mapGetters, mapMutations} from 'vuex'
  import * as api from '@/api/http'

  export default {
    data() {
      return {
        starDisabled: false, // 星星不允许点击
        starColor: '#FFBD52', // 星星颜色
        starFontSize: 12,   // 星星大小
        isShowClassify: false, // 是否显示种类下拉
        isShowMarketSelect: false, // 是否显示菜市场下拉
        swiperList: [],// 轮播图
        sellerList: [], // 档口列表
        marketList: [],  // 菜市场列表
        menuList: []  // 菜单列表
      }
    },
    components: {
      Scroll,
      mFooter,
      Slide,
      Rater,
      loading,
      Coupon,
      TopBar
    },
    computed: {
      ...mapGetters([
        'location',
        'market'
      ])
    },
    created() {
      if (sessionStorage.getItem('isShowSelectMarket') === '1') {
        this.getNearMarkets()
      } else if (this.market) {
        this.getSeller(this.market)
        this.getBanner()
      }
    },
    watch: {
      'menuList'() {
        this.$nextTick(() => {
          this.initTabScroll()
        })
      }
    },
    methods: {
      // 关闭topBar
      closeTopBar() {
        this.$refs.tabContainer.style.top = 4.1 + 'rem'
        this.$refs.selectBarList.style.top = 2.2 + 'rem'
      },
      initTabScroll() {
        if (this.$refs.tabList) {
          this.tabGroup = this.$refs.tabList
          this.children = this.tabGroup.children
          let width = 0
          for (let i = 0; i < this.children.length; i++) {
            width += this.children[i].clientWidth
          }
          this.$refs.tabList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.tabScroll) {
              this.tabScroll = new BScroll(this.$refs.tabScroll, {
                scrollX: true,
                eventPassthrough: 'vertical',
                click: true
              });
            } else {
              this.tabScroll.refresh()
            }
          })
        }
      },
      // 获取轮播图
      getBanner() {
        const type = 0
        api.getBanner(type).then((res) => {
          if (res.code === 200 && res.data.length > 0) {
            this.swiperList = res.data
          }
        })
      },
      // 加载图片
      loadImage() {
        if (!this.checkImg) {         /* 加载完一张图片时不再执行 */
          this.checkImg = true
          this.$refs.scroll.refresh()
        }
      },
      // 获取首页分类档口
      getSeller(market) {
        if (market) {
          api.getIndexStore(market.marketId).then((res) => {
            if (res.code === 200 && res.data.length > 0) {
              this.menuList = res.data
              this.menuTypeActive = res.data[0].businessType
              this.sellerList = res.data[0].catShops
            }
          })
        }
      },
      // 获取附近菜市场 在配送范围内
      getNearMarkets() {
        let params = {
          longitude: this.location.position.lng,
          latitude: this.location.position.lat
        };
        api.getNearMarkets(params).then((res) => {
          if (res.code === 200 && res.data.length > 0) {
            this.market = res.data[0]
            this.marketList = res.data
            this.setMarket(res.data[0])
            this.getSeller(res.data[0])
            this.getBanner()
            this.getSeller()
          }
        })
      },
      // 选择菜市场
      selectMarket(item) {
        this.setMarket(item)
        this.sellerList = []
        this.menuList = []
        this.market = item
        this.isShowMarketSelect = false
        this.getSeller(item)
      },
      // 选择分类
      selectType(type) {
        this.menuTypeActive = type
        this.isShowClassify = false
        this.menuList.forEach((item) => {
          if (item.businessType === type) {
            this.sellerList = item.catShops
          }
        })
      },
      // 显示下拉菜市场选择
      showMarketSelect() {
        if (this.marketList.length > 0) {
          this.isShowMarketSelect = true
        } else {
          this.isShowMarketSelect = false
        }
      },
      // vuex 设置新的菜市场
      ...mapMutations({
        setMarket: 'SET_MARKET'
      })
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import "../../common/css/mixin";

  .index {
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    overflow: hidden;
    .select-bar {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      z-index: 999;
      overflow: hidden;
      .mask {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .6);
      }
      .list-wrapper {
        position: absolute;
        z-index: 1000;
        top: 4.2rem;
        left: 50%;
        transform: translate(-50%);
        &:before {
          display: block;
          position: absolute;
          top: -.3rem;
          right: 1.2rem;
          content: '';
          width: 0;
          height: 0;
          border-left: .3rem solid transparent;
          border-right: .3rem solid transparent;
          border-bottom: .3rem solid #FFFFFF;
          z-index: 1001;
        }
      }
      .list {
        height: 6.5rem;
        overflow: scroll;
        background-color: #FFFFFF;
        padding: .3rem .6rem 0 .6rem;
        min-width: 8.6rem;
        border-radius: .2rem;
        box-sizing: border-box;
        .item {
          height: 2rem;
          line-height: 2rem;
          .border-1px();
          font-size: .7rem;
          color: #666666;
          text-align: center;
          border-radius: .2rem;
          &:last-child {
            .border-none();
          }
        }
      }
    }
    .header {
      overflow: hidden;
      background-color: #FFFFFF;
      .content {
        position: relative;
        height: 2.2rem;
        padding: 0 .6rem;
        line-height: 2.2rem;
        font-size: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon-location {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          background: url("../../common/img/home/home_location_ic.png") no-repeat center;
          background-size: contain;
        }
        .icon-search {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          background: url("../../common/img/index/home_search_ic.png") no-repeat center;
          background-size: contain;
        }
        .select-market {
          border-radius: 5rem;
          height: 1.3rem;
          line-height: 1.3rem;
          text-align: center;
          padding: 0 .9rem 0 .6rem;
          font-size: .7rem;
          color: #666666;
          background: #F4F4F4 url("../../common/img/index/home_down_ic.png") no-repeat 95% center;
          background-size: .4rem .25rem;
        }
      }
    }
    .tab {
      height: 1.9rem;
      line-height: 1.9rem;
      padding: 0 1.9rem 0 .6rem;
      position: relative;
      .tab-wrapper {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        .tab-list {
          font-size: 0;
          .tab-item {
            font-size: .7rem;
            display: inline-block;
            padding-right: 1rem;
            box-sizing: border-box;
            &:last-child {
              padding: 0;
            }
            .active {
              color: #FFBD52;
              border-bottom: 2px solid #FFBD52;
              padding-bottom: .4rem;
            }
          }
        }
      }
      .icon-wrapper {
        position: absolute;
        right: 0;
        top: 0;
        width: 1.5rem;
        height: 1.9rem;
        .icon-menu {
          display: inline-block;
          background: url("../../common/img/index/home_classify_ic.png") no-repeat center;
          width: .8rem;
          height: .8rem;
          background-size: contain;
        }
      }
    }
    .classify {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 2.2rem;
      z-index: 999;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.35);
      .content {
        z-index: 1000;
        background-color: #FFFFFF;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        .title {
          height: 2.2rem;
          line-height: 2.2rem;
          text-align: center;
          font-size: .8rem;
          .border-1px();
        }
        .icon-close {
          background: url("../../common/img/index/home_clean_btn.png") no-repeat center;
          display: inline-block;
          width: .8rem;
          height: .8rem;
          background-size: contain;
          position: absolute;
          right: .6rem;
          top: .6rem;
        }
        .list {
          .item {
            width: 33.33%;
            float: left;
            padding: .8rem;
            box-sizing: border-box;
            text-align: center;
            & > img {
              width: 2.5rem;
              height: 2.5rem;
            }
            & > p {
              margin-top: .35rem;
              font-size: .6rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
    .tab-container {
      position: absolute;
      top: 6.3rem;
      left: 0;
      right: 0;
      bottom: 2.5rem;
      overflow: hidden;
      .slider-wrapper {
        height: 8rem;
      }
    }
    .seller-list {
      padding: 0 .6rem;
      .item {
        display: flex;
        padding: .6rem 0;
        .border-1px();
        &:last-child {
          .border-none();
        }
        .item-img {
          width: 6.35rem;
          height: 4.4rem;
          flex: 0 0 6.35rem;
          position: relative;
          border-radius: .1rem;
          .seller-close {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            background: rgba(0, 0, 0, 0.35) url("../../common/img/index/home_close_ic.png") no-repeat center .7rem;
            background-size: 1.8rem 1.8rem;
            color: #FFFFFF;
            text-align: center;
            padding-top: 3rem;
            font-size: .8rem;
            font-style: normal;
          }
          .status {
            position: absolute;
            left: 0;
            top: 0;
            width: 1.8rem;
            height: 1.8rem;
            background: url("../../common/img/index/tab_rest_ic.png") no-repeat;
            background-size: contain;
          }
          & > img {
            width: 100%;
            height: 100%;
          }
        }
        .item-content {
          flex: 1;
          padding-left: .6rem;
          .name {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .recommend {
              padding-right: 1.7rem;
              background: url("../../common/img/index/home_recommend_ic.png") no-repeat right center;
              background-size: 1.4rem .7rem;
              font-size: .7rem;
              line-height: .8rem;
            }
            .love {
              font-size: .6rem;
              color: #999999;
              background: url("../../common/img/index/home_follow_ic.png") no-repeat left center;
              background-size: .6rem .6rem;
              padding-left: .6rem;
              float: right;
              line-height: .8rem;
            }
          }
          .star {
            font-size: .6rem;
            margin: .6rem 0;
            color: #999999;
            line-height: .6rem;
            .num {
              margin-left: .4rem;
            }
          }
          .dec {
            color: #999999;
            font-size: .55rem;
            line-height: .8rem;
          }
        }
      }
    }
    .seller {
      .title {
        width: 6rem;
        height: 1.5rem;
        margin: .8rem auto;
        background: url("../../common/img/index/home_chosen_ic.png") no-repeat center;
        background-size: contain;
      }
    }
  }
</style>
