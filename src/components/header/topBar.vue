/*
 * @Author: WuFengliang 
 * @Date: 2018-01-03 10:00:24 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint:  顶部导航菜单
 */
 <template>
   <div class="top-bar">
     {{$route.name}}
     <img src="../../common/img/common/back.png" />
   </div>
 </template>
 <script>
export default {}
</script>
 <style lang="css" scoped>
.top-bar {
  width: 100%;
  height: 2.2rem;
  line-height: 2.2rem;
  background-color: #fff;
  text-align: center;
  font-size: 0.9rem;
  color: #222;
  border-bottom: 1px solid #e5e5e5;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}

.top-bar img {
  width: 1rem;
  height: 1rem;
  vertical-align: middle;
  position: fixed;
  top: 12px;
  left: 12px;
}
</style>
 
 
