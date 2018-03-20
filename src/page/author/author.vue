<script src="../../router/router.js"></script>/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：微信授权中间件
*/
<template>
</template>
<script type="text/ecmascript-6">
  export default {
    created() {
      this.webChatLogin()
    },
    methods: {
      //判断是否微信登陆 是不是微信浏览器
      isWeiXin() {
        let ua = window.navigator.userAgent.toLowerCase()
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          return true
        } else {
          return false
        }
      },
      webChatLogin() {
        if (this.isWeiXin()) {
          console.log(1)
          this.$router.push('/') // 微信登录页
          /*
          //微信登录，接口由后台定义
          this.$http.get('/wx/index/login/type/2').then((res) => {
            if (res.data.code == 0) {   //微信登录成功跳转个人中心
              console.log(res.data)
              this.$router.push('/')
            } else {                //微信登录失败，使用填写信息登录
              this.$router.push('/login')
            }
          })
          */
        } else {
          this.$router.push('/login')  // h5登录
        }
      }
    }
  }
</script>
