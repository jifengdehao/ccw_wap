import Vue from 'vue'
import route from '@/router/index'
import App from './App'
import store from '@/vuex/'
import '@/common/js/rem'
import FastClick from 'fastclick' //  移动端点击延迟300ms
import VueLazyload from 'vue-lazyload' // 懒加载
import '@/common/css/reset.less' //  重置CSS
import 'mescroll.js/mescroll.min.css'
import VueScroll from 'better-scroll-list'
import { ToastPlugin } from 'vux'

Vue.use(VueScroll)

if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    function() {
      FastClick.attach(document.body)
    },
    false
  )
}
Vue.use(VueLazyload, {   // 懒加载
  loading: require('@/assets/logo.png')
})

Vue.use(ToastPlugin) //  toast弹框

new Vue({
  el: '#app',
  router: route,
  store,
  render: h => h(App)
})
