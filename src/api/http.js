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
/**
 * 2018/2/22
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 首页商品搜索(猜你喜欢)
 */
export const getLikeProductsData = (params, marketId) => {
  return http.g(`/homePage/hotSaleProducts/${marketId}`, params)
}
/**
 * 2018/2/22
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 首页店铺搜索(猜你喜欢)
 */
export const getLikeSellersData = (params, marketId) => {
  return http.g(`/homePage/hotShops/${marketId}`, params)
}

/**
 * 2018/2/23
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 商品详情
 */
export const getProductDetails = productId => {
  return http.g(`/homePage/productDesc/${productId}`)
}
/**
 * 2018/2/23
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 商品评价
 */
export const getProductRemarks = productId => {
  return http.g(`/homePage/productRemarks/${productId}`)
}

/**
 * 2018/2/23
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 热门搜索关键子 type ==> 1 店铺关键子 2 商品关键字
 */
export const getHotSearchTag = params => {
  return http.g('/homePage/searchContent/hotSearchTag', params)
}
/**
 * 2018/3/7
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 获取用户收货地址详情
 */
export const getCustomAddressDetails = custId => {
  return http.g(`/homePage/addr/${custId}`)
}

/**
 * 2018/2/23
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 获得用户保存的所有地址
 */
export const getCustomAddress = custId => {
  return http.g(`/homePage/custAddrs/${custId}`)
}
/**
 * 2018/2/23
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 保存收货信息
 */
export const postCustomAddress = params => {
  return http.p('/homePage/addr', params)
}
/**
 * 2018/2/23
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 修改收货地址信息
 */
export const putCustomAddress = params => {
  return http.u('/homePage/addr', params)
}
/**
 * 2018/2/23
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 删除用户收货地址
 */
export const delCustomAddress = (custId, addrId) => {
  return http.p(`/homePage/addr/${custId}/${addrId}`)
}
/**
 * 2018/2/23
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 获取用户默认收货地址
 */
export const getDefaultCustomAddress = (custId, marketId) => {
  return http.g(`/homePage/addr/${custId}/${marketId}`)
}
/**
 * 2018/2/23
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 获取全部配送范围
 */
export const getDeliverArea = (params) => {
  return http.g('/homePage/deliverArea', params)
}
/**
 * 2018/3/5
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 附近商品
 */
export const getSearchNearProduct = (marketId, params) => {
  return http.g(`/homePage/nearProducts/${marketId}`, params)
}
/**
 * 2018/3/5
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 附近档口
 */
export const getSearchNearSeller = (marketId, params) => {
  return http.g(`/homePage/nearShops/${marketId}`, params)
}

/**
 * 2018/3/14
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 领劵中心
 */
export const getCouponListData = (customerId, marketId) => {
  return http.g(`/personCenter/coupon/${customerId}/${marketId}/receiveCore`)
}
/**
 * 2018/3/14
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 领取优惠卷
 */
export const linQuCoupon = (customerId, couponId) => {
  return http.p(`/personCenter/coupon/${customerId}/${couponId}/receive`)
}
