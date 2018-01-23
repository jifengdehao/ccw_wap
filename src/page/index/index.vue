/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：定位后的首页
*/
<template>
  <div class="index">
    <div class="header">
      <div class="content">
        <i class="icon-location"></i>
        <span class="text">清河小区清河小区清河小区清河小区</span>
        <div class="search-content">
          <input type="text" class="search" placeholder="附近的商家"/>
        </div>
        <i class="icon-msg">消息</i>
      </div>
    </div>
    <div class="tab">
      <div ref="tabScroll" class="tab-wrapper">
        <ul class="tab-list" ref="tabList">
          <li class="tab-item"><span :class="{'active':Type===0}" @click="selectType(0)">新鲜水果</span></li>
          <li class="tab-item"><span :class="{'active':Type===1}" @click="selectType(1)">蔬菜蛋类</span></li>
          <li class="tab-item"><span :class="{'active':Type===2}" @click="selectType(2)">禽兽肉类</span></li>
          <li class="tab-item"><span :class="{'active':Type===3}" @click="selectType(3)">水产海鲜</span></li>
          <li class="tab-item"><span :class="{'active':Type===4}" @click="selectType(4)">水产海鲜</span></li>
          <li class="tab-item"><span :class="{'active':Type===5}" @click="selectType(5)">水产海鲜</span></li>
          <li class="tab-item"><span :class="{'active':Type===6}" @click="selectType(6)">水产海鲜</span></li>
          <li class="tab-item"><span :class="{'active':Type===7}" @click="selectType(7)">水产海鲜</span></li>
        </ul>
      </div>
      <i class="icon-menu" @click="openClassify"></i>
    </div>
    <div class="tab-container">
      <scroll>
        <div>
          <slide :showDot="false">
            <div v-for="(item,index) in demo03_list" :key="item.id">
              <a :href="item.url">
                <img :src="item.img">
              </a>
            </div>
          </slide>
          <!--<div class="market">-->
          <!--<div class="title" @click="showMarket = !showMarket">-->
          <!--<span>清河菜市场</span><span class="options">切换</span>-->
          <!--</div>-->
          <!--<ul class="list" v-show="showMarket">-->
          <!--<li class="item border-top-1px">清河菜市场1</li>-->
          <!--<li class="item border-top-1px">清河菜市场2</li>-->
          <!--<li class="item border-top-1px">清河菜市场3</li>-->
          <!--</ul>-->
          <!--</div>-->
          <div class="seller">
            <div class="title"></div>
            <ul class="store-list">
              <li class="item border-1px">
                <div class="item-img">
                  <i class="status"></i>
                  <img src="../../assets/logo.png" alt="">
                </div>
                <div class="item-content">
                  <div class="name">
                    <span class="recommend">清河鲜果1号店</span>
                    <span class="love">1000</span>
                  </div>
                  <div class="star">
                    <rater :active-color="starColor"
                           :fontSize="starFontSize"
                           :disabled="starDisabled"
                           v-model="star"></rater>
                    <span class="num">月售&nbsp;1000</span>
                  </div>
                  <div class="dec">本店自2017年6月开始，开店时间延至7点半，欢迎新老客户下单！</div>
                </div>
              </li>
              <li class="item border-1px">
                <div class="item-img">
                  <i class="seller-close"></i>
                  <img src="../../assets/logo.png" alt="">
                </div>
                <div class="item-content">
                  <div class="name">
                    <span class="recommend">清河鲜果1号店</span>
                    <span class="love">1000</span>
                  </div>
                  <div class="star">
                    <rater :active-color="starColor"
                           :fontSize="starFontSize"
                           :disabled="starDisabled"
                           v-model="star"></rater>
                    <span class="num">月售&nbsp;1000</span>
                  </div>
                  <div class="dec">本店自2017年6月开始，开店时间延至7点半，欢迎新老客户下单！</div>
                </div>
              </li>
              <li class="item border-1px">
                <div class="item-img">
                  <img src="../../assets/logo.png" alt="">
                </div>
                <div class="item-content">
                  <div class="name">
                    <span class="recommend">清河鲜果1号店</span>
                    <span class="love">1000</span>
                  </div>
                  <div class="star">
                    <rater :active-color="starColor"
                           :fontSize="starFontSize"
                           :disabled="starDisabled"
                           v-model="star"></rater>
                    <span class="num">月售&nbsp;1000</span>
                  </div>
                  <div class="dec">本店自2017年6月开始，开店时间延至7点半，欢迎新老客户下单！</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </scroll>
    </div>
    <div class="classify" v-show="isShowClassify">
      <div class="mask"></div>
      <div class="content">
        <div class="title border-1px">全部品类</div>
        <i class="icon-close" @click="closeClassify"></i>
        <ul class="list clearfix">
          <li class="item">
            <img src="../../common/img/index/home_fruit@2x.png" alt=""/>
            <p>新鲜水果</p>
          </li>
          <li class="item">
            <img src="../../common/img/index/home_fruit@2x.png" alt=""/>
            <p>新鲜水果</p>
          </li>
          <li class="item">
            <img src="../../common/img/index/home_fruit@2x.png" alt=""/>
            <p>新鲜水果</p>
          </li>
          <li class="item">
            <img src="../../common/img/index/home_fruit@2x.png" alt=""/>
            <p>新鲜水果</p>
          </li>
          <li class="item">
            <img src="../../common/img/index/home_fruit@2x.png" alt=""/>
            <p>新鲜水果</p>
          </li>
          <li class="item">
            <img src="../../common/img/index/home_fruit@2x.png" alt=""/>
            <p>新鲜水果</p>
          </li>
          <li class="item">
            <img src="../../common/img/index/home_fruit@2x.png" alt=""/>
            <p>新鲜水果</p>
          </li>
        </ul>
      </div>
    </div>
    <m-footer></m-footer>
  </div>
</template>
<script type="text/ecmascript-6">
  import Scroll from '@/components/scroll/scroll';
  import mFooter from '@/components/footer/menuBar';
  import Slide from '@/components/slide/slide';
  import BScroll from 'better-scroll';
  import {Rater} from 'vux';
  import {mapGetters} from 'vuex';
  import * as api from '@/api/http'

  const baseList = [{
    id: 0,
    url: 'javascript:',
    img: 'https://static.vux.li/demo/1.jpg',
    title: '送你一朵fua'
  }, {
    id: 1,
    url: 'javascript:',
    img: 'https://static.vux.li/demo/2.jpg',
    title: '送你一辆车'
  }, {
    id: 2,
    url: '/activity/11',
    img: 'https://static.vux.li/demo/3.jpg',
    title: '送你一次旅行',
    fallbackImg: require('../../assets/logo.png')
  }]

  export default {
    data() {
      return {
        demo03_list: baseList,
        showMarket: false,
        starDisabled: false,
        starColor: '#FFBD52',
        starFontSize: 12,
        star: 4,
        Type: 0,
        isShowClassify: false,
        swiperList: []
      }
    },
    components: {
      Scroll,
      mFooter,
      Slide,
      Rater
    },
    computed: {
      ...mapGetters([
        'location',
        'market'
      ])
    },
    created() {
      this.getBanner(0);
    },
    mounted() {
      this.$nextTick(() => {
        this._initTabScroll();
      });
    },
    methods: {
      _initTabScroll() {
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
      },
      selectType(type) {
        this.Type = type
      },
      closeClassify() {
        this.isShowClassify = false
      },
      openClassify() {
        this.isShowClassify = true
      },
      // 获取轮播图
      getBanner(type) {
        api.getBanner(type).then((res) => {
          if (res.data) {
            console.log(res)
            this.swiperList = res.data
          }
        })
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import "../../common/css/mixin";

  .index {
    .header {
      overflow: hidden;
      background-color: #FFFFFF;
      z-index: 10000;
      position: relative;
      .content {
        position: relative;
        height: 2.2rem;
        padding: 0 .6rem;
        line-height: 2.2rem;
        font-size: 0;
        display: flex;
        .icon-location {
          width: 1rem;
          height: 1rem;
          display: inline-block;
          background: url("../../common/img/home/home_location.png") no-repeat center;
          background-size: 1rem 1rem;
          position: absolute;
          left: .6rem;
          top: .6rem;
        }
        .text {
          font-size: .8rem;
          color: #999999;
          display: inline-block;
          background: url("../../common/img/home/home_drop_down.png") no-repeat right center;
          background-size: .5rem 0.25rem;
          padding-left: 1.4rem;
          width: 6rem;
          flex: 0 0 6rem;
          box-sizing: border-box;
          padding-right: .5rem;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .icon-msg {
          display: inline-block;
          width: 1rem;
          height: .95rem;
          background: url("../../common/img/home/home_news.png") no-repeat center;
          background-size: 1rem .95rem;
          position: absolute;
          right: .6rem;
          top: .6rem;
        }
        .search-content {
          flex: auto;
          height: 1.5rem;
          line-height: 1.5rem;
          border-radius: 100px;
          margin: .35rem 1.5rem .35rem .5rem;
          box-sizing: border-box;
          background: #f5f5f5 url("../../common/img/location/search.png") no-repeat .4rem center;
          background-size: .65rem .65rem;
          padding: 0 1.3rem;
          font-size: 0;
          & > input {
            height: 1.5rem;
            width: 100%;
            font-size: .6rem;
            color: #999999;
            background-color: #f5f5f5;
          }
        }
      }
    }
    .tab {
      height: 1.9rem;
      line-height: 1.9rem;
      background: #F4F4F4;
      padding: 0 2rem 0 .6rem;
      position: relative;
      .tab-wrapper {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        .tab-list {
          font-size: 0;
          .tab-item {
            font-size: .8rem;
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
      .icon-menu {
        background: url("../../common/img/index/home_classify_ic.png") no-repeat center;
        width: .8rem;
        height: .8rem;
        background-size: contain;
        position: absolute;
        right: .6rem;
        top: .55rem;
      }
    }
    .tab-container {
      position: absolute;
      top: 4.1rem;
      left: 0;
      right: 0;
      bottom: 2.5rem;
      overflow: hidden;
    }
    .market {
      height: 2.2rem;
      line-height: 2.2rem;
      background: #F4F4F4;
      position: relative;
      padding: 0 .6rem;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .8rem;
        color: #999999;
        .options {
          background: url("../../common/img/home/home_drop_down.png") no-repeat right center;
          background-size: .5rem 0.25rem;
          padding-right: .8rem;
        }
      }
      .list {
        position: absolute;
        top: 2.2rem;
        right: 0;
        left: 0;
        z-index: 20;
        padding: 0 .6rem;
        background: #F4F4F4;
        .item {
          font-size: .8rem;
          color: #999999;
          .border-top-1px();
        }
      }
    }
    .store-list {
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
    .classify {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      z-index: 999;
      overflow: hidden;
      .mask {
        height: 100%;
        width: 100%;
        opacity: 0.35;
        background-color: #000000;
        z-index: 1000;
      }
      .content {
        z-index: 1001;
        background-color: #FFFFFF;
        position: fixed;
        top: 2.2rem;
        left: 0;
        right: 0;
        bottom: 12rem;
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
            }
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
