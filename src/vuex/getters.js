/*
 * @Author: WuFengliang 
 * @Date: 2018-01-02 11:30:04 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint:  getters
 */
import { getStore } from './util'

export default {
  name: state => {
    return state.name || getStore(state.name)
  },
  isLogin: state => {
    return state.isLogin || getStore(state.isLogin)
  }
}
