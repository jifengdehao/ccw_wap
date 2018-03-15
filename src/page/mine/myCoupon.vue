/*
 * @Author: WuFengliang 
 * @Date: 2018-01-10 15:57:28 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint:  我的优惠券
 */

<template>
  <transition name="fade">
    <div class="contain-div-box">
      <top-bar></top-bar>
      <!-- 优惠券主体 -->
      <scroller lock-x>
      <div class="coupon-box">
        <!-- 折扣券 -->
        <!-- <ul class="discount">
          <li>
            <div class="words">
              <p><span class="emphasis">8.8</span>折&nbsp;&nbsp;满200元可用</p>
              <p><span>2017-07-01</span>至<span>2017-07-15</span></p>
            </div>
            <div class="explain">
              <span>折扣券</span>
            </div>
          </li>
        </ul> -->
        <!-- 折扣券 --> 
        
        <!-- 满减券 -->
        <!-- <ul class="money-off">
          <li>
            <div class="words">
              <p>￥&nbsp;<span class="emphasis">22</span>&nbsp;&nbsp;满200元可用</p>
              <p><span>2017-07-01</span>至<span>2017-07-15</span></p> -->
              <!-- 新人券 LOGO -->
              <!-- <img src="../../common/img/coupon/new_tab@2x.png" />
            </div>
            <div class="explain">
              <span>满减券</span>
            </div>
          </li>
        </ul> -->
        <!-- 满减券 -->

        <!-- 配送抵扣券 -->
        <!-- <ul class="distribution">
          <li>
            <div class="words">
              <p>￥&nbsp;<span class="emphasis">22</span>&nbsp;&nbsp;满200元可用</p>
              <p><span>2017-07-01</span>至<span>2017-07-15</span></p>
            </div>
            <div class="explain">
              <span>配送费</span>
              <span>抵扣券</span>
            </div>
          </li>
        </ul> -->
        <!-- 配送抵扣券 -->

        <!-- 抵扣券 -->
        <!-- <ul class="deduction">
          <li>
            <div class="words">
              <p>￥&nbsp;<span class="emphasis">22</span>&nbsp;&nbsp;满200元可用</p>
              <p><span>2017-07-01</span>至<span>2017-07-15</span></p>
            </div>
            <div class="explain">
              <span>抵扣券</span>
            </div>
          </li>
        </ul> -->
        <!-- 抵扣券 -->


        <!-- 满减券 -->
        <ul class="money-off" v-for="coupon in coupons">
          <li>
            <div class="words">
              <p>￥&nbsp;<span class="emphasis">{{coupon.discount}}</span>&nbsp;&nbsp;{{coupon.useConditionString}}</p>
              <p><span>{{filterTime(coupon.effectiveStartTime)}}</span>至<span>{{filterTime(coupon.effectiveEndTime)}}</span></p>
              <!-- 新人券 LOGO -->
              <img v-if="coupon.couponSet === 1" src="../../common/img/coupon/new_tab@2x.png" />
            </div>
            <div class="explain">
              <span v-if="coupon.types === 1">抵扣券</span>
              <span v-if="coupon.types === 2">折扣券</span>
              <span v-if="coupon.types === 3">满减券</span>
              <span v-if="coupon.types === 4">配送费</span>
              <span v-if="coupon.types === 4">抵扣券</span>
            </div>
          </li>
        </ul>
        <!-- 满减券 -->
      </div>
      </scroller>
      <!-- 优惠券主体 -->
    </div>
  </transition>
</template>
<script>
import * as http from '@/api/http'
import { Toast, Scroller } from 'vux'
import topBar from '../../components/header/topBar'
import { timeDate } from '@/until/time'
export default {
  name: 'myCoupon',
  components: { topBar, Scroller, Toast },
  props: {},
  data() {
    return {
      customerId: '',
      marketId: '',
      status: 0,
      coupons: null //  优惠券数据
    }
  },
  created() {
    if (typeof this.$store.state.loginInfo === 'object') {
      this.customerId = this.$store.state.loginInfo.cust_id
    } else {
      this.customerId = JSON.parse(this.$store.state.loginInfo).cust_id
    }
    if (this.$store.state.market === null) {
      this.marketId = sessionStorage.getItem('market')
        ? JSON.parse(sessionStorage.getItem('market')).marketId
        : ''
    } else {
      this.marketId = this.$store.state.market.marketId
    }
    if (!this.marketId || !this.customerId) {
      this.$vux.toast.text('请确认登录且确认市场了?', 'middle')
    } else {
      this.getCoupon()
    }
  },
  mounted() {},
  activited: {},
  update: {},
  beforeRouteUpdate: {},
  methods: {
    //  获取优惠券
    getCoupon() {
      http
        .getCoupon(this.customerId, this.marketId, {
          status: 1
        })
        .then(response => {
          this.coupons = response.data
        })
    },
    filterTime(time) {
      return timeDate(time)
    }
  },
  filter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" scoped>
@import '../../common/css/variable.less';
.coupon-box {
  box-sizing: border-box;
  padding: 44px 17px;
  ul {
    margin-top: 10px;
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
          margin-left: -25%;
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
</style>
