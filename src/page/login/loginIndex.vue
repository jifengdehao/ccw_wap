/*
* @Author: WuFengliang
* @Date: 2017-12-26 09:22:11
* DeveloperMailbox:   wufengliang@ccw163.com
* FunctionPoint:  登录模块首页
*/
<template>
  <div>
    <login-slot>
      <div>
        <div class="bg"><img src="../../common/img/login/login_img.png"/></div>
        <div class="main-box" ref="mainBox">
          <div class="write-box telphone">
            <i></i>
            <input type="number" placeholder="请输入您的手机号码" ref="telphone" v-model.trim="loginParams.mobileno"
                   maxlength="11">
          </div>
          <div class="write-box verification">
            <i></i>
            <input type="text" placeholder="验证码" ref="verification" v-model.trim="loginParams.code">
            <button :class="{'active':isActive}" @click="isTelPhone" :disabled="isActive">{{words}}</button>
          </div>
        </div>
        <div class="operate" @click="userLogin">
          <button>立即加入</button>
        </div>
      </div>
    </login-slot>
  </div>
</template>
<script type="text/ecmascript-6">
  import {isWebchat} from '@/until/getApp.js'
  import {mapMutations} from 'vuex'
  import {Toast} from 'vux'
  import * as http from '@/api/http'
  import loginSlot from './loginSlot'
  import {setTimeout, clearInterval} from 'timers'

  export default {
    name: 'LoginIndex',
    components: {loginSlot, Toast},
    data() {
      return {
        words: '获取验证码', //  验证码文字
        timer: null, // 定时器句柄
        telRegExp: /^[1][3,4,5,7,8][0-9]{9}$/, //  手机号正则
        sentParams: {
          mobileno: '', // 验证码手机
          type: 2        // 类型
        }, //  发送验证码相关参数
        loginParams: {
          code: '',  // 验证码
          mobileno: '' // 手机号
        },
        isActive: false //  是否发送验证码
      }
    },
    methods: {
      // vuex 保存用户登录信息
      ...mapMutations(['SET_USER']),
      //  判断是否是合法手机号
      isTelPhone() {
        if (this.telRegExp.test(this.loginParams.mobileno)) {
          this.$vux.toast.text('正在发送验证码', 'middle') //  toast弹框
          this.runClock()
          this.sendCode()
        } else {
          this.$vux.toast.text('请输入正确的手机号码', 'middle')
        }
      },
      //  定时器是否开启
      runClock() {
        let times = 60
        this.isActive = true
        this.timer = setInterval(() => {
          this.words = `${times--}s`
          if (times < 0) {
            this.isActive = false
            this.words = '获取验证码'
            window.clearInterval(this.timer)
          }
        }, 1000)
      },
      //  发送验证码
      sendCode() {
        if (this.telRegExp.test(this.loginParams.mobileno)) {
          this.sentParams.mobileno = this.loginParams.mobileno
          http.sentCode(this.sentParams).then(res => {
            if (res.code === 200) {
              console.log(res.data)
            }
          })
        }
      },
      //  登录
      userLogin() {
        http.userLogin(this.loginParams).then(res => {
          if (res.code == 200) {
            this.SET_USER(res.data)
            this.$router.push('/home')
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped type="text/less">
  .bg {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 9.82rem;
    padding-top: 3.45rem;
    background-size: 16.4rem auto;
    img {
      width: 16.4rem;
    }
  }

  .main-box {
    position: fixed;
    top: 16.05rem;
    left: 0;
    width: 100%;
    height: 6.65rem;
    .write-box {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 14.25rem;
      height: 2.25rem;
      margin: auto;
      &:after {
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        content: '';
        width: 100%;
        height: 0;
        border-bottom: 1px solid #e5e5e5;
      }
      &.telphone {
        i {
          display: inline-block;
          width: 11px;
          height: 17px;
          background-size: 11px 17px;
          background-image: url(../../common/img/login/iPhone.png);
        }
        input {
          flex-grow: 1;
        }
      }
      &.verification {
        i {
          display: inline-block;
          width: 17px;
          height: 17px;
          background-size: 17px 17px;
          background-image: url(../../common/img/login/verification@2x.png);
        }
        button {
          position: absolute;
          right: 0;
          width: 3.5rem;
          height: 1.4rem;
          font-size: 12px;
          color: #fff;
          background-color: #ffbd52;
          border-radius: 2px;
          &.active {
            background-color: #bbb;
          }
        }
      }
      input[type='text'],
      input[type='number'] {
        margin-left: 10px;
        font-size: 14px;
        color: #bbb;
      }
      input[type='number'] {
        text-indent: 6px;
      }
    }
  }

  .operate {
    position: fixed;
    top: 22.7rem;
    left: 0;
    width: 100%;
    text-align: center;
    button {
      width: 14.25rem;
      height: 2.2rem;
      font-size: 18px;
      color: #fff;
      line-height: 2.2rem;
      background: linear-gradient(left bottom, #ff9367, #ffe294);
      box-shadow: 0 4px 12px 3px #ffe5b6;
      border-radius: 5.25rem;
      margin: auto;
    }
  }
</style>
