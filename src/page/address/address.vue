/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：定位+收货地址
*/
<template>
  <transition name="slide">
    <div class="address">
      <m-header></m-header>
      <div class="search-wrapper border-1px">
        <div class="search-content">
          <input type="text" class="search" placeholder="查找小区/大厦/学校等" v-model.trim="search" @keyup.enter="submit"/>
          <i class="clear" v-show="search" @click="clearSearch"></i>
        </div>
      </div>
      <div class="my-address">我的收货地址</div>
      <div class="scroll-wrapper" v-if="customAddress.length>0">
        <scroll :data="customAddress">
          <div>
            <swipeout>
              <swipeout-item transition-mode="follow" :threshold=".5" v-for="(item,index) in customAddress"
                             :key="index">
                <div slot="right-menu">
                  <swipeout-button type="warn" @click.native="onButtonClick(item)">删除</swipeout-button>
                </div>
                <div slot="content" class="address-item border-1px">
                  <div class="name">{{item.receiver}}<span class="tel">{{item.contactNumber}}</span></div>
                  <div class="adr">{{item.addr}}</div>
                  <router-link tag="i" class="icon-edit" :to="/address/+item.addrId"></router-link>
                </div>
              </swipeout-item>
            </swipeout>
          </div>
        </scroll>
      </div>
      <div class="content" v-else>
        <div class="no-address">
          <img src="../../common/img/address/no_location_ic.png"/>
          <p>还没有收货地址</p>
        </div>
      </div>
      <router-link tag="div" to="/addAddress" class="add-address">新建收货地址</router-link>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import topBar from '@/components/header/topBar'
  import Scroll from '@/components/scroll/scroll'
  import mHeader from '@/components/header/m-header'
  import {Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
  import * as api from '@/api/http.js'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        search: '', // 搜索
        customAddress: []  // 用户地址列表
      }
    },
    components: {
      topBar,
      Scroll,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      mHeader
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    created() {
      setTimeout(() => {
        this.getCustomAddress()
      }, 20)
    },
    methods: {
      // 清除搜索
      clearSearch() {
        this.search = '';
      },
      // 搜索
      submit() {
        console.log(this.search)
      },
      // 删除收货地址
      onButtonClick(item) {
        console.log(item)
        let userInfo = JSON.parse(this.user)
        api.delCustomAddress(userInfo.cust_id, item.addrId).then((res) => {
          if (res.code === 200 && res.data) {
            this.getCustomAddress()
          }
        })
      },
      // 获取用户所有的收货地址
      getCustomAddress() {
        let userInfo = JSON.parse(this.user)
        api.getCustomAddress(userInfo.cust_id).then((res) => {
          if (res.code === 200 && res.data.length > 0) {
            console.log(res.data)
            this.customAddress = res.data
          }
        })
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import "../../common/css/mixin";

  .address {
    background-color: #f5f5f5;
    height: 100%;
    .m-header {
      .border-none();
      background-color: #f5f5f5;
    }
    .content {
      position: absolute;
      top: 5.9rem;
      left: 0;
      right: 0;
      bottom: 2.2rem;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      .no-address {
        text-align: center;
        & > img {
          width: 5rem;
          height: 5rem;
        }
        & > p {
          margin-top: 2rem;
          font-size: .6rem;
          color: #999999;
        }
      }
    }
    .search-wrapper {
      display: flex;
      padding: 0 .6rem;
      .border-1px();
      .search-content {
        flex: 1;
        display: inline-block;
        height: 1.5rem;
        line-height: 1.5rem;
        border-radius: 4px;
        margin: .35rem 0;
        box-sizing: border-box;
        background: #FFFFFF url("../../common/img/location/search.png") no-repeat .4rem center;
        background-size: .65rem .65rem;
        padding-left: 1.3rem;
        padding-right: 1.5rem;
        font-size: 0;
        position: relative;
        & > input {
          height: 1.5rem;
          width: 100%;
          font-size: .6rem;
          color: #999999;
          background-color: #FFFFFF;
        }
      }
      .clear {
        display: inline-block;
        background: url("../../common/img/location/clean_btn.png") no-repeat center;
        width: 1.2rem;
        height: 1.2rem;
        background-size: .6rem .6rem;
        position: absolute;
        right: .15rem;
        top: .15rem;
      }
    }
    .my-address {
      height: 1.5rem;
      line-height: 1.5rem;
      padding: 0 .6rem;
      font-size: .6rem;
      color: #666666;
      background: #FFF8ED;
    }
    .add-address {
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      text-align: center;
      height: 2.2rem;
      line-height: 2.2rem;
      color: #FFFFFF;
      background-color: #FFBD52;
      font-size: .9rem;
    }
    .scroll-wrapper {
      position: absolute;
      top: 5.9rem;
      left: 0;
      right: 0;
      bottom: 2.2rem;
      overflow: hidden;
      .address-item {
        height: 3.3rem;
        position: relative;
        padding: .55rem .6rem 0 .6rem;
        box-sizing: border-box;
        .border-1px();
        .name, .adr {
          font-size: .7rem;
          line-height: 1rem;
        }
        .name {
          margin-bottom: .2rem;
          .tel {
            margin-left: 1.5rem;
          }
        }
        .adr {
          padding-left: 1rem;
          background: url("../../common/img/location/maps.png") no-repeat left center;
          background-size: .6rem .75rem;
        }
        .icon-edit {
          position: absolute;
          width: .8rem;
          height: .8rem;
          background: url("../../common/img/address/location_ic.png") no-repeat center;
          background-size: contain;
          right: .8rem;
          top: 1.25rem;
        }
      }

    }
  }
</style>
