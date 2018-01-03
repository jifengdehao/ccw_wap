/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：优惠卷
*/
<template>
  <div class="coupon">
    <div class="coupon-wrapper">
      <div class="wrapper">
        <div class="content">
          <ul class="list">
            <li class="item">
              <div class="name">
                <span class="icon red">¥</span>
                <span class="num">20</span>
                <span class="text red">满减券</span>
              </div>
              <div class="dec">订单满50元使用</div>
              <div class="date">2017.12.20-2017.12.27</div>
              <div class="status red">领取</div>
            </li>
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
          </ul>
        </div>
        <i class="close"></i>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "../../common/css/mixin"
  .coupon
    .mask
      position fixed
      left 0
      right 0
      top 0
      bottom 0
      z-index 999
      background #000000
      opacity 0.35
    .coupon-wrapper
      position fixed
      left 0
      right 0
      top 0
      bottom 0
      z-index 1000
      display flex
      align-items center
      justify-content center
      .wrapper
        width 72%
        .content
          height 18.5rem
          bg-image(coupon_img)
          background-size contain
          background-repeat no-repeat
          background-position center
          box-sizing border-box
          padding-top 5rem
          overflow hidden
          .list
            height 13.5rem
            overflow-y  scroll
            box-sizing border-box
            padding .3rem .75rem .4rem .75rem
            .item
              width 12rem
              height 4rem
              background url("home_coupon_bg.png")no-repeat center
              background-size contain
              margin-bottom .3rem
              position relative
              padding-left .9rem
              box-sizing border-box
              padding-bottom .2rem
              padding-top  .35rem
              .name
                font-size 0
                .icon,.text
                  font-size .5rem
                .text
                  margin-left .5rem
                .num
                  font-size 1.8rem
                  color #FF5942
                  line-height 2rem
                  display inline-block
              .status
                position absolute
                right .75rem
                top .65rem
                bottom .65rem
                width .8rem
                font-size .7rem
                line-height .9rem
                display flex
                justify-content center
                align-items center
              .red
                color #FF5942
              .disabled
                color #bbbbbb
              .date,.dec
                font-size .5rem
                line-height .7rem
              .date
                color #999999
              .new-icon
                position: absolute
                top: 0
                left 0
                width 2.7rem
                height 2.7rem
                background url("new_tab@2x.png")no-repeat left center
                background-size cover
        .close
          display block
          width 1.5rem
          height 1.5rem
          background url("coupon_close_ic@2x.png") no-repeat center
          background-size cover
          margin 1.1rem auto 0 auto
</style>
