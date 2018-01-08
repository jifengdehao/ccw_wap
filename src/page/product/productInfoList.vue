/*
 * @Author: huShangJun 
 * @Date: 2018-01-04 15:52:37 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 商品细分列表
 */
<template>
  <div id="productInfoList">
    <div class="header">
      <x-header :left-options="{backText: ''}" style="background-color:#fff;color: #333"><span>{{productName}}</span></x-header>
    </div>
    <div class="nav">
      <ul>
        <li :class="{current:selected==0}" @click="sort(0)"><span>综合排序</span><img src="../../common/img/productIndex/up_ic.png" alt=""></li>
        <li :class="{current:selected==1}" @click="sort(1)"> <span>价格</span><img src="../../common/img/productIndex/down_ic.png" alt=""></li>
        <li :class="{current:selected==2}" @click="sort(2)"><span>销量</span></li>
        <li :class="{current:selected==3}"@click="sort(3)"><span>评价</span></li>
      </ul>
    </div>
    <div class="list">
      <ul>
        <li class="productMessage" v-for="(item, index) in 10" :key="index">
          <div class="productMessageLeft left"><img src="../../common/img/productIndex/3.jpg" alt=""></div>
          <div class="productMessageRight right">
            <p class="first">美国西北车厘子 2磅装(约900g) 约26-28mm果径 新鲜水果</p>
            <p><span>月销量200</span> <i>|</i> <span>好评率96%</span></p>
            <p>约5斤/份</p>
            <p>清河水果专卖店</p>
            <p class="last">¥30.8</p>
            <div v-if="showCart" class="cartIcon icon">
              <img src="../../common/img/productIndex/shopping_ic.png" alt="">
            </div>
            <div v-else class="fontIcon icon">多规格</div>
          </div>
        </li>
        <li class="footer">
          <p >没有更多了</p>
        </li>
      </ul>
    </div>
    <div class="bigCart">
      <img src="../../common/img/productIndex/shopping_big_ic.png" alt="">
      <p class="smallIcon" v-if="">12</p>
    </div>
  </div>
</template>
<script>
import { XHeader } from 'vux'
export default {
  components: { XHeader },
  props: {},
  data() {
    return {
      selected: 0,
      showCart: true,
      productName: '你好'
    }
  },
  created() {},
  mounted() {},
  methods: {
    sort(index) {
      this.selected = index
    }
  },
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" scoped>
#productInfoList {
  height: 100%;
  position: relative;
  font-family: PingFangSC-Regular;
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
    overflow: scroll;
    .productMessage {
      height: 127/20rem;
      padding-top: 11/20rem;
      border-bottom: 0.5px solid #e5e5e5;
      box-sizing: border-box;
      overflow: hidden;
      .productMessageLeft {
        width: 4rem;
        height: 4rem;
        margin-right: 0.6rem;
        img {
          width: 4rem;
          height: 4rem;
        }
      }
      .productMessageRight {
        position: relative;
        width: 259/20rem;
        font-size: 0.5rem;
        color: #999999;
        letter-spacing: -0.07px;
        box-sizing: border-box;
        .first {
          font-size: 0.6rem;
          color: #333333;
          letter-spacing: -0.07px;
        }
        .last {
          font-size: 0.8rem;
          color: #ff3c00;
          letter-spacing: -0.08px;
        }
        .icon {
          position: absolute;
          right: 0;
          bottom: 0.1rem;
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
    }
    .footer {
      height: 50px;
      line-height: 50px;
      font-size: 12px;
      color: #888;
      text-align: center;
    }
  }
  ::-webkit-scrollbar {
    display: none;
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
      background-color: #ff3c00;
      border-radius: 50%;
      font-size: 16px;
      color: #ffffff;
      letter-spacing: -0.1px;
      text-align: center;
    }
  }
}
</style>