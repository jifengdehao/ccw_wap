/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：新增和修改地址
*/
<template>
  <transition name="slide">
    <div class="add-address">
      <m-header></m-header>
      <div class="content">
        <div class="form-group">
          <div class="item border-1px select">
            <label>小区/大厦/学校:</label>
            <input type="text" placeholder="点击选择" @click="select" v-model.tirm="buildingName"/>
          </div>
          <div class="item">
            <label>详细地址:</label>
            <input type="text" placeholder="请输入详细地址" v-model.trim="addr"/>
          </div>
        </div>
        <div class="form-group">
          <div class="item border-1px">
            <label>收货人:</label>
            <input type="text" placeholder="请填写收货人的姓名或称呼" v-model.trim="receiver"/>
          </div>
          <div class="item">
            <label>联系电话:</label>
            <input type="number" placeholder="请填写联系电话" v-model.trim="contactNumber"/>
          </div>
        </div>
        <div class="form-group form-btn">
          <button type="button" class="btn-submit" @click.stop="submit">确定</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import mHeader from '@/components/header/m-header'
  import {mapGetters} from 'vuex'
  import * as api from '@/api/http.js'

  export default {
    data() {
      return {
        addressId: (() => {   // 地址Id
          return this.$route.params.id
        })(),
        buildingName: '', // 地图返回的地址名
        addr: '', // 详细地址
        receiver: '', // 收货人
        contactNumber: '' // 联系电话
      }
    },
    components: {
      mHeader
    },
    computed: {
      ...mapGetters([
        'user',
        'location'
      ])
    },
    created() {
      if (this.addressId) {
        this.getCustomAddressDetails()
      }
    },
    methods: {
      select() {
        return this.$router.push('/location')
      },
      submit() {
        console.log('form submit')
        if (this.addressId) {

        } else {
          this.postCustomAddress()
        }
      },
      // 保存用户收货地址
      postCustomAddress() {
        let params = {
          addr: this.addr,
          addrId: this.addressId,
          buildingName: this.buildingName,
          contactNumber: this.contactNumber,
          custId: this.user.cust_id, // 用户id
          latitude: this.location.position.lat, // 纬度
          longitude: this.location.position.lng, // 经度
          receiver: this.receiver
        }
        api.postCustomAddress(params).then((res) => {
          if (res.code === 200) {
            console.log(res.data)
          }
        })
      },
      // 获取用户收货地址详情
      getCustomAddressDetails() {
        api.getCustomAddressDetails(this.addressId).then((res) => {
          if (res.code === 200) {
            console.log(res.data)
          }
        })
      },
      // 修改用户收货地址
      putCustomAddress() {
        let params = {}
        api.putCustomAddress(params).then((res) => {
          if (res.code === 200) {
            console.log(res.data)
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
