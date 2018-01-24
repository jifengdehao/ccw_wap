/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：定位+收货地址
*/
<template>
  <div class="address">
    <m-header></m-header>
    <div class="search-wrapper border-1px">
      <div class="search-content">
        <input type="text" class="search" placeholder="查找小区/大厦/学校等" v-model.trim="search" @keyup.enter="submit"/>
        <i class="clear" v-show="search" @click="clearSearch"></i>
      </div>
    </div>
    <div class="my-address">我的收货地址</div>
    <div class="scroll-wrapper" v-if="addressList.length>0">
      <scroll>
        <div>
          <swipeout>
            <swipeout-item transition-mode="follow" :threshold=".5">
              <div slot="right-menu">
                <swipeout-button type="warn" @click.native="onButtonClick('del')">删除</swipeout-button>
              </div>
              <div slot="content" class="address-item border-1px">
                <div class="name">菜城<span class="tel">159 4546 4907</span></div>
                <div class="adr">广州市番禺区南桥街道南堤东路836号</div>
                <i class="icon-edit"></i>
              </div>
            </swipeout-item>
            <swipeout-item transition-mode="follow" :threshold=".5">
              <div slot="right-menu">
                <swipeout-button type="warn">删除</swipeout-button>
              </div>
              <div slot="content" class="address-item border-1px">
                <div class="name">菜城<span class="tel">159 4546 4907</span></div>
                <div class="adr">广州市番禺区南桥街道南堤东路836号</div>
                <i class="icon-edit"></i>
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
</template>
<script type="text/ecmascript-6">
  import topBar from '@/components/header/topBar'
  import Scroll from '@/components/scroll/scroll'
  import mHeader from '@/components/header/m-header'
  import {Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'

  export default {
    data() {
      return {
        search: '',
        addressList: [1, 2]
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
    methods: {
      clearSearch() {
        this.search = '';
      },
      onButtonClick(type) {
        console.log(type)
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import "../../common/css/mixin";

  .address {
    background-color: #f5f5f5;
    height: 100%;
    .m-header{
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
