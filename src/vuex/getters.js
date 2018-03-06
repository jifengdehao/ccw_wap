/*
 * @Author: WuFengliang
 * @Date: 2018-01-02 11:30:04
 * DeveloperMailbox:   wufengliang@ccw163.com
 * FunctionPoint:  getters
 */
import {getStore} from './util'
import state from "./state";


export default {
  name: state => {
    return state.name || getStore(state.name)
  },
  isLogin: state => {
    return state.isLogin || getStore(state.isLogin)
  },
  menuBarH: state => state.menuBarH,
  topBarH: state => state.topBarH,
  location: state => {
    return state.location || JSON.parse(getStore('location'))
  },
  market: state => {
    return state.market || JSON.parse(getStore('market'))
  },
  user: state => {
    return state.user || JSON.parse(getStore('userInfo'))
  }
}
