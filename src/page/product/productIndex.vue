/*
 * @Author: WuFengliang 
 * @Date: 2017-12-26 09:25:25 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint:  产品分类模块首页
 */
<template>
  <div id="product">
    <!-- 在配送范围内 -->
    <div style="height: 100%" v-if="isScope"> 
      <classifi-cation></classifi-cation> 
    </div>
    <!-- 不在配送范围内 -->
    <div class="notScope" v-else>
      <div class="notScopeHeader">
        <p>分类</p>
      </div>
      <div class="notScopeContent">
        <div class="notScopeImg">
          <img src="../../common/img/productIndex/no_location_ic.png" alt="">
        </div>
        <p >当前位置未开通配送市场搜搜其他收货地址</p>
        <div class="toOther">去切换
        </div>
      </div>
    </div>
    <menu-bar></menu-bar>
  </div>
</template>
<script>
import menuBar from '@/components/footer/menuBar'
import classifiCation from './productComponents/classifiy'
export default {
  name: 'productIndex',
  components: { menuBar, classifiCation},
  props: {},
  data() {
    return {
      isScope: true // 是否在配送范围内
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
#product {
  height: 100%;
  // 在配送范围
  // 不在配送范围
  .notScope {
    .notScopeHeader {
      height: 64/20rem;
      padding-top: 29/20rem;
      box-sizing: border-box;
      border-bottom: 0.5px solid #e5e5e5;
      text-align: center;
      p {
        font-size: 18/20rem;
        color: #333333;
        letter-spacing: -0.1px;
      }
    }
    .notScopeContent {
      width: 143/20rem;
      margin: 0 auto;
      padding-top: 143/20rem;
      .notScopeImg {
        width: 130/20rem;
        height: 90/20rem;
        margin: 0 auto;
        margin-bottom: 32/20rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      p {
        text-align: center;
        font-size: 12/20rem;
        color: #999999;
        letter-spacing: -0.07px;
        margin-bottom: 32/20rem;
      }
      .toOther {
        margin: 0 auto;
        text-align: center;
        line-height: 30/20rem;
        width: 6rem;
        height: 30/20rem;
        background: #ffbd52;
        border: 5px solid #ffdfac;
        border-radius: 100px;
        font-size: 18/20rem;
        color: #ffffff;
      }
    }
  }
}
</style>