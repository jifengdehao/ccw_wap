/*
 * @Author: huShangJun
 * @Date: 2018-01-04 13:46:43
 * DeveloperMailbox:   hsjcc@ccw163.com
 * FunctionPoint: 商品列表
 */
<template>
  <div id="productList">
    <div class="listSection" v-for="(item,index) in productData" :key="index">
      <p class="smallTitle">{{item.name}}</p>
      <ul class="infoList clearfix">
        <li v-for="(imgUrl,index) in item.threeCat" :key="index" @click="toProductInfoList(imgUrl.name)">
          <img src="../../../common/img/productIndex/no_location_ic.png" alt="">
          <p>{{imgUrl.name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: ['productData'],
  data() {
    return {
      productName: 'oijo'
    }
  },
  created () {
   
  },
  methods: {
    toProductInfoList(name){
      this.$router.push('productInfoList?queryString=' + name)
    }
  },
  filfter: {},
  computed: {
    // listData(){
    //   return this.productData
    // }
  },
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
