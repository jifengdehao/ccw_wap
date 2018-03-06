/*
 * @Author: WuFengliang
 * @Date: 2018-01-02 10:57:33
 * DeveloperMailbox:   wufengliang@ccw163.com
 * FunctionPoint:  mutations
 */

import {setStore, getStore, removeStore} from './util'
import * as types from './mutation-types'

export default {
  //  是否登录
  IS_LOGIN(state, content) {
    state.isLogin = state.name ? true : false
    if (!state.isLogin) return
    setStore('userInfo', content)
  },
   // 修改loding状态
  updateLoadingStatus(state, status) {
    state.isLoading.status = status.status;
    state.isLoading.text = status.text;
  },
  // 保存位置信息
  [types.SET_LOCATION](state, location) {
    setStore('location', JSON.stringify(location))
    state.location = location
  },
  // 保存菜市场
  [types.SET_MARKET](state, market) {
    setStore('market', JSON.stringify(market))
    state.market = market
  }
}

