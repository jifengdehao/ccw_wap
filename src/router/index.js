/*
 * @Author: WuFengliang
 * @Date: 2017-12-26 09:13:11
 * DeveloperMailbox:   wufengliang@ccw163.com
 * FunctionPoint:  路由配置导出
 */
import Vue from 'vue'
import Router from 'vue-router'
import Route from './router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: Route
})
