import Vue from 'vue'
import route from '@/router/index'
import App from './App'
import store from '@/vuex/'
import '@/common/js/rem'
import fastclick from 'fastclick' //  移动端点击延迟300ms
import VueLazyload from 'vue-lazyload' // 懒加载
import '@/common/css/reset.less' //  重置CSS
import 'mescroll.js/mescroll.min.css'
import { ToastPlugin } from 'vux'


fastclick.attach(document.body)

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
