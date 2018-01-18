/*
 * @Author: WuFengliang 
 * @Date: 2018-01-16 20:04:03 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint:  登录模块 - 升级Vip
 */
<template>
  <div>
    <login-slot>
      <scroller height="-40" lock-x >
        <div class="invite-box">
          <!-- 小头像 -->
          <img src="" class="small-logo">          
          <!-- 小头像 -->

          <!-- 买菜按钮 -->
          <button class="buy-vegetables"></button>
          <!-- 买菜按钮 -->   
          
          <!-- 升级VIP -->
          <button class="upgrade-vip"></button>
          <!-- 升级VIP -->

          <!-- 用户文字 -->
          <p class="member-words"><span>小明</span>用户，您现在为菜城会员</p>
          <!-- 用户文字 -->

          <!-- 大头像 大按钮 -->
          <div class="big-userInfo">
            <img src="" class="big-logo"/>
          </div>
          <!-- 大头像 大按钮 -->          
        </div>                         
      </scroller>
    </login-slot>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Scroller } from 'vux'
import loginSlot from './loginSlot'
export default {
  name: 'LoginIndex',
  components: { loginSlot, Scroller },
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  activited: {},
  update: {},
  beforeRouteUpdate: {},
  methods: {},
  filter: {},
  computed: {
    ...mapGetters(['name'])
  },
  watch: {}
}
</script>
<style lang="less" scoped>
.invite-box {
  width: 100%;
  height: 134.9rem;
  position: relative;
  background-size: 100% auto;
  background-image: url(../../common/img/login/invite.png);
  img.small-logo {
    position: absolute;
    width: 2.78rem;
    height: 2.78rem;
    border-radius: 50%;
    background-color: #f00;
    top: 1.425rem;
    left: 1.5rem;
  }
  button {
    position: absolute;
    width: 7.2rem;
    height: 2.2rem;
    left: 5.78rem;
    border-radius: 1.8rem;
    &.buy-vegetables {
      top: 6.19rem;
      background-color: transparent;
    }
    &.upgrade-vip {
      top: 9.49rem;
      background-color: transparent;
    }
  }
  p.member-words {
    position: absolute;
    top: 34.525rem;
    left: 4.9rem;
    display: block;
    font-size: 14px;
    line-height: 14px;
    color: #ff9829;
    letter-spacing: -0.13px;
  }
  div.big-userInfo {
    position: absolute;
    top: 122.825rem;
    left: 1.25rem;
    width: 16.25rem;
    height: 4.55rem;
    border-radius: 6.5rem;
    background-color: transparent;
    img {
      position: absolute;
      top: 0.7rem;
      left: 2.3rem;
      width: 3.2rem;
      height: 3.2rem;
      background-color: #000;
      border-radius: 1.28rem;
    }
  }
}
</style>
