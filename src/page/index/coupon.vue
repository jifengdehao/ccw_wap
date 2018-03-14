/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：优惠卷
*/
<template>
  <div class="coupon" v-if="isOpenCoupon && couponList.length>0">
    <div class="coupon-wrapper">
      <div class="wrapper">
        <div class="content">
          <ul class="list">
            <li class="item" v-for="item in couponList" :key="item.couponId">
              <div class="name">
                <span class="icon red">¥</span>
                <span class="num">{{item.discount / 100}}</span>
                <span class="text red">{{item.types | formatType}}</span>
              </div>
              <div class="dec">{{item.useConditionString}}</div>
              <div class="date">{{item.effectiveEndTime|formatTime }}-{{item.effectiveStartTime|formatTime}}</div>
              <div class="status red" v-if="item.status === 0" @click="linQuCoupon(item)">领取</div>
              <div class="status disabled" v-if="item.status === 2">抢光啦</div>
            </li>
            <!--
            <li class="item">
              <div class="name">
                <span class="num">8.8</span>
                <span class="icon red">折</span>
                <span class="text red">折扣券</span>
              </div>
              <div class="dec">订单满50元使用</div>
              <div class="date">2017.12.20-2017.12.27</div>
              <div class="status disabled">抢光啦</div>
            </li>
            <li class="item">
              <div class="new-icon"></div>
              <div class="name">
                <span class="icon red">¥</span>
                <span class="num">5</span>
                <span class="text red">配送费抵扣券</span>
              </div>
              <div class="dec">订单满50元使用</div>
              <div class="date">2017.12.20-2017.12.27</div>
              <div class="status">查看</div>
            </li>
            -->
          </ul>
        </div>
        <i class="close" @click.stop="close"></i>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import * as api from '@/api/http.js'
  import * as time from '@/until/time'

  export default {
    data() {
      return {
        couponList: []
      }
    },
    filters: {
      formatTime: function (value) {
        if (!value) return ''
        return time.formatDate(value)
      },
      formatType: function (value) {
        if (value === 1) {
          return '抵扣券'
        } else if (value === 2) {
          return '折扣券'
        } else if (value === 3) {
          return '满减券'
        } else if (value === 4) {
          return '免配送费券'
        } else {
          return ''
        }
      }
    },
    computed: {
      ...mapGetters([
        'isOpenCoupon',
        'user',
        'market'
      ])
    },
    created() {
      this.getCouponData()
    },
    methods: {
      // 获取优惠卷
      getCouponData() {
        api.getCouponListData(this.user.cust_id, this.market.marketId).then((res) => {
          if (res.code === 200 && res.data.length > 0) {
            this.couponList = res.data
          }
        })
      },
      // 领取优惠卷
      linQuCoupon(item) {
        api.linQuCoupon(this.user.cust_id, item.couponId).then((res) => {
          if (res.code === 200) {
            if (res.data === 1) {
              this.getCouponData()
            }
            console.log(res.data)
          }
        })
      },
      // 关闭
      close() {
        this.setIsOpenCoupon(false)
      },
      ...mapMutations({
        setIsOpenCoupon: 'SET_ISOPENCOUPON'
      })
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import "../../common/css/mixin";

  .coupon {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 999;
    .mask {
      background-color: rgba(0, 0, 0, 0.35);
      overflow: hidden;
      width: 100%;
      height: 100%;
    }
    .coupon-wrapper {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      .wrapper {
        width: 72%;
        .content {
          height: 18.5rem;
          box-sizing: border-box;
          padding-top: 5rem;
          .bg-image("../../common/img/coupon/coupon_img");
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          overflow: hidden;
          .list {
            height: 13.5rem;
            overflow-y: scroll;
            box-sizing: border-box;
            padding: .4rem .75rem;
            .item {
              width: 12rem;
              height: 4rem;
              background: url("../../common/img/coupon/home_coupon_bg.png") no-repeat center;
              background-size: contain;
              margin-bottom: .4rem;
              box-sizing: border-box;
              position: relative;
              padding: .2rem 0 .2rem 1rem;
              &:last-child {
                margin-bottom: 0;
              }
              .name {
                font-size: 0;
                .icon, .text {
                  font-size: .5rem;
                }
                .text {
                  margin-left: .5rem;
                }
                .num {
                  font-size: 1.8rem;
                  color: #FF5942;
                  line-height: 2rem;
                  display: inline-block;
                }
              }
              .status {
                position: absolute;
                right: .75rem;
                top: .65rem;
                bottom: .65rem;
                width: .8rem;
                font-size: .7rem;
                line-height: .9rem;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .red {
                color: #FF5942;
              }
              .disabled {
                color: #bbbbbb;
              }
              .date, .dec {
                font-size: .5rem;
                line-height: .7rem;
                margin-bottom: .1rem;
              }
              .date {
                color: #999999;
              }
              .new-icon {
                position: absolute;
                top: 0;
                left: 0;
                width: 2.7rem;
                height: 2.7rem;
                background: url("../../common/img/coupon/new_tab@2x.png") no-repeat left center;
                background-size: cover;
              }
            }
          }
        }
        .close {
          display: block;
          width: 1.5rem;
          height: 1.5rem;
          background: url("../../common/img/coupon/coupon_close_ic@2x.png") no-repeat center;
          background-size: cover;
          margin: 1.1rem auto 0 auto;
        }
      }
    }
  }

</style>
