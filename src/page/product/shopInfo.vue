/*
 * @Author: huShangJun 
 * @Date: 2018-01-08 09:34:44 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 店铺详情 
 */
<template>
  <div id="shopInfo">
    <!-- 头部大图区域 -->
    <div style="position:absolute;zIndex:1000">
      <div class="topImg">
        <!-- 返回上一页图标 -->
        <img src="../../common/img/productIndex/shop_bg.png" alt="">
        <i class="goback" @click="goback"></i>
        <div class="shopMessage">
          <div class="shopMessageLeft">
            <img src="../../common/img/productIndex/3.jpg" alt="">
          </div>
          <div class="shopMessageRight">
            <p>
              <span>{{shopName}} </span>
            </p>
            <rater v-model="countStar" :font-size="13" disabled></rater>
          </div>
        </div>
      </div>
      <!-- 公告 -->
      <div class="notic">
        <span>公告：</span>这里是店铺活动布告！满100元减10元，满200元减30元。
      </div>
      <!-- tab栏 -->
      <tab class="tab">
        <tab-item selected @on-item-click="isShowMessage">店铺</tab-item>
        <tab-item @on-item-click="isShowMessage">评价</tab-item>
      </tab>
    </div>
    <!-- 店铺信息 -->
    <div v-if="showMessage" class="showMessage">
      <div class="address">
        <div class="line">
          <i class="first"></i>
          <span>番禺祈福市场</span>
        </div>
      </div>

      <div class="tel" @click="tel">
        <i class="second"></i>
        <span>{{telNub}}</span>
      </div>
      <div class="lastCell" is-link @click="onClick">
        <i class="last"></i>
        <i class="jumpIcon"></i>
        <span>查看商家资质</span>
      </div>

    </div>
    <!-- 店铺评价 -->
    <div v-else style="position: absolute;
      top: 0;
      height: 100%;
      padding-top: 10.5rem;
      box-sizing: border-box;
      zIndex: 10">
      <shop-evaluation></shop-evaluation>
    </div>
  </div>
</template>
<script>
import shopEvaluation from './productComponents/shopEvaluation'
import { Tab, TabItem, Group, CellBox, Rater } from 'vux'
export default {
  components: {
    Tab,
    TabItem,
    Group,
    CellBox,
    Rater,
    shopEvaluation
  },
  props: {},
  data() {
    return {
      index: 0,
      showMessage: true,
      shopName: '菜城水果店', // 店铺名称
      listTitle: ['店铺', '评价'],
      countStar: 3, // 店铺评价星数
      telNub: '18876543210'
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
    tel() {
      window.location.href = 'tel:' + this.telNub
    },
    onClick() {
      this.$router.push('qualification')
    }
  },
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" >
#shopInfo {
  position: relative;
  height: 100%;
  background-color: #f5f5f5;
  .weui-cells {
    margin-top: 0 !important;
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
    height: 1.5rem;
    line-height: 1.5rem;
    margin-bottom: 0.5rem;
    padding-left: 0.6rem;
    font-size: 10px;
    color: #666666;
    letter-spacing: -0.06px;
    background-color: #fff;
  }
  .tab {
    height: 2.2rem;
    .vux-tab-item.vux-tab-selected {
      color: #ffbd52;
      border-bottom: 3px solid #ffbd52;
    }
    .vux-tab-ink-bar {
      width: 2rem;
      margin: 0 auto;
      background-color: #ffbd52 !important;
    }
  }

  .showMessage {
    position: absolute;
    top: 210/20rem;
    width: 100%;
    .weui-cell {
      height: 50px;
      box-sizing: border-box;
    }
    .address,
    .tel,
    .lastCell {
      position: relative;
      height: 50px;
      line-height: 50px;
      padding-left: 12px;
      padding-right: 12px;
      background-color: #fff;
      box-sizing: border-box;
    }
    .lastCell {
      margin-top: 10px;
    }
    .line {
      height: 50px;
      border-bottom: 0.5px solid #e5e5e5;
      box-sizing: border-box;
    }
    i {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: middle;
      background-position: center;
    }
    span {
      font-size: 14px;
      color: #333333;
      letter-spacing: -0.14px;
    }
    .first {
      background: url('../../common/img/productIndex/maps_ic.png') no-repeat;
      background-size: 12px 15px;
      background-position: center;
    }
    .second {
      background: url('../../common/img/productIndex/shops_Telephone.png')
        no-repeat;
      background-size: 15px 15px;
      background-position: center;
    }
    .last {
      background: url('../../common/img/productIndex/shops_qualifications.png')
        no-repeat;
      background-size: 15px 15px;
      background-position: center;
    }
    .jumpIcon {
      position: absolute;
      right: 0;
      width: 50px;
      height: 50px;
      background: url('../../common/img/productIndex/jump_gray_ic.png')
        no-repeat;
      background-size: 30px 30px;
      background-position: center;
    }
  }
}
</style>