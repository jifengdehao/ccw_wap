/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：档口列表
*/
<template>
  <ul class="sellers-list">
    <li class="item border-1px">
      <div class="item-img">
        <img src="../../common/img/productIndex/3.jpg" alt="">
      </div>
      <div class="item-content">
        <div class="name">市桥水果店</div>
        <div class="star">
          <rater :active-color="starColor" :fontSize="starFontSize" :disabled="starDisabled" v-model="star"></rater>
          &nbsp;&nbsp;月销量160&nbsp;&nbsp;|&nbsp;&nbsp;关注80
        </div>
        <div class="dec">本店自2017年6月开始，开店时间延迟7点半，欢迎新老顾</div>
      </div>
    </li>
    <li class="item border-1px">
      <div class="item-img">
        <img src="../../common/img/productIndex/3.jpg" alt="">
      </div>
      <div class="item-content">
        <div class="name">市桥水果店</div>
        <div class="star">
          <rater :active-color="starColor" :fontSize="starFontSize" :disabled="starDisabled" v-model="star"></rater>
          &nbsp;&nbsp;月销量160&nbsp;&nbsp;|&nbsp;&nbsp;关注80
        </div>
        <div class="dec">本店自2017年6月开始，开店时间延迟7点半，欢迎新老顾</div>
      </div>
    </li>
    <li class="item border-1px">
      <div class="item-img">
        <img src="../../common/img/productIndex/3.jpg" alt="">
      </div>
      <div class="item-content">
        <div class="name">市桥水果店</div>
        <div class="star">
          <rater :active-color="starColor" :fontSize="starFontSize" :disabled="starDisabled" v-model="star"></rater>
          &nbsp;&nbsp;月销量160&nbsp;&nbsp;|&nbsp;&nbsp;关注80
        </div>
        <div class="dec">本店自2017年6月开始，开店时间延迟7点半，欢迎新老顾</div>
      </div>
    </li>
    <li class="item border-1px">
      <div class="item-img">
        <img src="../../common/img/productIndex/3.jpg" alt="">
      </div>
      <div class="item-content">
        <div class="name">市桥水果店</div>
        <div class="star">
          <rater :active-color="starColor" :fontSize="starFontSize" :disabled="starDisabled" v-model="star"></rater>
          &nbsp;&nbsp;月销量160&nbsp;&nbsp;|&nbsp;&nbsp;关注80
        </div>
        <div class="dec">本店自2017年6月开始，开店时间延迟7点半，欢迎新老顾</div>
      </div>
    </li>
    <li class="item border-1px">
      <div class="item-img">
        <img src="../../common/img/productIndex/3.jpg" alt="">
      </div>
      <div class="item-content">
        <div class="name">市桥水果店</div>
        <div class="star">
          <rater :active-color="starColor" :fontSize="starFontSize" :disabled="starDisabled" v-model="star"></rater>
          &nbsp;&nbsp;月销量160&nbsp;&nbsp;|&nbsp;&nbsp;关注80
        </div>
        <div class="dec">本店自2017年6月开始，开店时间延迟7点半，欢迎新老顾</div>
      </div>
    </li>
    <li class="item border-1px">
      <div class="item-img">
        <img src="../../common/img/productIndex/3.jpg" alt="">
      </div>
      <div class="item-content">
        <div class="name">市桥水果店</div>
        <div class="star">
          <rater :active-color="starColor" :fontSize="starFontSize" :disabled="starDisabled" v-model="star"></rater>
          &nbsp;&nbsp;月销量160&nbsp;&nbsp;|&nbsp;&nbsp;关注80
        </div>
        <div class="dec">本店自2017年6月开始，开店时间延迟7点半，欢迎新老顾</div>
      </div>
    </li>
    <li class="item border-1px">
      <div class="item-img">
        <img src="../../common/img/productIndex/3.jpg" alt="">
      </div>
      <div class="item-content">
        <div class="name">市桥水果店</div>
        <div class="star">
          <rater :active-color="starColor" :fontSize="starFontSize" :disabled="starDisabled" v-model="star"></rater>
          &nbsp;&nbsp;月销量160&nbsp;&nbsp;|&nbsp;&nbsp;关注80
        </div>
        <div class="dec">本店自2017年6月开始，开店时间延迟7点半，欢迎新老顾</div>
      </div>
    </li>
    <li class="item border-1px">
      <div class="item-img">
        <img src="../../common/img/productIndex/3.jpg" alt="">
      </div>
      <div class="item-content">
        <div class="name">市桥水果店</div>
        <div class="star">
          <rater :active-color="starColor" :fontSize="starFontSize" :disabled="starDisabled" v-model="star"></rater>
          &nbsp;&nbsp;月销量160&nbsp;&nbsp;|&nbsp;&nbsp;关注80
        </div>
        <div class="dec">本店自2017年6月开始，开店时间延迟7点半，欢迎新老顾</div>
      </div>
    </li>
  </ul>
</template>
<script type="text/ecmascript-6">
  import {Rater} from 'vux'

  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        star: 3.4,
        starColor: '#FFBD52',
        starFontSize: 10,
        starDisabled: true
      }
    },
    components: {
      Rater
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import "../../common/css/mixin";

  .sellers-list {
    padding: 0 .6rem;
    .item {
      &:last-child {
        .border-none()
      }
      .border-1px(#e5e5e5);
      display: flex;
      padding: .6rem 0;
      .item-img {
        width: 4rem;
        flex: 0 0 4rem;
        height: 4rem;
        & > img {
          width: 100%;
          height: 100%;
        }
      }
      .item-content {
        padding-left: .6rem;
        .name {
          font-size: .7rem;
          line-height: 1rem;
        }
        .star, .name {
          margin-bottom: .2rem;
        }
        .star, .dec {
          font-size: .5em;
          color: #999999;
          line-height: .7rem;
        }
      }
    }
  }
</style>
