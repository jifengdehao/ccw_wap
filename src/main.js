import Vue from 'vue'
import route from '@/router/index'
import App from './App'
import store from '@/vuex/'
import '@/common/js/rem'
import FastClick from 'fastclick' //  移动端点击延迟300ms
import VueLazyload from 'vue-lazyload' // 懒加载
import '@/common/css/reset.less' //  重置CSS
import 'mescroll.js/mescroll.min.css'
import {ToastPlugin} from 'vux'


document.addEventListener('DOMContentLoaded', function () {
  FastClick.attach(document.body)
}, false)

Vue.use(VueLazyload, {   // 懒加载
  loading: require('@/assets/logo.png')
})
route.beforeEach((to, from, next) => {
  let path = to.path.substr(1)
  let user = JSON.parse(sessionStorage.getItem('user'))  // 验证是否已经登录
  if (path !== 'login') {
    if (!user) {
      next('/login')
      return false
    }
  } else {
    if (user) {
      next('/')
      return false
    }
  }
  next()
})
route.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
Vue.use(ToastPlugin) //  toast弹框

new Vue({
  el: '#app',
  router: route,
  store,
  render: h => h(App)
})
