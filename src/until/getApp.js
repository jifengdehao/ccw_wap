/**
 * 2018/3/14
 * author: zhangwenlong
 * email: zhangwenlong@ccw163.com
 * 功能模块: 判断设备是否是安卓
 */
export function isAndroid() {
  let ua = window.navigator.userAgent
  return ua.match(/Android/i) ? true : false
}
