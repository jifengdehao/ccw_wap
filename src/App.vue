/*
* @Author: WuFengliang
* @Date: 2017-12-18 11:55:16
* DeveloperMailbox:   wufengliang@ccw163.com
* FunctionPoint: app路由基点
*/

<template>
  <div style="height:100%">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex'

  export default {
    name: 'app',
    watch: {
      '$route'(to, from) {
        if (to.path === '/addAddress' && from.path === '/address') {
          this.setAddmodress(null)
        }
      }
    },
    methods: {
      ...mapMutations({
        setAddmodress: 'SET_ADDMODRESS',
        setLogininfo: 'SET_LOGININFO'
      })
    }
  }
</script>
