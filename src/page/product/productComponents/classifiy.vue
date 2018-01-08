/*
 * @Author: huShangJun 
 * @Date: 2018-01-03 16:03:18 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 产品分类
 */

<template>
  <div id="classifiy">
    <!-- 头部搜索 -->
    <div class="classifiyTop">
      <div class="search">
        <!-- <input type="text" /> -->
        <div class="searchIcon">
          <i></i>
          <span>附近商家商品</span>
        </div>
      </div>
    </div>
    <!-- 内容部分 -->
    <div class="classifiyList">
      <aside>
        <ul>
          <li v-for="(item,index) in 5" :key="index" :class="{current:selected==index}" @click="changeList(index)">新鲜水果</li>
        </ul>
      </aside>
      <section class="classifiyInfo">
        <product-list></product-list>
      </section>
    </div>
  </div>
</template>
<script>
import productList from './productList'
export default {
  components: { productList },
  props: {},
  data() {
    return {
      selected: 0
    }
  },
  methods: {
    // 点击分类
    changeList(index) {
      this.selected = index
    }
  },
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" scoped>
#classifiy {
  position: relative;
  height: 100%;
  font-family: PingFangSC-Regular;
  .classifiyTop {
    position: absolute;
    width: 100%;
    height: 64.5/20rem;
    padding: 0 12px;
    background-color: #fff;
    box-sizing: border-box;
    z-index: 200;
    border-bottom: 0.5px solid #e5e5e5;
    .searchIcon {
      width: 100%;
      height: 1.5rem;
      line-height: 1.5rem;
      margin-top: 28/20rem;
      box-sizing: border-box;
      text-align: center;
      background-color: #f5f5f5;
      border-radius: 4px;
      span {
        font-size: 12px;
        color: #999999;
        letter-spacing: -0.07px;
        vertical-align: middle;
      }
      i {
        display: inline-block;
        width: 13/20rem;
        height: 13/20rem;
        background-image: url(../../../common/img/productIndex/search.png);
        background-size: 13/20rem;
      }
    }
  }
  .classifiyList {
    position: relative;
    padding-bottom: 49/20rem;
    width: 100%;
    height: 100%;
    background-color: #fff;
    box-sizing: border-box;
    aside {
      position: absolute;
      left: 0;
      width: 94/20rem;
      height: 100%;
      padding-top: 64.5/20rem;
      padding-bottom: 49/20rem;
      box-sizing: border-box;
      ul {
        width: 70/20rem;
        margin: 0 auto;
        text-align: center;
        font-size: 14px;
        color: #333333;
        letter-spacing: -0.09px;
        li {
          height: 28/20rem;
          line-height: 28/20rem;
          margin: 11/20rem 0;
        }
        li.current {
          background: #ffbd52;
          border-radius: 100px;
          color: #ffffff;
          letter-spacing: -0.09px;
        }
      }
    }
    .classifiyInfo {
      position: absolute;
      right: 0;
      width: 281/20rem;
      height: 100%;
      background-color: #f5f5f5;
      overflow: scroll;
      padding-top: 64.5/20rem;
      padding-bottom: 49/20rem;
      box-sizing: border-box;
    }
    .classifiyInfo::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>