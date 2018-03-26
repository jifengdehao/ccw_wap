/*
 * @Author: ZengFanlu 
 * @Date: 2018-01-18 11:13:18 
 * DeveloperMailbox:   zengfanlu@ccw163.com 
 * FunctionPoint: 优惠券 
 */
<template>
  <transition name="fade">
    <div class="contain-div-box">
      <div class="header">
        <top-bar></top-bar>
      </div>
      <!-- 优惠券主体 -->
      <!-- <div class="coupon-box" v-if="showMyCoupon"> -->
        <Scroller lock-x class="coupon-box" v-if="showMyCoupon">
        <!-- 折扣券 -->
        <ul class="discount">
          <li v-for="(item,index) in discountCouponList" :key="index">
            <div class="words">
              <p> <input type="radio" class="check" name="coupon"> <span class="emphasis">{{item.discount}}</span>折&nbsp;&nbsp;{{item.useConditionString}}</p>
              <p><span>{{item.effectiveStartTime}}</span>至<span>{{item.effectiveEndTime}}</span></p>
            </div>
            <div class="explain">
              <span>折扣券</span>
            </div>
          </li>
        </ul>
        <!-- 满减券 -->
        <ul class="money-off">
          <li v-for="(item,index) in reduceCouponList" :key="index">
            <div class="words">
              <p> <input type="radio" name="coupon" class="check"> ￥&nbsp;<span class="emphasis">{{item.discount}}</span>&nbsp;&nbsp;{{item.useConditionString}}</p>
              <p><span>{{item.effectiveStartTime}}</span>至<span>{{item.effectiveEndTime}}</span></p>
              <!-- 新人券 LOGO -->
              <img src="../../common/img/coupon/new_tab@2x.png" />
            </div>
            <div class="explain">
              <span>满减券</span>
            </div>
          </li>
        </ul>
        <!-- 配送抵扣券 -->
        <ul class="distribution">
          <li v-for="(item,index) in deliveryCouponList" :key="index">
            <div class="words">
              <p> <input type="radio" name="coupon" class="check"> ￥&nbsp;<span class="emphasis">{{item.discount}}</span>&nbsp;&nbsp;{{item.useConditionString}}</p>
              <p><span>{{item.effectiveStartTime}}</span>至<span>{{item.effectiveEndTime}}</span></p>
            </div>
            <div class="explain">
              <span>配送费</span>
              <span>抵扣券</span>
            </div>
          </li>
        </ul>
        <!-- 抵扣券 -->
        <ul class="deduction">
          <li v-for="(item,index) in deductionCouponList" :key="index">
            <div class="words">
              <p> <input type="radio" name="coupon" class="check"> ￥&nbsp;<span class="emphasis">{{item.discount}}</span>&nbsp;&nbsp;{{item.useConditionString}}</p>
              <p><span>{{item.effectiveStartTime}}</span>至<span>{{item.effectiveEndTime}}</span></p>
            </div>
            <div class="explain">
              <span>抵扣券</span>
            </div>
          </li>
        </ul>
        <!-- 抵扣券 -->
        <button @click="choiceCoupon">确定</button>
        </Scroller>
      <!-- </div> -->
      <!-- 优惠券空白页 -->
      <div class="coupon-blank" v-if="!showMyCoupon">
        <div class="blank-pic">
          <img src="../../common/img/cart/no_coupon_ic.png" alt="">
          <p>您还没有优惠券</p>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import {Scroller } from 'vux';
import * as http from "@/api/http";
import topBar from '../../components/header/topBar';
export default {
  name: 'myCoupon',
  components: { topBar },
  props: {},
  data() {
    return {
      customerId:'',
      marketId:'',
      showMyCoupon: true,
      discountCouponList:[], //折扣券
      reduceCouponList:[],   //满减券
      deliveryCouponList:[], //配送抵扣券
      deductionCouponList:[],//抵扣券
    }
  },
  created() {},
  mounted() {
    if (typeof this.$store.state.loginInfo === "object") {
      this.customerId = this.$store.state.loginInfo.cust_id;
    } else {
      this.customerId = JSON.parse(this.$store.state.loginInfo).cust_id;
    }
    if (this.$store.state.market === null) {
      this.marketId = sessionStorage.getItem("market")
        ? JSON.parse(sessionStorage.getItem("market")).marketId
        : "";
    } else {
      this.marketId = this.$store.state.market.marketId;
    }
    let recordNum = this.$store.state.recordNum;
    this.getUserCanbeuseCouponList(recordNum);
  },
  activited: {},
  update: {},
  beforeRouteUpdate: {},
  methods: {
    getUserCanbeuseCouponList(num){
      let _this=this;
      http.getUserCanbeuseCouponList(this.customerId, this.marketId,{
        amount:num
      }).then(response=>{
        if(response.data.length>0){
          this.showMyCoupon=true;
          let arr1=[];
          let arr2=[];
          let arr3=[];
          let arr4=[];
          let arr = response.data;
          for(let i=0;i<arr.length;i++){
            let couponId =arr[i].couponId;
            let couponSet = arr[i].couponSet;
            let discount=arr[i].discount;
            let effectiveStartTime = new Date(arr[i].effectiveStartTime).toLocaleString();
              effectiveStartTime = effectiveStartTime.substring(0,9);
            let effectiveEndTime = new Date(arr[i].effectiveEndTime).toLocaleString();
              effectiveEndTime = effectiveEndTime.substring(0,9);
            let mcCouponId = arr[i].mcCouponId;
            let read = arr[i].read;
            let status = arr[i].status;
            let types = arr[i].types;
            let useCondition = arr[i].useCondition;
            let useConditionString = arr[i].useConditionString;
            let obj={
              couponId:couponId,couponSet:couponSet,discount:discount,mcCouponId:mcCouponId,
              effectiveStartTime:effectiveStartTime,effectiveEndTime:effectiveEndTime,
              read:read,status:status,types:types,useCondition:useCondition,useConditionString:useConditionString
            }
            if(arr[i].types==1){//1抵扣券
              arr1.push(obj);
            }else if(arr[i].types==2){//2折扣券
              arr2.push(obj);
            }else if(arr[i].types==3){//3满减券
              arr3.push(obj);
            }else{//4免配送费券
              arr4.push(obj);
            }
          }
          _this.discountCouponList=arr2;
          _this.reduceCouponList=arr3;
          _this.deliveryCouponList=arr4;
          _this.deductionCouponList=arr1;
        }else{
          this.showMyCoupon=false;
          _this.discountCouponList=[];
          _this.reduceCouponList=[];
          _this.deliveryCouponList=[];
          _this.deductionCouponList=[];
        }
      })
    },
    // 选择好优惠券
    choiceCoupon(){
      console.log()
      //选择优惠券
      this.$store.commit('change_couponNum',100)
      this.$router.go(-1);
    }

  },
  filter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" scoped>
@import '../../common/css/variable.less';
.header { height: 44 / 20rem; }
input[type='radio'] { -webkit-appearance: none; outline: none; }
input.check {  background: url(../../common/img/cart/select_default_btn.png) no-repeat center left; background-size: 20 / 20rem 20 / 20rem; position: absolute; top: 50%; left: 14 / 20rem; margin-top: -19 / 20rem; width: 20 / 20rem; height: 40 / 20rem; z-index: 3; }
input.check:checked { background: url(../../common/img/cart/select_selected_btn.png) no-repeat center left; background-size: 20 / 20rem 20 / 20rem; z-index: 3; }
.coupon-box {
  box-sizing: border-box;
  padding: 0 17px;
  ul {
    margin-top: 9.5px;
    li {
      position: relative;
      width: 17.05rem;
      height: 5rem;
      font-size: 12px;
      margin: auto;
      color: #ffae28;
      background-image: url(../../common/img/coupon/coupon_bg@2x.png);
      background-size: 17.05rem auto;
      .words {
        position: absolute;
        top: 0;
        left: 0;
        width: 14.55rem;
        height: 5rem;
        p {
          text-indent: 1.7rem;
          margin-left: 22px;
        }
        p:first-child {
          height: 2.8rem;
          line-height: 2.8rem;
          margin-top: 13px;
          span {
            vertical-align: sub;
          }
          span.emphasis {
            font-size: 40px;
          }
        }
        p:nth-child(2) {
          font-size: 20px;
          margin-left: -14%;
          line-height: 14px;
          color: #999;
          transform: scale(0.5, 0.5);
        }
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 2.7rem;
          height: 2.7rem;
        }
      }
      .explain {
        position: absolute;
        top: 0;
        right: 0;
        width: 2.6rem;
        height: 5rem;
        font-size: 16px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          letter-spacing: 4px;
          writing-mode: vertical-lr;
        }
      }
    }
  }
}
button { 
  width: 140 / 20rem; 
  height: 40 / 20rem; 
  position: fixed; z-index: 99999;
  bottom: 13px; left: 32%; 
  background-color: #FFBD52; 
  border-radius: 2px; font-size: 18px; color: #ffffff; }
.coupon-blank { width: 100%; height: 100%; background-color: #ffffff; position: fixed; top: 0; left: 0; display: flex; justify-content: center; align-items: center; }
.blank-pic > img{ width: 100 / 20rem; height: 100 / 20rem; margin-bottom: 28 / 20rem; }
.blank-pic > p { font-size: 12px; color: #999999; }
</style>