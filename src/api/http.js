/*
 * @Author: WuFengliang 
 * @Date: 2018-01-02 11:40:39 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint:  http相关功能点接口
 */
import * as http from './instance'

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
