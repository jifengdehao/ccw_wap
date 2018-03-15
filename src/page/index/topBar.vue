/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：全局顶部弹窗
*/
<template>
  <div class="top-bar" v-if="this.isOpenTopBar">
    <i class="close" @click.stop="close"></i>
    <div>点击打开按钮立即下载菜城APP</div>
    <button type="button" class="open" @click.stop="open">打开</button>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    props: {
      isTopBar: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters([
        'isOpenTopBar'
      ])
    },
    methods: {
      close() {
        this.setIsOpenTopBar(false)
      },
      open() {
        console.log("open")
      },
      ...mapMutations({
        setIsOpenTopBar: 'SET_ISOPENTOPBAR'
      })
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .top-bar {
    height: 2.2rem;
    width: 100%;
    position: fixed;
    line-height: 2.2rem;
    text-align: center;
    font-size: .7rem;
    top: 0;
    left: 0;
    right: 0;
    z-index: 998;
    background: url("../../common/img/topbar/download_bg.png") no-repeat center;
    background-size: contain;
    .close {
      height: 1.1rem;
      width: 1.1rem;
      background: url("../../common/img/topbar/close_ic@2x.png") no-repeat center;
      background-size: contain;
      position: absolute;
      left: .7rem;
      top: .55rem;
      bottom: .55rem;
    }
    .open {
      width: 3rem;
      height: 1.2rem;
      color: #fff;
      position: absolute;
      right: .6rem;
      top: .5rem;
      bottom: .5rem;
      border-radius: .1rem;
      background: #FFBD52 url("../../common/img/topbar/open_ic@2x.png") no-repeat 2.5rem center;
      background-size: .25rem .35rem;
    }
  }
</style>
