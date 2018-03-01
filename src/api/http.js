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
 * 用户端个人中心
 */
export const getUserCenter = (custId, params) => {
  return http.g(`/personCenter/${custId}`, params)
}

/**
 * 负责人 - By WuFengliang
 */

export const getProducts = params => {
  return http.g(`/productCat/cat`, params)
}

/**
 *  负责人 -By zhangwenlong
 */

/**
 * 2018/1/23
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 入口定位获取菜商场 是否在配送范围内
 */
export const isAddressCover = params => {
  return http.p(`/homePage/isAddressCover`, params)
}
/**
 * 2018/1/23
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 获取附近菜市场列表
 */
export const getNearMarket = params => {
  return http.g(`/homePage/nearMarkets`, params)
}
/**
 * 2018/1/23
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 获取推荐菜市场
 */
export const getRecommendMarkets = params => {
  return http.g(`/homePage/recommendMarkets`, params)
}

/**
 * 2018/1/23
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 轮播图 范围内和不在范围内
 */
export const getBanner = params => {
  return http.g(`/homePage/coverBanners/${params}`)
}

/**
 * 2018/1/24
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 首页获取精选档口
 */

export const getIndexStore = params => {
  return http.g(`/homePage/shopsByMarketId/${params}`)
}
