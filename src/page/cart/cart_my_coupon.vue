/*
 * @Author: ZengFanlu 
 * @Date: 2018-01-18 11:13:18 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 优惠券 
 */

<template>
  <transition name="fade">
    <div class="contain-div-box">
      <div class="header"><top-bar></top-bar></div>
      <!-- 优惠券主体 -->
      <div class="coupon-box" v-if="showMyCoupon">
        <!-- 折扣券 -->
        <ul class="discount">
          <li>
            <div class="words">
              <p> <input type="radio" class="check" name="coupon"> <span class="emphasis">8.8</span>折&nbsp;&nbsp;满200元可用</p>
              <p><span>2017-07-01</span>至<span>2017-07-15</span></p>
            </div>
            <div class="explain">
              <span>折扣券</span>
            </div>
          </li>
        </ul>
        <!-- 折扣券 --> 
        
        <!-- 满减券 -->
        <ul class="money-off">
          <li>
            <div class="words">
              <p> <input type="radio" name="coupon" class="check"> ￥&nbsp;<span class="emphasis">22</span>&nbsp;&nbsp;满200元可用</p>
              <p><span>2017-07-01</span>至<span>2017-07-15</span></p>
              <!-- 新人券 LOGO -->
              <img src="../../common/img/coupon/new_tab@2x.png" />
            </div>
            <div class="explain">
              <span>满减券</span>
            </div>
          </li>
        </ul>
        <!-- 满减券 -->

        <!-- 配送抵扣券 -->
        <ul class="distribution">
          <li>
            <div class="words">
              <p> <input type="radio" name="coupon" class="check"> ￥&nbsp;<span class="emphasis">22</span>&nbsp;&nbsp;满200元可用</p>
              <p><span>2017-07-01</span>至<span>2017-07-15</span></p>
            </div>
            <div class="explain">
              <span>配送费</span>
              <span>抵扣券</span>
            </div>
          </li>
        </ul>
        <!-- 配送抵扣券 -->

        <!-- 抵扣券 -->
        <ul class="deduction">
          <li>
            <div class="words">
              <p> <input type="radio" name="coupon" class="check"> ￥&nbsp;<span class="emphasis">22</span>&nbsp;&nbsp;满200元可用</p>
              <p><span>2017-07-01</span>至<span>2017-07-15</span></p>
            </div>
            <div class="explain">
              <span>抵扣券</span>
            </div>
          </li>
        </ul>
        <!-- 抵扣券 -->
        <button>确定</button>
      </div>
      <!-- 优惠券主体 -->

      <!-- 优惠券空白页 -->
      <div class="coupon-blank">
        <div class="blank-pic">
          <img src="../../common/img/cart/no_coupon_ic.png" alt="">
          <p>您还没有优惠券</p>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import topBar from '../../components/header/topBar'
export default {
  name: 'myCoupon',
  components: { topBar },
  props: {},
  data() {
    return {
      showMyCoupon: false
    }
  },
  created() {},
  mounted() {},
  activited: {},
  update: {},
  beforeRouteUpdate: {},
  methods: {},
  filter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" scoped>
@import '../../common/css/variable.less';
.header { height: 44 / 20rem; }
input[type='radio'] { -webkit-appearance: none; outline: none; }
input.check {  background: url(../../common/img/cart/select_default_btn.png) no-repeat center left; background-size: 20 / 20rem 20 / 20rem; position: absolute; top: 50%; left: 14 / 20rem; margin-top: -19 / 20rem; width: 20 / 20rem; height: 40 / 20rem; z-index: 3; }
input.check:checked { background: url(../../common/img/cart/select_selected_btn.png) no-repeat center left; background-size: 20 / 20rem 20 / 20rem; z-index: 3; }
.coupon-box {
  box-sizing: border-box;
  padding: 0 17px;
  ul {
    margin-top: 9.5px;
    li {
      position: relative;
      width: 17.05rem;
      height: 5rem;
      font-size: 12px;
      margin: auto;
      color: #ffae28;
      background-image: url(../../common/img/coupon/coupon_bg@2x.png);
      background-size: 17.05rem auto;
      .words {
        position: absolute;
        top: 0;
        left: 0;
        width: 14.55rem;
        height: 5rem;
        p {
          text-indent: 1.7rem;
          margin-left: 22px;
        }
        p:first-child {
          height: 2.8rem;
          line-height: 2.8rem;
          margin-top: 13px;
          span {
            vertical-align: sub;
          }
          span.emphasis {
            font-size: 40px;
          }
        }
        p:nth-child(2) {
          font-size: 20px;
          margin-left: -14%;
          line-height: 14px;
          color: #999;
          transform: scale(0.5, 0.5);
        }
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 2.7rem;
          height: 2.7rem;
        }
      }
      .explain {
        position: absolute;
        top: 0;
        right: 0;
        width: 2.6rem;
        height: 5rem;
        font-size: 16px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          letter-spacing: 4px;
          writing-mode: vertical-lr;
        }
      }
    }
  }
}
button { width: 140 / 20rem; height: 40 / 20rem; position: fixed; bottom: 13px; left: 32%; background-color: #FFBD52; border-radius: 2px; font-size: 18px; color: #ffffff; }
.coupon-blank { width: 100%; height: 100%; background-color: #ffffff; position: fixed; top: 0; left: 0; display: flex; justify-content: center; align-items: center; }
.blank-pic > img{ width: 100 / 20rem; height: 100 / 20rem; margin-bottom: 28 / 20rem; }
.blank-pic > p { font-size: 12px; color: #999999; }
</style>