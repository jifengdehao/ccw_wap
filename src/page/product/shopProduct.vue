/*
 * @Author: huShangJun 
 * @Date: 2018-01-08 09:34:44 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 店铺详情 
 */
<template>
  <div id="shopProduct">
    <!-- 头部大图区域 -->
    <div style="position:absolute;zIndex:1000" >
      <div class="topImg">
        <!-- 返回上一页图标 -->
        <img src="../../common/img/productIndex/shop_bg.png" alt="">
        <i class="goback" @click="goback"></i>
        <div class="shopMessage" @click="goShopInfo">
          <div class="shopMessageLeft">
            <img src="../../common/img/productIndex/3.jpg" alt="">
          </div>
          <div class="shopMessageRight">
            <p><span>{{shopName}} </span><i class="showIcon" v-if="showIcon"></i></p>
            <rater v-model="countStar" :font-size="13" disabled></rater>
          </div>
        </div>
      </div>  
    <!-- 公告 -->
      <div class="notic">
        <span>公告：</span>这里是店铺活动布告！满100元减10元，满200元减30元。
      </div>
    </div>
      <!-- 产品列表 -->
      <div class="product">
        <!-- 一级分类 -->
        <aside>
          <ul>
           <li v-for="(item,index) in 19" :key="index" :class="{current:selected==index}" @click="selectedList(index)">1</li>
          </ul>
        </aside>
        <!-- 二级分类 -->
        <div class="productList"></div>
    </div>
  </div>
</template>
<script>
import { Rater } from 'vux'
export default {
  components: { Rater },
  props: {},
  data() {
    return {
      index: 0,
      showIcon: true, // 到店铺详情的箭头
      showMessage: true,
      selected: 0,
      shopName: '菜城水果店', // 店铺名称
      listTitle: ['店铺', '评价'],
      countStar: 3 // 店铺评价星数
    }
  },
  created() {},
  mounted() {},
  methods: {
    isShowMessage(index) {
      if (index === 0) {
        this.showMessage = true
      } else {
        this.showMessage = false
      }
    },
    goback() {
      this.$router.go(-1)
    },
    goShopInfo() {
      this.$router.push('/shopInfo')
    },
    selectedList(index){
      this.selected = index
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
      width: 204/20rem;
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
        p {
          height: 1.25rem;
          span {
            float: left;
            line-height: 1.25rem;
            font-size: 18px;
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
        span {
          color: #ffffff;
        }
        .is-active span {
          color: #ffbd52;
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
    letter-spacing: -0.06px;
    background-color: #fff;
  }
  .product {
    height: 100%;
    padding-top: 163/20rem;
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
      li.current{
        background-color: #fff;
        border-left: 2px solid #ffbd52;
        border-right: none;
        color: #ffbd52;
      }
    }
    .productList {
      width: 295/20rem;
      height: 100%;
      margin-left: 4rem;
      background-color: #fff;
    }
  }
}
</style>