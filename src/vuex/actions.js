/*
 * @Author: huShangJun 
 * @Date: 2018-01-18 10:15:22 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 异步修改state
 */
export default {
  startLoding({state, commit},status){
    commit('updateLoadingStatus', status)
  },
}