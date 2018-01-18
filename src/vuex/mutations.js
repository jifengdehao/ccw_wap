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
  },
   // 修改loding状态
  updateLoadingStatus(state, status) {
    console.log(status.text)
    state.isLoading.status = status.status;
    state.isLoading.text = status.text;
  },
}
