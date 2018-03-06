/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：商品详情
*/
<template>
  <transition name="slide">
    <div class="good-details">
      <i class="back"></i>
      <div class="content">
        <scroll>
          <div>
            <slide>
              <div v-for="(item,index) in demo03_list" :key="index">
                <a :href="item.url">
                  <img :src="item.img">
                </a>
              </div>
            </slide>
            <div class="details">
              <div class="name">越南进口红心火龙果 2个装 大果 单果约450~500g 新鲜水果</div>
              <div class="price">
                <span class="current">¥388</span>
                <del>¥500</del>
              </div>
              <div class="place border-1px"><span>已售390件</span><span>产地：新西兰</span></div>
              <div class="spec border-1px">规格
                <span class="spec-item" :class="{'active':specType===0}" @click="selectSpec(0)">约0.5斤/份</span>
                <span class="spec-item" :class="{'active':specType===1}" @click="selectSpec(1)">约1斤/份</span></div>
              <div class="attr">属性
                <span class="attr-item" :class="{'active':attrType===0}" @click="selectAtrr(0)">切片</span>
                <span class="attr-item" :class="{'active':attrType===1}" @click="selectAtrr(1)">不切片</span>
              </div>
            </div>
            <div class="tab border-1px">
              <div class="tab-item" :class="{'active':type===0}" @click="getCurrent(0)"><span>商品介绍</span></div>
              <div class="tab-item" :class="{'active':type===1}" @click="getCurrent(1)"><span>好评率98%</span></div>
            </div>
            <div class="tab-container" v-show="type===0">
              <div class="img-wrapper">
                <img v-lazy="imgUrl"/>
                <img v-lazy="imgUrl"/>
                <img v-lazy="imgUrl"/>
                <img v-lazy="imgUrl"/>
                <img v-lazy="imgUrl"/>
                <img v-lazy="imgUrl"/>
                <img v-lazy="imgUrl"/>
              </div>
            </div>
            <div class="tab-container" v-show="type===1">
              <ul class="list">
                <li class="item border-1px">
                  <div class="item-img"></div>
                  <div class="item-content">
                    <div class="name">小树懒</div>
                    <div class="date">2017.04.30</div>
                  </div>
                  <i class="icon-status"></i>
                </li>
                <li class="item border-1px">
                  <div class="item-img"></div>
                  <div class="item-content">
                    <div class="name">小树懒</div>
                    <div class="date">2017.04.30</div>
                  </div>
                  <i class="icon-status active"></i>
                </li>
              </ul>
              <!--<div class="no-result">近期暂无评价</div>-->
            </div>
          </div>
        </scroll>
      </div>
      <div class="shop-wrapper">
        <div class="shopcart border-top-1px">
          <div class="seller">
            <i class="icon-seller"></i>
            <div class="text">店铺</div>
          </div>
          <div class="cart">
            <i class="icon-cart">
              <div class="badge">2</div>
            </i>
            <div class="text">购物车</div>
          </div>
          <div class="add-cart" @click="addCart">加入购物车</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import Slide from '@/components/slide/slide'
  import Scroll from '@/components/scroll/scroll'

  const baseList = [{
    url: 'javascript:',
    img: 'https://static.vux.li/demo/1.jpg',
    title: '送你一朵fua'
  }, {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/2.jpg',
    title: '送你一辆车'
  }, {
    url: '/activity/11',
    img: 'https://static.vux.li/demo/3.jpg',
    title: '送你一次旅行',
    fallbackImg: require('../../assets/logo.png')
  }]

  export default {
    data() {
      return {
        demo03_list: baseList,
        type: 1,
        specType: 0,
        attrType: 0,
        imgUrl: require('../../assets/logo.png')
      }
    },
    components: {
      Slide,
      Scroll
    },
    methods: {
      addCart() {
        console.log("addCart");
      },
      getCurrent(type) {
        this.type = type
      },
      selectSpec(type) {
        this.specType = type
      },
      selectAtrr(type) {
        this.attrType = type
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
