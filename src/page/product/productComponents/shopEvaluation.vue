/*
 * @Author: huShangJun 
 * @Date: 2018-01-08 15:18:26 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 店铺评论
 */
<template>
  <div id="shopEvaluation" class="clearfix">
    <div class="evaluationTop clearfix">
      <h6>大家都在说</h6>
      <ul class="clearfix">
        <li>商品新鲜(2)</li>
        <li>商品新鲜(2)</li>
        <li>商品新鲜(2)</li>
        <li>商品新鲜(2)</li>
        <li>商品新鲜(2)</li>
      </ul>
    </div>
    <ul class="evaluationList">
      <li v-for="(item,index) in 10" :key="index" class="clearfix replyList">
        <div class="evaluationListLeft left">
          <img src="../../../common/img/productIndex/3.jpg" alt="">
        </div>
        <div class="evaluationListRight left clearfix">
          <div style="width:100%;height:18px">
            <span style="font-size: 12px;color: #333333;letter-spacing: -0.09px; float:left">{{name}}</span>
            <span style="font-size: 10px;color: #999999;letter-spacing: -0.08px; float:right">{{date}}</span>
          </div>
          <rater  v-model="countStar" :font-size="12" disabled></rater>
          <div class="pinlun"><span>口感好，物流也挺快的，还是冰的送过来的时候！非常实惠</span></div>
          <div class="label clearfix" v-if="showLabel">
            <i></i>
            <span v-for="(item,index) in 3" :key="index">准时送达</span>
          </div> 
          <ul class="imgList">
              <li class="left" v-for="(img,index) in 3" :key="index"><img src="../../../common/img/productIndex/3.jpg" alt=""></li>
            </ul>
        </div>
        <div class="reply">
          <h5>档主回复：</h5>
          <div class="replyContent">
            <span>对不起，因为店面紧张而导致人员的疏忽，我们会进一步改善。我们也对您发放抵消券，欢迎再次光临。</span>
             <ul class="imgList">
              <li class="left" v-for="(img,index) in 3" :key="index"><img src="../../../common/img/productIndex/3.jpg" alt=""></li>
            </ul>
          </div>
        </div>
      </li>
      <li v-if="haveComment" class="last noComment">
        <span>该店铺近期暂无评价</span>
      </li>
      <li class="last" v-else><span>没有更多了</span></li>
    </ul>
  </div>
</template>
<script>
import { Rater } from 'vux'
export default {
  components: { Rater },
  props: {},
  data() {
    return {
      haveComment: false,
      showLabel: true, // 是否有评价标签
      name: '小赖来',
      date: '2017.04.30',
      countStar: 4
    }
  },
  created() {},
  mounted() {},
  methods: {},
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
          font-size: 12px;
          color: #999999;
          letter-spacing: -0.09px;
        }
        .label {
          margin-top: 0.2rem;
          i {
            display: inline-block;
            width: 0.75rem;
            height: 0.75rem;
            background: url('../../../common/img/productIndex/evaluate_label.png')
              no-repeat;
            background-size: contain;
          }
          span {
            font-size: 12px;
            line-height: 0.75rem;
            margin-right: 0.7rem;
            // margin-bottom: 10px;
            color: #999999;
            vertical-align: top;
          }
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
    .replyList{
      padding: 12px 0;
      box-sizing: border-box;
      border-bottom: 0.5px solid #e5e5e5;
    }
  }
}
</style>