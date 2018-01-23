/*
 * @Author: WuFengliang 
 * @Date: 2018-01-02 11:40:39 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint:  http相关功能点接口
 */
import * as http from './instance'

/**
 * 负责人 - By WuFengliang
 */

/**
 * 判断手机号是否是平台账户
 */
export const isExist = params => {
  return http.p(`/user/mobileNumber/`, params)
}

/**
 * 根据手机号请求发送验证码
 */
export const sentCode = params => {
  return http.g(`/user/sendCode`, params)
}

/**
 * 手机登陆认证入口
 */
export const userLogin = params => {
  return http.p(`/user/account`, params)
}

/**
 * 用户个人优惠券
 */
export const getCoupon = (customerId, marketId, params) => {
  return http.g(
    `/personCenter/coupon/${customerId}/${marketId}/listCustomer`,
    params
  )
}

/**
 * 负责人 - By WuFengliang
 */

/**
 * 负责人 -By hushangjun
 */ 
/**
 * 获取一级分类列表
 */ 
export const getProductCat = () => {
  return http.g(`/productCat/cat`)
}
/**
 * 获取二级或三级分类列表
 */ 
export const getSecondProductCat = (parentLevel,marketId) => {
  return http.g(`/productCat/secondCat/${parentLevel}/${marketId}`)
}
/**
 * 获取产品id下面的市场的产品列表
 */ 
export const getNearProducts = (marketId,params) => {
  return http.g(`/homePage/nearProducts/${marketId}`,params)
}
 /**
 * 负责人 -By hushangjun
 */ 
