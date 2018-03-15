/*
 * @Author: WuFengliang 
 * @Date: 2018-01-16 15:00:47 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint:  登录模块公共组件
 */

 <template>
  <transition name="fade">
    <div id="login">
      <p class="login-header" v-if="isDownLoad">
        <a @click="isDownLoad=false"></a>
        <span>点击立即下载即可下载菜城APP</span>
        <button>下载</button>
      </p>
      <div class="content-box" :style="{'margin-top':isDownLoad ? '44px':'0'}">
        <scroller height="-44" lock-x ref="scroller">
          <div>
            <slot></slot>
          </div>
        </scroller>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
import { Scroller } from 'vux'
export default {
  name: 'LoginIndex',
  components: { Scroller },
  props: {},
  data() {
    return {
      isDownLoad: true
    }
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
@import '../../common/css/variable.less';
#login {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 2;
  .login-header {
    position: fixed;
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 16px;
    color: #333;
    a {
      display: block;
      position: absolute;
      width: 24px;
      height: 24px;
      top: 10px;
      left: 27px;
      cursor: pointer;
      background-size: 24px 24px;
      background-image: url(../../common/img/login/btn_delete@2x.png);
    }
    &:after {
      display: block;
      content: '';
      width: 100%;
      height: 0;
      border-bottom: 1px solid #e5e5e5;
    }
    button {
      position: absolute;
      top: 12px;
      right: 11.5px;
      width: 50.5px;
      height: 23.6px;
      color: #fad25c;
      background-color: #fff;
      border: 1px solid #fad25c;
      border-radius: 4px;
    }
  }
  .content-box {
    overflow: hidden;
  }
}
</style>
