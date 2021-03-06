/*
 * @Author: WuFengliang
 * @Date: 2018-01-02 10:57:44
 * DeveloperMailbox:   wufengliang@ccw163.com
 * FunctionPoint:  state
 */
let percent = document.documentElement.clientWidth / 375 * 20

export default {
  menuBarH: ((percent * 2.45 + 1) * -1).toString(), //  底部菜单栏高度
  topBarH: (percent * -2.2).toString(), //  顶部菜单高度
  user: null, //  登录的个人信息
  location: null,   // 位置相关
  market: null,  // 菜市场
  shopCart: null,  // 购物车
  addmodress: null,  // 新增地址保存位置
  isOpenCoupon: true,  // 优惠卷弹窗
  isOpenTopBar: true,   // 下载App弹窗
  isShowSelectMarket: true,

  goodsList:null,//购物车结算后台返回数据
  arrayList:null,//购物车后台返回当前店铺已选择的数据
  recordNum:'',  //订单金额用于查看用户可用优惠券
  couponNum:0,   //选择的优惠券的金额

}
