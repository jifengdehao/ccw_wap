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
export default {
  name: 'app',
  data() {
    return {
      isWebchatBool: false //  是否是微信登录
    }
  },
  created() {
    this.isWebchat()
    let loginInfo =
      this.$store.state.loginInfo || sessionStorage.getItem('userInfo')

    let token = JSON.parse(JSON.parse(loginInfo))

    if (token != null && token.authParam.token.length > 0) {
      //  don't something
    } else {
      if (this.isWebchatBool) {
        //  微信内置浏览器登录
        this.$router.push('/webchat')
      } else {
        //  H5登录
        this.$router.push('/login')
      }
    }
  },
  methods: {
    //  是否是微信登录
    isWebchat() {
      let ua = window.navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        this.isWebchatBool = true
      }
      this.isWebchatBool = false
    }
  }
}
</script>
