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
  // 保存位置信息
  [types.SET_LOCATION](state, location) {
    setStore('location', JSON.stringify(location))
    state.location = location
  },
  // 保存菜市场
  [types.SET_MARKET](state, market) {
    setStore('market', JSON.stringify(market))
    state.market = market
  },
  // 保存登录之后的个人信息
  [types.SET_USER](state, user) {
    setStore('userInfo', JSON.stringify(user))
    state.market = user
  }
}

