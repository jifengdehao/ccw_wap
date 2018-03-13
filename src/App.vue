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
    data() {
      return {
        isWebchatBool: false, //  是否是微信登录
        token: null
      }
    },
    watch: {
//      '$route'(to, from) {
//        if (to.fullPath === '/addAddress' && from.fullPath === '/address') {
//          this.setAddmodress(null)
//        }
//      }
    },
    created() {
      this.isWebchat()
      let loginInfo = null

      if (this.$store.state.loginInfo) {
        loginInfo = JSON.parse(this.$store.state.loginInfo)
      } else {
        loginInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        this.setLogininfo(loginInfo)
      }
      this.token = JSON.parse(loginInfo)
      if (this.token != null) {
        this.setLogininfo(this.token)
        //  do something
        if (this.$route.path == '/login' || this.$route.path == '/webchat') {
          this.$router.push('/home')
        }
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
      },
      // ...mapMutations(['SET_LOGININFO', 'SET_ADDMODRESS'])
      // vux 设置或保存修改的地址
      ...mapMutations({
        setAddmodress: 'SET_ADDMODRESS',
        setLogininfo: 'SET_LOGININFO'
      })
    }
  }
</script>
