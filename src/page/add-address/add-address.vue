/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：新增地址
*/
<template>
  <transition name="slide">
    <div class="add-address">
      <top-bar></top-bar>
      <div class="content">
        <div class="form-group">
          <div class="item border-1px select">
            <label>小区/大厦/学校:</label>
            <input type="text" placeholder="点击选择" @click="select"/>
          </div>
          <div class="item">
            <label>详细地址:</label>
            <input type="text" placeholder="请输入详细地址"/>
          </div>
        </div>
        <div class="form-group">
          <div class="item border-1px">
            <label>收货人:</label>
            <input type="text" placeholder="请填写收货人的姓名或称呼"/>
          </div>
          <div class="item">
            <label>联系电话:</label>
            <input type="number" placeholder="请填写联系电话"/>
          </div>
        </div>
        <div class="form-group form-btn">
          <button type="button" class="btn-submit" @click="submit">确定</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import topBar from '@/components/header/topBar'

  export default {
    components: {
      topBar
    },
    methods: {
      select() {
         return this.$router.push('/location')
      },
      submit() {
        console.log('form submit')
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import "../../common/css/mixin";

  .content {
    background: #F5F5F5;
    position: absolute;
    top: 2.2rem;
    left: 0;
    right: 0;
    bottom: 0;
    .form-group {
      margin-bottom: .5rem;
      padding: 0 .6rem;
      background-color: #FFFFFF;
      .item {
        height: 2.2rem;
        line-height: 2.25rem;
        font-size: 0;
        .border-1px(#e5e5e5);
        display: flex;
        &:last-child {
          .border-none()
        }
        & > label {
          font-size: .7rem;
          width: auto;
          flex: 0 0 auto;
        }
        & > input {
          padding-left: .5rem;
          height: 2.2rem;
          display: inline-block;
          font-size: .7rem;
          flex: 1;
          box-sizing: border-box;
          color: #333333;
        }
      }
      .select {
        &>input{
          background: url("../../common/img/common/jump_gray_ic.png")no-repeat right center !important;
          background-size: 1.2rem 1.2rem !important;
        }
      }
      .btn-submit {
        width: 100%;
        height: 2.2rem;
        line-height: 2.2rem;
        text-align: center;
        font-size: 18px;
        color: #FFFFFF;
        background: #FFBD52;
        border-radius: 4px;
      }
    }
    .form-btn {
      background-color: #f5f5f5 !important;
      margin-top: 1rem !important;
      margin-bottom: 0 !important;
    }
  }
</style>
