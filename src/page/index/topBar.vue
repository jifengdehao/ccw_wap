/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：全局顶部弹窗
*/
<template>
  <div class="top-bar" v-if="isOpenTopBar">
    <i class="close" @click.stop="close"></i>
    <div>点击打开按钮立即下载菜城APP</div>
    <button type="button" class="open" @click.stop="open">打开</button>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import {isAndroid} from '@/until/getApp.js'

  const ANDROID = 'http://zhushou.360.cn/detail/index/soft_id/3931033'
  const IOS = 'https://itunes.apple.com/cn/app/%E8%8F%9C%E5%9F%8E/id1290015027?mt=8'

  export default {
    computed: {
      ...mapGetters([
        'isOpenTopBar'
      ])
    },
    methods: {
      close() {
        this.setIsOpenTopBar(false)
        this.$emit('closeTopBar')
      },
      open() {
        if (isAndroid()) {
          location.href = ANDROID
        } else {
          location.href = IOS
        }
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
    line-height: 2.2rem;
    text-align: center;
    font-size: .7rem;
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
