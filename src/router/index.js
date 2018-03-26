/*
 * @Author: WuFengliang
 * @Date: 2017-12-26 09:13:11
 * DeveloperMailbox:   wufengliang@ccw163.com
 * FunctionPoint:  路由配置导出
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Route from './router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: Route
})
