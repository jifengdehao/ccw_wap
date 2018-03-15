/*
 * @Author: WuFengliang
 * @Date: 2018-01-02 10:57:33
 * DeveloperMailbox:   wufengliang@ccw163.com
 * FunctionPoint:  mutations
 */

import {setStore, getStore, removeStore} from './util'
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
  },
  // 保存购物车数据
  [types.SET_SHOP_CART](state, shopCart) {
    setStore('shopCart', JSON.stringify(shopCart))
    state.shopCart = shopCart
  },
  // 添加购物车
  [types.ADD_SHOP_CART](state, product) {
    state.shopCart.push(product)
    setStore('shopCart', JSON.stringify(state.shopCart))
  },
  // 选中或者修改的地址
  [types.SET_ADDMODRESS](state, addmodress) {
    state.addmodress = addmodress
  },
  // 优惠卷
  [types.SET_ISOPENCOUPON](state, isOpenCoupon) {
    state.isOpenCoupon = isOpenCoupon
  },
  // 下载App弹窗
  [types.SET_ISOPENTOPBAR](state, isOpenTopBar) {
    state.isOpenTopBar = isOpenTopBar
  }
}
