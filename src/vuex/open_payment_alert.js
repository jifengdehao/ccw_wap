/*
 * @Author: ZengFanlu 
 * @Date: 2018-01-17 16:50:26 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 打开支付弹框 
 */

 const state = {
   contPaymentAlertShow: false
 }

 const getters = {
   contPaymentAlertShow: state => state.contPaymentAlertShow
 }

 const actions = {
   // 打开支付弹框
   openPaymentAlert ({commit}) {
     commit('OPEN_PAYMENT_ALERT')
   }
 }

 const mutations = { 
   OPEN_PAYMENT_ALERT (state) {
     state.contPaymentAlertShow = true
   }
}

export default {
  state,
  getters,
  actions,
  mutations
}