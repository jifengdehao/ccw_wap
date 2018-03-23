/*
 * @Author: ZengFanlu 
 * @Date: 2018-01-19 11:08:14 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 我的购买商品页面 
 */

<template>
  	<div>
    	<div class="header">
      	<top-bar></top-bar>
   	  </div>
      <ul>
        <li v-for="(item,index) in goodsList" :key="index">
          <div class="productList">
            <div class="productLiLeft"><img :src="item.items_image" alt=""></div>
            <div class="productLiRight">
              <p class="produtcname">{{item.product_name}}</p>
              <p class="productnum">数量:
                <span class="">{{item.unit}}</span>
                <span>{{item.attrValue}}</span>
              </p>
              <p class="productnum">{{item.store_name}}</p>
              <p class="productprice">¥{{item.current_price}}</p>
            </div>
            <hr style="width:100%;opacity:0.5;"/>
          </div>
        </li>
      </ul>
   </div>
</template>
<script>
import topBar from '@/components/header/topBar'
export default {
  components: { topBar },
  data () {
    return {
      goodsList:[]
    }
  },
  created: {},
  methods: {

  },
  mounted(){
    this.goodsList=this.$store.state.arrayList;
  }
}
</script>
<style lang="less" scoped>
.header { height: 44 / 20rem; }
.productList{margin: 10.5px 18px 8px 12px;height: 80/20rem;}
.productLiLeft{
  float: left;
  img{
    width: 70.5/20rem;height: 70.5/20rem;padding-top: 5px;
  }
}
.productLiRight{margin-left: 18.2px;float: left;width: 253/20rem;
  .produtcname{
    color: #333;
    font-size: 12px;
    line-height: 17px;
  }
  .productnum{
    color: #999;
    font-size: 10px;
    line-height: 14px;
    span{
      margin: 0 5px;
    }
  }
  .productprice{
    font-size: 16px;color: red;line-height: 22px;
  }
}





</style>