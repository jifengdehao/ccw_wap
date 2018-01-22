/*
 * @Author: ZengFanlu 
 * @Date: 2018-01-19 11:08:14 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 我的购买商品页面 
 */

<template>
  <div>
    <div class="header">
      <top-bar></top-bar>
    </div>
    <div class="group-item-info">
      <ul>
        <li>
           <div class="pic">
             <img src="../../common/img/cart/payment_wechat.png" alt="">
           </div>
           <div class="group-item-text">
             <p>越南进口红心火龙果2个装大果单果约新鲜水果大果单果</p>
             <p> <span>数量：2</span> <span>约0.5斤/份</span> </p>
             <p>清河水果专卖店</p>
             <p>¥16.8</p>
           </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import topBar from '@/components/header/topBar'
export default {
  components: { topBar },
  data () {
    return {
    }
  },
  // created: {},
  // mounted: {},
  methods: {}
}
</script>
<style lang="less" scoped>
.header { height: 44 / 20rem; }
.group-item-info { position: relative; }
.group-item-info .pic { width: 70.5 / 20rem; height: 70.5 / 20rem; position: absolute; top: 0; left: 0;}
</style>