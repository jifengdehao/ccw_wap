/*
 * @Author: ZengFanlu 
 * @Date: 2018-01-10 10:55:10 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 购物车弹框 
 */

<template>
  <div class="alert">
    <div class="mask" v-if="contMaskShow">
      <div class="alert-delete" v-if="contDeleteShow">
        <p>是否删除商品</p>
        <div class="alert-button-delete"> <button class="delete">确定</button> <button>取消</button> </div>
      </div>
      <div class="alert-content" v-if="contAddImgShow">
        <div class="alert-item-img"> <img src="../../common/img/cart/comment_cue_ic.png" alt=""> </div>
        <div class="alert-item-text"> <p>请重新勾选弹框</p> <p class="red-text">勾选店铺里面含有已休息店铺 </p><p class="red-text mr24">无法结算</p> </div>
        <div class="alert-button"> <button>确定</button> </div>
      </div>
    </div>
    
  </div>
</template>
<script>
export default {
  name: 'Alert',
  // components: { },
  data () {
    return {
      contAddImgShow: false,
      contDeleteShow: false,
      contMaskShow:  false
    }
  },
  created() { 

  },
  mounted: {

  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.mr24 { margin-bottom: 24px !important; }
.alert { width: 100%; height: 100%; position: relative; }
.mask { width:100%;height:100%;position: fixed;  top: 0; left: 0;display: flex; justify-content: center; align-items: center; background-color: rgba(0,0,0,0.35); z-index:100; }
.alert-content { width: 270 / 20rem; height: 236 / 20rem; background-color: #ffffff; border-radius: 12px; padding: 30px 12px 12px; box-sizing: border-box; }
.alert-content .alert-item-img { width: 52 / 20rem; height: 52 / 20rem; margin:  0 auto; margin-bottom: 12px; }
.alert-content .alert-item-img > img { width: 100%; height: 100%; }
.alert-content .alert-item-text { text-align: center; }
.alert-content .alert-item-text p { font-size: 18px; color: #333333; text-align: center; margin-bottom: 4px; }
.alert-content .alert-item-text p.red-text { text-align: center; font-size: 12px; color: #FF3C00; }
.alert-button { width: 100%; height: 40 / 20rem; background-color: #FFBD52; border-radius: 4px; text-align: center; }
.alert-button button { font-size: 18px; color: #fff; background-color: #FFBD52; line-height: 40 / 20rem; }
.alert-delete { width: 270 / 20rem; height: 120 / 20rem; background-color: #ffffff; border-radius: 14px; }
.alert-delete p { height: 67.5 / 20rem; text-align: center; line-height: 68 / 20rem; border-bottom: 0.5 / 20rem solid #E5E5E5; }
.alert-delete .alert-button-delete { height: 52 / 20rem; }
.alert-delete .alert-button-delete button { width: 134 / 20rem; line-height: 52 / 20rem; background-color: #ffffff; font-size: 18px; color: #333333; float: left; border-radius: 14px; }
.delete { color: #FFBD52 !important; border-right: 0.5px solid #E5E5E5; border-top-right-radius: 0 !important; border-bottom-right-radius: 0 !important; }
</style>