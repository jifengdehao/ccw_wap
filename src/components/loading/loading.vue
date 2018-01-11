/**
*
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能: 全局loading
*/
<template>
  <div class="loading-container">
    <div class="loading">
      <img width="24" height="24" src="./loading.gif">
      <p class="desc">{{title}}</p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    .loading {
      width: 100%;
      text-align: center;
      .desc {
        line-height: 20px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
</style>
