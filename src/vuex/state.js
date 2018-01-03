/*
 * @Author: WuFengliang 
 * @Date: 2018-01-02 10:57:44 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint:  state
 */
let percent = document.documentElement.clientWidth / 375 * 20

export default {
  name: '', //  登录名
  isLogin: false, //  是否登录
  menuBarH: percent + 1, //  底部菜单栏高度
  topBarH: percent * 2.2 //  顶部菜单高度
}
