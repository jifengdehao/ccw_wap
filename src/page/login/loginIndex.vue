/*
 * @Author: WuFengliang
 * @Date: 2017-12-26 09:22:11
 * DeveloperMailbox:   wufengliang@ccw163.com
 * FunctionPoint:  登录模块首页
 */
<template>
  <transition name="fade">
    <div class="login">
      <top-bar></top-bar>
      loginIndex
      {{name}}
    </div>
  </transition>
</template>
<script>
import topBar from '../../components/header/topBar'
import { mapGetters } from 'vuex'
export default {
  name: 'LoginIndex',
  components: { topBar },
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
@import '../../common/css/reset.less';
.login {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}
</style>
