/*
 * @Author: huShangJun
 * @Date: 2018-01-04 13:46:43
 * DeveloperMailbox:   hsjcc@ccw163.com
 * FunctionPoint: 商品列表
 */
<template>
  <div id="productList">
    <div class="listSection" v-for="(item,index) in 3">
      <p class="smallTitle">冰鲜海产</p>
      <ul class="infoList clearfix">
        <li v-for="(imgUrl,index) in 7" :key="index" @click="toProductInfoList">
          <img src="../../../common/img/productIndex/no_location_ic.png" alt="">
          <p>{{productName}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      productName: 'oijo'
    }
  },
  methods: {
    toProductInfoList(){
      this.$router.push('productInfoList')
    }
  },
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" scoped type="text/less">
#productList {
  padding: 0 0.6rem 0.5rem;
  font-family: PingFangSC-Regular;
  .listSection {
    p {
      font-size: 10px;
      color: #333333;
      letter-spacing: -0.07px;
    }
    .smallTitle {
      margin: 12/20rem 0;
    }
    .infoList {
      background-color: #fff;
      padding: 0 0.5rem;
      text-align: center;
      li {
        float: left;
        width: 33.3%;
        padding: 0.5rem 0;
        img {
          width: 3rem;
          height: 3rem;
          margin-bottom: 3/20rem;
        }
      }
    }
  }
}
</style>
