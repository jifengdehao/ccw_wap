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
        <div class="bg"><img src="../../common/img/login/login_img.png" /></div>
        <div class="main-box" ref="mainBox">
          <div class="write-box telphone">
            <i></i>
            <input type="number" placeholder="请输入您的手机号码" ref="telphone" v-model="mobileNumber" maxlength="11">
          </div>
          <div class="write-box verification">
            <div>
              <i></i>
              <input type="text" placeholder="验证码" ref="verification" v-model="loginParams.code">
            </div>
            <button :class="{'active':isActive}" @click="isTelPhone">{{words}}</button>
          </div>
        </div>
        <div class="operate" @click="userLogin"><button>立即加入</button></div>
      </div>
    </login-slot>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { Toast, Scroller } from 'vux'
import * as http from '@/api/http'
import loginSlot from './loginSlot'
import { setTimeout, clearInterval } from 'timers'
import topBarVue from '../../components/header/topBar.vue'
export default {
  name: 'LoginIndex',
  components: { loginSlot, Toast, Scroller },
  props: {},
  data() {
    return {
      mobileNumber: '', //  手机号
      words: '获取验证码', //  验证码文字
      timer: null, // 定时器句柄
      telRegExp: /^[1][3,4,5,7,8][0-9]{9}$/, //  手机号正则
      sentParams: {
        mobileno: '',
        type: 2
      }, //  发送验证码相关参数
      loginParams: {
        code: '',
        mobileno: ''
      },
      isActive: false //  是否发送验证码
    }
  },
  created() {
    this.checkIsLogin()
  },
  mounted() {},
  activited: {},
  update: {},
  beforeRouteUpdate: {},
  methods: {
    ...mapMutations(['SET_LOGININFO']),
    //  检测当前是否登录
    checkIsLogin() {
      if (this.$store.state.loginInfo != null) {
        this.$router.back()
      }
    },
    //  判断是否是合法手机号
    isTelPhone() {
      if (this.telRegExp.test(this.mobileNumber)) {
        this.$vux.toast.text('正在发送验证码', 'middle') //  toast弹框
        sessionStorage.setItem('mobileNumber', this.mobileNumber)
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
      if (this.telRegExp.test(this.mobileNumber)) {
        this.sentParams.mobileno = this.mobileNumber
        http.sentCode(this.sentParams).then(data => {
          
        })
      }
    },
    //  登录
    userLogin() {
      this.loginParams.mobileno = this.mobileNumber
      http.userLogin(this.loginParams).then(response => {
        if (response.code == 200) {
          let loginInfo = JSON.stringify(response.data)
          this.SET_LOGININFO(loginInfo)
          sessionStorage.setItem('userInfo', JSON.stringify(loginInfo))
          this.$router.push('/home')
        }
      })
    }
  },
  filter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" scoped>
.bg {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 10.5rem;
  padding-top: 0.45rem;
  padding-bottom: 1rem;
  img {
    width: 13.8rem;
  }
}

.main-box {
  width: 100%;
  height: 6.65rem;
  margin-bottom: 0.25rem;
  .write-box {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 16.5rem;
    height: 2.2rem;
    border: 1px solid #ccc;
    margin: 0 auto 0.8rem;
    &:after {
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      content: '';
      width: 100%;
      height: 0;
    }
    &.telphone {
      i {
        display: inline-block;
        width: 11px;
        height: 17px;
        margin-left: 15px;
        background-size: 11px 17px;
        background-image: url(../../common/img/login/iPhone.png);
      }
      input {
        flex-grow: 1;
      }
    }
    &.verification {
      border: 0;
      div {
        display: flex;
        flex-grow: 1;
        width: 11.2rem;
        height: 100%;
        align-items: center;
        border: 1px solid #ccc;
        i {
          display: inline-block;
          width: 17px;
          height: 17px;
          margin-left: 15px;
          background-size: 17px 17px;
          background-image: url(../../common/img/login/verification@2x.png);
        }
      }

      button {
        box-sizing: border-box;
        width: 5rem;
        height: 2.2rem;
        font-size: 16px;
        margin-left: 7px;
        color: #ffbd52;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 2px;
        &.active {
          color: #fff;
          background-color: #bbb;
        }
      }
    }
    input[type='text'],
    input[type='number'] {
      text-indent: 10px;
      color: #bbb;
      font-size: 18px;
    }
    input[type='number'] {
      text-indent: 12px;
    }
  }
}

.operate {
  width: 100%;
  text-align: center;
  button {
    width: 16.5rem;
    height: 2.2rem;
    font-size: 18px;
    color: #fff;
    line-height: 2.2rem;
    background: #ffbd52;
    border-radius: 4px;
    margin: auto;
  }
}
</style>
