/*
 * @Author: WuFengliang
 * @Date: 2018-01-02 10:57:33
 * DeveloperMailbox:   wufengliang@ccw163.com
 * FunctionPoint:  mutations
 */

import { setStore, getStore, removeStore } from './util'
import * as types from './mutation-types'

export default {
  //  设置登录信息
  SET_LOGININFO(state, loginInfo) {
    state.loginInfo = loginInfo
  },
  //  设置登录手机号码
  SET_LOGINPHONE(state, phone) {
    state.loginParams.mobileNumber = phone
  },
  [types.SET_LOCATION](state, location) {
    state.location = location
  },
  [types.SET_MARKET](state, market) {
    state.market = market
  }
}
