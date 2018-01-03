/*
 * @Author: WuFengliang 
 * @Date: 2017-12-18 11:55:16 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint: app路由基点 
 */

<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  components: {}
}
</script>
<style lang="css" scoped>

</style>