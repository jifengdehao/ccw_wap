/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：新增和修改地址
*/
<template>
  <div class="add-address">
    <m-header></m-header>
    <div class="content">
      <div class="form-group">
        <div class="item border-1px select">
          <label>小区/大厦/学校:</label>
          <input type="text" placeholder="点击选择" @click="selectPlace" v-model.tirm="form.buildingName"/>
        </div>
        <div class="item">
          <label>详细地址:</label>
          <input type="text" placeholder="请输入详细地址" v-model.trim="form.addr"/>
        </div>
      </div>
      <div class="form-group">
        <div class="item border-1px">
          <label>收货人:</label>
          <input type="text" placeholder="请填写收货人的姓名或称呼" v-model.trim="form.receiver"/>
        </div>
        <div class="item">
          <label>联系电话:</label>
          <input type="number" placeholder="请填写联系电话" v-model.trim="form.contactNumber"/>
        </div>
      </div>
      <div class="form-group form-btn">
        <button type="button" class="btn-submit" @click.stop="submit">确定</button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import mHeader from '@/components/header/m-header'
  import * as api from '@/api/http.js'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        addressId: (() => {   // 地址Id
          return this.$route.params.id
        })(),
        form: {}
      }
    },
    components: {
      mHeader
    },
    computed: {
      ...mapGetters([
        'user',
        'addmodress'
      ])
    },
    mounted() {
      this.$nextTick(() => {
        // 获取详情 修改
        if (this.addressId) {
          this.getCustomAddressDetails(this.addressId)
        } else {
          if (this.addmodress) {
            this.form = this.addmodress
          }
        }
      })
    },
    methods: {
      // 跳转到位置
      selectPlace() {
        if (this.addressId) {
          this.$router.push('/location/' + this.addressId)
        } else {
          this.$router.push('/location')
        }
      },
      submit() {
        if (this.addressId) {
          this.putCustomAddress()
        } else {
          this.postCustomAddress()
        }
      },
      // 保存用户收货地址
      postCustomAddress() {
        if (this.addmodress) {
          let params = {
            custId: JSON.parse(this.user).cust_id,
          }
          this.form = Object.assign(this.form, params)
          api.postCustomAddress(this.form).then((res) => {
            if (res.code === 200) {
              console.log(res.data)
              if (res.data) {
                this.$router.back()
              }
            }
          })
        }

      },
      // 获取用户收货地址详情
      getCustomAddressDetails(addressId) {
        if (addressId) {
          api.getCustomAddressDetails(addressId).then((res) => {
            if (res.code === 200) {
              this.form = res.data
            }
          })
        }
      },
      // 修改用户收货地址
      putCustomAddress() {
        api.putCustomAddress(this.form).then((res) => {
          if (res.code === 200 && res.data) {
            this.$router.back()
          }
        })
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
        & > input {
          background: url("../../common/img/common/jump_gray_ic.png") no-repeat right center !important;
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
