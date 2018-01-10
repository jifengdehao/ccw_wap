/*
 * @Author: huShangJun 
 * @Date: 2018-01-08 09:34:44 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 功能开发点 
 */
<template>
  <div id="shopInfo">
    <div style="position:absolute;zIndex:1000" >
      <div class="topImg">
      <img src="../../common/img/productIndex/fruits.png" alt="">
      <i class="goback" @click="goback"></i>
      <div class="shopMessage">
        <img src="../../common/img/productIndex/3.jpg" alt="">
        <p>{{shopName}}</p>
        <rater v-model="countStar" :font-size="12" disabled></rater>
      </div>
    </div>
    <div class="notic"><span>公告：</span>这里是店铺活动布告！满100元减10元，满200元减30元。</div>
    <tab class="tab" >
      <tab-item selected @on-item-click="isShowMessage">店铺</tab-item>
      <tab-item @on-item-click="isShowMessage">评价</tab-item>
    </tab>
    </div>
    <div v-if="showMessage" class="showMessage">
        <group>
          <cell-box  @click.native="onClick">
            <i class="first"></i>
            <span>番禺祈福市场</span>
          </cell-box>
            <cell-box  @click.native="onClick" >
              <i class="second"></i>
              <span>18876543210</span>
          </cell-box>
        </group>
        <group style="marginTop: 10px;">
          <cell-box class="lastCell"  disabled is-link>
            <i class="last"></i>
            <span>查看商家资质</span>
          </cell-box>
        </group>
    </div>
    <div v-else style="position: absolute;
      top: 0;
      height: 100%;
      padding-top: 14.7rem;
      box-sizing: border-box;
      zIndex: 10" @click="alert">
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
    alert() {
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
  .weui-cell:before {
    left: 12px;
    right: 12px;
  }
  .topImg {
    img {
      width: 100%;
      height: 210/20rem;
    }
    .goback {
      position: absolute;
      top: 28/20rem;
      left: 0.6rem;
      width: 30px;
      height: 30px;
      // background-color: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      background-image: url(../../common/img/productIndex/shops_back.png);
      background-size: 30px;
    }
    .shopMessage {
      position: absolute;
      top: 130px;
      width: 204/20rem;
      height: 3.5rem;
      padding: 12px 10px 0 10px;
      box-sizing: border-box;
      border-bottom-right-radius: 2rem;
      border-top-right-radius: 2rem;
      background-color: rgba(0, 0, 0, 0.5);
      img {
        float: left;
        width: 50px;
        height: 50px;
        margin-right: 8px;
      }
      p {
        line-height: 20px;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: -0.08px;
      }
      span {
        color: #ffffff;
      }
      .is-active span {
        color: #ffbd52;
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
    top: 14.6rem;
    width: 100%;
    .weui-cell {
      height: 50px;
      box-sizing: border-box;
    }
    i {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 10px;
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
      background-size: 16px 16px;
      background-position: center;
    }
    .last {
      background: url('../../common/img/productIndex/shops_qualifications.png')
        no-repeat;
      background-size: 14px 14px;
      background-position: center;
    }
  }
}
</style>