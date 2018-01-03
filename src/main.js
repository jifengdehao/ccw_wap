import Vue from 'vue'
import routes from '@/router/index'
import route from '@/router/index'
import App from './App'
import store from '@/vuex/'
import '@/common/js/rem'
import FastClick from 'fastclick' //  移动端点击延迟300ms
import '@/common/css/reset.css' //  重置CSS

if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    function() {
      FastClick.attach(document.body)
    },
    false
  )
}

new Vue({
  el: '#app',
  router: route,
  store,
  render: h => h(App)
})
