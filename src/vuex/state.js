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
  loginParams: {
    isActive: false, //  是否已经开始发送验证码
    times: 60, //  发送验证码秒数
    mobileNumber: '' //  手机号
  },
  user: null, //  登录的个人信息
  loginInfo: null, //  登录后相关信息
  location: null,   // 位置相关
  market: null,  // 菜市场
  shopCart: [],  // 购物车
  addmodress: null,  // 新增地址保存位置
  isOpenCoupon: true,  // 优惠卷弹窗
  isOpenTopBar: true   // 下载App弹窗
}
