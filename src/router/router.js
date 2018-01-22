/*
 * @Author: WuFengliang
 * @Date: 2017-12-18 15:46:22
 * DeveloperMailbox:   wufengliang@ccw163.com
 * FunctionPoint: 路由地址
 */

const anyscComponent = name => {
    //  异步加载组件
    return resolve => require([`@/${name}`], resolve)
}

const menuBar = anyscComponent('components/footer/menuBar') //  底部菜单栏

const loginIndex = anyscComponent('page/login/loginIndex') //  登录模块主页

const homeIndex = anyscComponent('page/home/homeIndex') //  首页模块主页

const Location = anyscComponent('page/location/location') // 位置

const Search = anyscComponent('page/search/search') // 搜索

const SearchGoods = anyscComponent('page/search/goods') // 搜索商品

const SearchSellers = anyscComponent('page/search/sellers') // 搜索档口

const addAddress = anyscComponent('page/add-address/add-address') //新增地址

const shopInfo = anyscComponent('page/product/shopInfo') //  店铺详情shopProduct

const qualification = anyscComponent('page/product/productComponents/qualification') //  店铺详情shopProdutComponentsponnet

const shopProduct = anyscComponent('page/product/shopProduct') //  店铺产品

const productIndex = anyscComponent('page/product/productIndex') //  产品模块主页

const productInfoList = anyscComponent('page/product/productInfoList') //  二级分类下的商品列表

const cartIndex = anyscComponent('page/cart/cartIndex') //  购物车模块主页
const cartSettlementPage = anyscComponent('page/cart/settlementPage') // 购物车结算页面
const cartmyCoupon = anyscComponent('page/cart/cart_my_coupon') //  我的优惠券
const paymentSuccess = anyscComponent('page/cart/payment_success') // 支付成功页面
const cartMyProduct = anyscComponent('page/cart/cart_my_product') // 我的购买商品页面

const mineIndex = anyscComponent('page/mine/mineIndex') //  个人中心模块主页
const myCoupon = anyscComponent('page/mine/myCoupon') //  我的优惠券


export default [
  {
    path: '/',
    redirect: { path: '/home' }
  },
  {
    path: '/home',
    name: '首页',
    component: homeIndex
  },
  {
    path: '/search',
    name: '搜索',
    component: Search,
    redirect: '/search/goods',
    children: [
      {
        path: 'goods',
        component: SearchGoods
      },
      {
        path: 'sellers',
        component: SearchSellers
      }
    ]
  },
  {
    path: '/location',
    name: '位置',
    component: Location
  },
  {
    path: '/product',
    name: '产品分类',
    component: productIndex
  },
  {
    path: '/shopProduct',
    name: '店铺商品',
    component: shopProduct
  },
  {
    path: '/shopInfo',
    name: '店铺详情',
    component: shopInfo
  },
  {
    path: '/qualification',
    component: qualification
  },
  {
    path: '/productInfoList',
    name: '二级分类商品列表',
    component: productInfoList
  },
  {
    path: '/cart',
    name: '购物车',
    component: cartIndex
  },
  {
    path: '/cartMyCoupon',
    name: '选择优惠券',
    component: cartmyCoupon
  },
  {
    path: '/settlementPage',
    name: '填写订单',
    component: cartSettlementPage
  },
  {
    path: '/paymentSuccess',
    name: '订单支付成功',
    component: paymentSuccess
  },
  {
    path: '/cartMyProduct',
    name: '商品列表',
    component: cartMyProduct
  },
  {
    path: '/mine',
    name: '个人中心',
    component: mineIndex
  },
  {
    path: '/myCoupon',
    name: '我的优惠券',
    component: myCoupon
  },
  {
    path: '/login',
    name: '登录',
    meta: true,
    component: loginIndex
  },
  {
    path: '/addAddress',
    name: '新增地址',
    component: addAddress
  }
]
