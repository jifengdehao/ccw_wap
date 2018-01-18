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
  menuBarH: ((percent * 2.45 + 1) * -1).toString(), //  底部菜单栏高度
  topBarH: (percent * -2.2).toString(), //  顶部菜单高度
  isLoading: {
    status: false,  // 是否显示loading
    text: ''  // 显示loading时的文字
  },    
  loginParams: {
    isActive: false, //  是否已经开始发送验证码
    times: 60, //  发送验证码秒数
    mobileNumber: '' //  手机号
  }
}
