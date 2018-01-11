/*
 * @Author: WuFengliang
 * @Date: 2018-01-03 10:00:24
 * DeveloperMailbox:   wufengliang@ccw163.com
 * FunctionPoint:  顶部导航菜单
 */
 <template>
   <div class="top-bar">
     {{$route.name}}
     <img @click="goBack" src="../../common/img/common/back.png" />
   </div>
 </template>
 <script>
export default {
  name: 'topBar',
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>
 <style lang="less" scoped>
@import '../../common/css/mixin.less';
.top-bar {
  width: 100%;
  height: 44px;
  line-height: 44px;
  background-color: #fff;
  text-align: center;
  font-size: 18px;
  color: #222;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  .border-1px(#e5e5e5);
}

.top-bar img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  position: fixed;
  top: 12px;
  left: 12px;
}
</style>


