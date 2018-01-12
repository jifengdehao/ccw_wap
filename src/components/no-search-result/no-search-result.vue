/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：没有查询到结果
*/
<template>
  <div id="no-search-result">
    <div class="no-result">{{title}}</div>
    <div class="hot-search">
      <div class="title vux-1px-b">热门搜索</div>
      <ul class="list">
        <li class="item vux-1px">鸡肉</li>
        <li class="item vux-1px">西红柿</li>
        <li class="item vux-1px">西红柿</li>
        <li class="item vux-1px">西红柿</li>
        <li class="item vux-1px">西红柿</li>
        <li class="item vux-1px">西红柿</li>
        <li class="item vux-1px">西红柿</li>
        <li class="item vux-1px">西红柿</li>
        <li class="item vux-1px">西红柿</li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      hotSearch: {
        type: Array,
        default: null
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import '~vux/src/styles/1px.less';

  #no-search-result {
    .no-result {
      margin: 1.5rem 0 2.1rem 0;
      font-size: .7rem;
      text-align: center;
      color: #999999;
    }
    .hot-search {
      padding: 0 .6rem;
      .title {
        padding-bottom: .5rem;
        font-size: .6rem;
        line-height: .85rem;
        color: #999999;
        background: url("../../common/img/common/Hot_search.png") no-repeat left top;
        background-size: .6rem .7rem;
        padding-left: .8rem;
      }
      .list {
        font-size: 0;
        .item {
          height: 1.5rem;
          width: 4.1rem;
          display: inline-block;
          line-height: 1.5rem;
          text-align: center;
          font-size: .6rem;
          margin-right: .35rem;
          box-sizing: border-box;
          margin-top: .6rem;
          &:nth-child(4n) {
            margin-right: 0;
          }
          &:before {
            border-radius: 5rem;
          }
        }
      }
    }
  }
</style>
