/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：搜索商品
*/
<template>
  <div class="goods">
    <template v-if="searchResult">
      <div class="tab border-1px">
        <div class="tab-item" :class="{'active':selectType===0}" @click="select(0)">综合排序<span class="icon"></span>
        </div>
        <div class="tab-item" :class="{'active':selectType===1}" @click="select(1)">价格<span class="icon"></span>
        </div>
        <div class="tab-item" :class="{'active':selectType===2}" @click="select(2)">销量</div>
        <div class="tab-item" :class="{'active':selectType===3}" @click="select(3)">评价</div>
      </div>
      <div class="content">
        <scroll>
          <div>
            <goods-list @selectSpec="selectSpec"></goods-list>
          </div>
        </scroll>
      </div>
      <show-cart></show-cart>
    </template>
    <template v-else>
      <no-search-result :title="noSearchResultTitle"></no-search-result>
    </template>
  </div>
</template>
<script type="text/ecmascript-6">
  import goodsList from '@/components/goods-list/goods-list'
  import showCart from '@/components/show-cart/show-cart'
  import Scroll from '@/components/scroll/scroll'
  import noSearchResult from '@/components/no-search-result/no-search-result'

  export default {
    data() {
      return {
        selectType: 0,
        searchResult: '123',
        noSearchResultTitle: '抱歉，未能找到您搜索的商品'
      }
    },
    components: {
      goodsList,
      showCart,
      Scroll,
      noSearchResult
    },
    methods: {
      selectSpec(item) {
        console.log(item)
      },
      select(type) {
        console.log(type)
        this.selectType = type
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import "../../common/css/mixin";

  .goods {
    .content {
      position: absolute;
      top: 6.4rem;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
    }
    .tab {
      height: 2rem;
      line-height: 2rem;
      display: flex;
      background: #FAFAFA;
      .border-1px();
      .tab-item {
        flex: 1;
        color: #999999;
        font-size: .6rem;
        text-align: center;
        .icon {
          display: inline-block;
          width: 12px;
          height: 6px;
          background: url("../../common/img/common/up_ic.png") no-repeat center;
          background-size: 6px 3px;
        }
      }
      .active {
        color: #333333;
      }
    }
  }
</style>
