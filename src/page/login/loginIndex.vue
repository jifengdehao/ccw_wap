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
        <div class="main-box">
          <div class="write-box telphone">
            <i></i>
            <input type="number" placeholder="请输入您的手机号码" v-model="mobileNumber" maxlength="11">
          </div>
          <div class="write-box verification">
            <i></i>
            <input type="text" placeholder="验证码" v-model="loginParams.code">
            <button :class="{'active':$store.state.loginParams.isActive}" @click="isTelPhone">{{words}}</button>
          </div>
        </div>
        <div class="operate" @click="userLogin">立即加入</div>
      </div>
    </login-slot>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Toast } from 'vux'
import * as http from '@/api/http'
import loginSlot from './loginSlot'
export default {
  name: 'LoginIndex',
  components: { loginSlot, Toast },
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
      }
    }
  },
  created() {},
  mounted() {},
  activited: {},
  update: {},
  beforeRouteUpdate: {},
  methods: {
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
        this.$vux.toast.text('手机号码不正确', 'middle')
      }
    },
    //  定时器是否开启
    runClock() {
      let times = null
      if (typeof sessionStorage.getItem('times') == 'object') {
        //  没有设置times值
        times = this.$store.state.loginParams.times
      } else {
        if (parseInt(sessionStorage.getItem('times')) < 0) {
          return
        }
        this.$store.state.loginParams.times = times = parseInt(
          sessionStorage.getItem('times')
        )
      }
      this.timer = setInterval(() => {
        if (times <= 1) {
          this.words = '获取验证码'
          this.$store.state.loginParams = {
            times: 60,
            isActive: false
          }
          sessionStorage.removeItem('isActive')
          sessionStorage.removeItem('times')
          clearInterval(this.timer)
          return
        }
        this.words = `${times}s`
        this.$store.state.loginParams.times = times = parseInt(times) - 1
        this.$store.state.loginParams.isActive = true
        sessionStorage.setItem('times', times)
        sessionStorage.setItem('isActive', true)
      }, 1000)
    },
    //  发送验证码
    sendCode() {
      if (this.telRegExp.test(this.mobileNumber)) {
        this.sentParams.mobileno = this.mobileNumber
        http.sentCode(this.sentParams).then(data => {
          console.log(data)
        })
      }
    },
    //  登录
    userLogin() {
      this.loginParams.mobileno = this.mobileNumber
      http.userLogin(this.loginParams).then(response => {
        if (response.code == 200) {
          let loginInfo = JSON.stringify(response.data)
          this.$store.state.loginInfo = loginInfo
          sessionStorage.setItem('userInfo', JSON.stringify(loginInfo))
          this.$router.push('/home')
        }
      })
    }
  },
  filter: {},
  computed: {
    ...mapGetters(['name'])
  },
  watch: {}
}
</script>
<style lang="less" scoped>
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
  margin-top: 2.78rem;
  height: 6.65rem;
  .write-box {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 14.25rem;
    height: 2.25rem;
    line-height: 2.25rem;
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
  width: 14.25rem;
  height: 2.2rem;
  line-height: 2.2rem;
  text-align: center;
  font-size: 18px;
  color: #fff;
  background: linear-gradient(left bottom, #ff9367, #ffe294);
  box-shadow: 0 4px 12px 3px #ffe5b6;
  border-radius: 5.25rem;
  margin: auto;
}
</style>
