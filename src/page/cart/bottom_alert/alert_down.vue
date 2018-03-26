/*
 * @Author: ZengFanlu 
 * @Date: 2018-01-18 16:37:31 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 下载弹框 
 */

<template>
  <div>
    <!-- 弹窗 -->
    <div class="alert-box" v-if="dialog">
      <div class="down-box">
          <!-- 头部 -->
          <div class="down-header">
            <div>
              <span></span>
              <span>菜城APP</span>
              <span></span>
            </div>
          </div>        
          <!-- 头部 -->
          <!-- 弹框内容 -->
          <div class="down-content">
            <p>余额支付</p>
            <p>只能在菜城手机APP中使用</p>
          </div>        
          <!-- 弹框内容 -->
          <div class="down-btn">
            <button>立即下载</button>
          </div>
          <!-- 关闭 -->
          <div class="alert-close">
            <img @click="dialog=false;" src="../../../common/img/common/close_ic.png" />
          </div>
        </div>
    </div>  
    <!-- 弹窗 -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialog: true
    }
  }
  // created: {},
  // mounted: {},
  // methods: {}
}
</script>
<style lang="less" scoped>
.alert-box {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 2;
  .down-box {
    position: relative;
    width: 13.5rem;
    height: 16rem;
    font-size: 16px;
    border-radius: 0.6rem;
    background-color: #fff;
    background-size: 100% auto;
    background-image: url(../../../common/img/mine/download_img.png);
    background-repeat: no-repeat;
    .down-header {
      box-sizing: border-box;
      height: 6.5rem;
      padding: 1rem 3rem 0;
      margin-bottom: 2.2rem;
      line-height: 1.1rem;
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 16px;
          letter-spacing: 1.33px;
          color: #fff;
          &:nth-child(1),
          &:nth-child(3) {
            display: inline-block;
            width: 1.5rem;
            height: 1px;
            background-color: #fff;
            transform: scale(1, 0.5);
          }
        }
      }
    }
    .down-content {
      box-sizing: border-box;
      line-height: 1.1rem;
      padding: 1.2rem 0;
      text-align: center;
      font-size: 16px;
      color: #333;
    }
    .down-btn {
      text-align: center;
      button {
        width: 11.5rem;
        height: 2rem;
        font-size: 16px;
        color: #fff;
        border-radius: 0.6rem;
        background-color: #ffbd52;
        margin: auto;
      }
    }
    .alert-close {
      position: absolute;
      bottom: -2.6rem;
      left: 0;
      width: 100%;
      height: 1.5rem;
      text-align: center;
      img {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
}
</style>