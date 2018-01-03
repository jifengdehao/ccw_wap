/*
 * @Author: WuFengliang 
 * @Date: 2018-01-02 10:57:33 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint:  mutations
 */

import { setStore, getStore, removeStore } from './util'

export default {
  //  是否登录
  IS_LOGIN(state, content) {
    state.isLogin = state.name ? true : false
    if (!state.isLogin) return
    setStore('userInfo', content)
  }
}
