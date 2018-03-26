<script src="../../router/router.js"></script>/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：微信授权中间件
*/
<template>
</template>
<script type="text/ecmascript-6">

  const APPID = 'wxc60cdd583ac9b2bd'   // AppID
  const APPSECRET = '30c55b5042ae9a6d43cfc14b874aa6d1' // AppSecret
  const REDIRECT_URI = 'http://b7857g.natappfree.cc/#/author'   // 回调地址
  const SCOPE = 'snsapi_base'  // 用户微信登录的方式 snsapi_base静默登录，snsapi_userinfo请求登录
  const STATE = 'ccw'
  const getCodeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}&state=${STATE}#wechat_redirect`


  export default {
    created() {
      this.webChatLogin()
    },
    methods: {
      //判断是否需要微信登陆 是不是微信浏览器
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
          window.location.href = getCodeUrl
          console.log(getCodeUrl)
          //  this.$router.push('/') // 微信登录页
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
