/*
 * @Author: huShangJun 
 * @Date: 2018-01-08 15:18:26 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 店铺评论
 */
<template>
  <div id="shopEvaluation" class="clearfix">
    <!-- <div class="evaluationTop clearfix">
      <h6>大家都在说</h6>
      <ul class="clearfix">
        <li>商品新鲜(2)</li>
        <li>商品新鲜(2)</li>
        <li>商品新鲜(2)</li>
        <li>商品新鲜(2)</li>
        <li>商品新鲜(2)</li>
      </ul>
    </div> -->
    <loading v-if="showLoading"></loading>
    <ul class="evaluationList" v-else>
      <li v-for="(item,index) in shopRemark.records" :key="index" class="clearfix replyList">
        <div class="evaluationListLeft left">
          <img :src="item.picUrl" alt="用户头像">
        </div>
        <div class="evaluationListRight left clearfix">
          <div style="width:100%;height:18px">
            <span style="font-size: 12px;color: #333333;letter-spacing: -0.09px; float:left">{{item.custName}}</span>
            <span style="font-size: 10px;color: #999999;letter-spacing: -0.08px; float:right">{{item.remarkAt|formatTime}}</span>
          </div>
          <rater  v-model="item.starLevel" :font-size="12" disabled></rater>
          <div class="pinlun"><span>{{item.remarkContent}}</span></div>
          <ul class="imgList" v-if="item.remarkPicUrl1">
              <li class="left" v-if="item.remarkPicUrl1"><img :src="item.remarkPicUrl1" alt=""></li>
              <li class="left" v-if="item.remarkPicUrl2"><img :src="item.remarkPicUrl2" alt=""></li>
              <li class="left" v-if="item.remarkPicUrl3"><img :src="item.remarkPicUrl3" alt=""></li>
              <li class="left" v-if="item.remarkPicUrl4"><img :src="item.remarkPicUrl4" alt=""></li>
              <li class="left" v-if="item.remarkPicUrl5"><img :src="item.remarkPicUrl5" alt=""></li>
            </ul>
        </div>
        <div class="reply" v-if="item.replyContent">
          <h5>档主回复：</h5>
          <div class="replyContent">
            <span>{{item.replyContent}}</span>
             <ul class="imgList">
              <li class="left" v-if="item.replyPicUrl1"><img :src="item.replyPicUrl1" alt=""></li>
              <li class="left" v-if="item.replyPicUrl2"><img :src="item.replyPicUrl2" alt=""></li>
              <li class="left" v-if="item.replyPicUrl3"><img :src="item.replyPicUrl3" alt=""></li>
              <li class="left" v-if="item.replyPicUrl4"><img :src="item.replyPicUrl4" alt=""></li>
              <li class="left" v-if="item.replyPicUrl5"><img :src="item.replyPicUrl5" alt=""></li>
            </ul>
          </div>
        </div>
      </li>
      <li v-if="!shopRemark.records" class="last noComment">
        <span>该店铺近期暂无评价</span>
      </li>
      <li class="last" v-if="shopRemark.total > shopRemark.size"><span>加载更多</span></li>
    </ul>
  </div>
</template>
<script>
import { Rater } from 'vux'
import * as api from '@/api/http'
import * as time from '@/until/time.js'
import loading from '@/components/loading/loading'
export default {
  components: { Rater, loading },
  props: ['shopId'],
  data() {
    return {
      showLoading: true,
      haveComment: false,
      showLabel: true, // 是否有评价标签
      name: '小赖来',
      date: '2017.04.30',
      shopRemark: {},
      countStar: 4,
      params: {
        pageNum: 1,
        pageSize: 20
      }
    }
  },
  filters: {
    formatTime: function(value) {
      if (!value) return ''
      return time.formatDateTime(value)
    }
  },
  created() {},
  mounted() {
    // 获取店铺评价
    this.getShopRemarks()
  },
  methods: {
    // 获取店铺评价
    getShopRemarks() {
      api.getShopRemarks(this.shopId, this.params).then(res => {
        if (res.code === 200) {
          this.shopRemark = res.data
          this.showLoading = false
        }
      })
    }
  },
  filfter: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" scoped>
#shopEvaluation {
  font-size: 12px;
  height: 100%;
  background-color: #fff;
  padding: 12px 12px 0 12px;
  overflow: scroll;
  .evaluationTop {
    box-sizing: border-box;
    padding-bottom: 20px;
    border-bottom: 0.5px solid #e5e5e5;
    ul {
    }
    h6 {
      line-height: 17px;
      font-size: 12px;
      color: #999999;
    }
    li {
      float: left;
      width: 4rem;
      height: 24px;
      line-height: 24px;
      margin: 10px 8px 0 0;
      font-size: 12px;
      color: #333333;
      letter-spacing: -0.09px;
      border: 0.5px solid #e5e5e5;
      border-radius: 2px;
      text-align: center;
    }
  }
  .evaluationList {
    .last {
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      color: #888;
      text-align: center;
    }
    .noComment {
      margin-top: 3rem;
    }
    li {
      width: 100%;
      .evaluationListLeft {
        width: 1.8rem;
        margin-right: 0.4rem;
        img {
          width: 1.8rem;
        }
      }
      .evaluationListRight {
        width: 302/20rem;
        .pinlun {
          margin-top: 0.2rem;
          margin-bottom: 0.6rem;
          font-size: 12px;
          color: #999999;
          letter-spacing: -0.09px;
        }
        .imgList {
          li {
            float: left;
            margin-right: 8px;
            width: 3.5rem;
            img {
              width: 3.5rem;
            }
          }
        }
      }
      .reply {
        float: left;
        width: 100%;
        // height: 161/20rem;
        padding: 0.6rem;
        margin-top: 0.6rem;
        box-sizing: border-box;
        background-color: #fafafa;
        h5 {
          font-size: 12px;
          color: #333333;
        }
        .replyContent {
          padding: 0.4rem 0 0 1.6rem;
          font-size: 12px;
          color: #666666;
          li {
            float: left;
            margin-right: 0.4rem;
            margin-top: 0.5rem;
            width: 3.5rem;
            img {
              width: 3.5rem;
            }
          }
        }
      }
    }
    .replyList {
      padding: 12px 0;
      box-sizing: border-box;
      border-bottom: 0.5px solid #e5e5e5;
    }
  }
}
</style>