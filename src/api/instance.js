/*
 * @Author: WuFengliang
 * @Date: 2018-01-02 11:40:58
 * DeveloperMailbox:   wufengliang@ccw163.com
 * FunctionPoint:  axios相关请求方法
 */
import axios from 'axios'
import qs from 'qs'
import hash from 'js-md5'
import Vue from 'vue'
import { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)

let ax = axios.create({
  baseURL: process.env.BASE_API,
  withCredentials: true, // 跨域携带证书
  timeout: 30000,
  headers: {
    CCWTOKEN: '',
    sign: ''
  }
})

const itr = (type, url, params) => {
  if (typeof params !== 'object') {
    params = {}
  }
  let arg = qs.stringify(params)
  if (Object.keys(params).length > 0) {
    url = type === 'get' ? url + '?' + arg : url
  }
  let userInfo = JSON.parse(sessionStorage.getItem('user'))
  let token = ''
  if (userInfo) {
    userInfo = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo
    token = userInfo.authParam.token ? userInfo.authParam.token : ''
  }
  let sign = ''
  if (type === 'get' || type === 'delete') {
    sign = hash(arg + token)
  } else {
    sign = hash(JSON.stringify(params) + token)
  }
  ax.defaults.headers.CCWTOKEN = token
  ax.defaults.headers.sign = sign
  return ax[type](url, params)
}

const base = (type, url, params) => {
  return new Promise((resolve, reject) => {
    itr(type, url, params)
      .then(response => {
        switch (response.data.code) { //  http状态码
          case 200:
            resolve(response.data)
            break
          case 9010:
            Vue.$vux.alert.show({
              title: '提示',
              content: response.data.msg,
              onHide() {
                //  点击确定具体操作
                if(response.data.msg === '用户未登录'){
                  this.$router.push('/login')
                }
              }
            })
            break
          case 9030:
            Vue.$vux.alert.show({
              title: '提示',
              content: response.data.msg,
              onHide() {
                console.log('状态码9030')
              }
            })
            break
          case 9090:
            Vue.$vux.alert.show({
              title: '提示',
              content: '您已在其他设备登录',
              onHide() {
                console.log('状态码9090')
              }
            })
            break
          default:
            Vue.$vux.alert.show({
              title: '提示',
              content: response.data.msg,
              onHide() {
                console.log('response.data.msg')
              }
            })
        }
      })
      .catch(error => {
        Vue.$vux.alert.show({
          title: '提示',
          content: error.msg
        })
        reject(error.data)
      })
  })
}

export const g = (url, params) => {
  return base('get', url, params)
}

export const p = (url, params) => {
  return base('post', url, params)
}

export const d = (url, params) => {
  return base('delete', url, params)
}

export const u = (url, params) => {
  return base('put', url, params)
}
export const pa = (url, params) => {
  return base('patch', url, params)
}

export const op = (url, params) => {
  return base('options', url, params)
}
