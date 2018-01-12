/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：商品列表
*/
<template>
  <ul class="goods-list">
    <li class="item border-1px">
      <div class="item-img">
        <img src="../../common/img/productIndex/3.jpg" alt="">
      </div>
      <div class="item-content">
        <div class="name">越南进口红心火龙果2个装大果单果约新鲜水果大越南</div>
        <div class="sales">月销量200&nbsp;&nbsp;|&nbsp;&nbsp;好评率96%</div>
        <div class="spec">约0.5斤/份</div>
        <div class="seller">清河水果专卖店</div>
        <div class="price">¥30.8</div>
        <div class="selectIcon" v-if="selectGood" @click="changSelectStatus"></div>
        <div class="selectGood" v-else @click="selectSpec">多规格</div>
      </div>
    </li>
    <li class="item border-1px">
      <div class="item-img">
        <img src="../../common/img/productIndex/3.jpg" alt="">
      </div>
      <div class="item-content">
        <div class="name">越南进口红心火龙果2个装大果单果约新鲜水果大越南</div>
        <div class="sales">月销量200&nbsp;&nbsp;|&nbsp;&nbsp;好评率96%</div>
        <div class="spec">约0.5斤/份</div>
        <div class="seller">清河水果专卖店</div>
        <div class="price">¥30.8</div>
        <div class="selectIcon" v-if="selectGood"></div>
        <div class="selectGood" v-else>多规格</div>
      </div>
    </li>
    <li class="item border-1px">
      <div class="item-img">
        <img src="../../common/img/productIndex/3.jpg" alt="">
      </div>
      <div class="item-content">
        <div class="name">越南进口红心火龙果2个装大果单果约新鲜水果大越南</div>
        <div class="sales">月销量200&nbsp;&nbsp;|&nbsp;&nbsp;好评率96%</div>
        <div class="spec">约0.5斤/份</div>
        <div class="seller">清河水果专卖店</div>
        <div class="price">¥30.8</div>
        <div class="selectIcon" v-if="selectGood"></div>
        <div class="selectGood" v-else>多规格</div>
      </div>
    </li>
    <li class="item border-1px">
      <div class="item-img">
        <img src="../../common/img/productIndex/3.jpg" alt="">
      </div>
      <div class="item-content">
        <div class="name">越南进口红心火龙果2个装大果单果约新鲜水果大越南</div>
        <div class="sales">月销量200&nbsp;&nbsp;|&nbsp;&nbsp;好评率96%</div>
        <div class="spec">约0.5斤/份</div>
        <div class="seller">清河水果专卖店</div>
        <div class="price">¥30.8</div>
        <div class="selectIcon" v-if="selectGood"></div>
        <div class="selectGood" v-else>多规格</div>
      </div>
    </li>
    <li class="item border-1px">
      <div class="item-img">
        <img src="../../common/img/productIndex/3.jpg" alt="">
      </div>
      <div class="item-content">
        <div class="name">越南进口红心火龙果2个装大果单果约新鲜水果大越南</div>
        <div class="sales">月销量200&nbsp;&nbsp;|&nbsp;&nbsp;好评率96%</div>
        <div class="spec">约0.5斤/份</div>
        <div class="seller">清河水果专卖店</div>
        <div class="price">¥30.8</div>
        <div class="selectIcon" v-if="selectGood"></div>
        <div class="selectGood" v-else>多规格</div>
      </div>
    </li>
  </ul>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        selectGood: true
      }
    },
    methods: {
      changSelectStatus() {
        this.selectGood = false
      },
      selectSpec() {
        this.$emit('selectSpec','item')
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import "../../common/css/mixin";

  .goods-list {
    padding: 0 .6rem;
    .item {
      &:last-child {
        .border-none()
      }
      .border-1px(#e5e5e5);
      display: flex;
      padding-bottom: .4rem;
      padding-top: .6rem;
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
        position: relative;
        .name {
          font-size: 12px;
          line-height: .85rem;
          margin-bottom: .1rem;
        }
        .sales, .spec, .seller {
          font-size: .5rem;
          color: #999999;
          margin-bottom: .1rem;
          line-height: .7rem;
        }
        .price {
          margin-top: .2rem;
          color: #FF3C00;
          font-size: .8rem;
          line-height: 1.1rem;
        }
        .selectIcon {
          position: absolute;
          right: 0;
          bottom: .1rem;
          width: 1.3rem;
          height: 1.3rem;
          background: url("../../common/img/productIndex/shopping_ic.png") no-repeat center;
          background-size: contain;
        }
        .selectGood {
          position: absolute;
          right: 0;
          bottom: .1rem;
          width: 2.7rem;
          line-height: 1.1rem;
          color: #FFFFFF;
          background-color: #FFBD52;
          height: 1.1rem;
          border-radius: 5rem;
          font-size: .6rem;
          text-align: center;
        }
      }
    }
  }
</style>
