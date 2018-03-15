/*
 * @Author: WuFengliang 
 * @Date: 2017-12-26 09:28:40 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint:  个人中心模块首页
 */
 <template>
   <div class="contain-box">
    <menu-bar></menu-bar>
    <!-- 主体内容区域 -->
    <scroller :height="menuBarH" lock-x ref="scroller">
      <div class="person-contain">
        <div class="person-header" @click="dialog=true" v-if="data">
          <img :src="data.head_url != 'null' ? data.head_url : ''" />
          <ul>
            <li>{{data.cust_name}}</li>
            <!-- <li>{{data.mobileno}}</li> -->
						<li>
							<span>{{data.mobileno.substr(0,3)}}</span>
							<span>{{data.mobileno.substr(3,4)}}</span>
							<span>{{data.mobileno.substr(7)}}</span>
						</li>
          </ul>
          <p><a></a></p>
        </div>
        <ul class="person-my" v-if="data">
          <li>
            <p>{{data.mc_account.balance != null ? data.mc_account.balance:0 }}元</p>
            <p><span>我的账户</span></p>
          </li>
          <li class="line"></li>
          <li @click="jumpTo">
            <p>{{data.discount_count}}</p>
            <p><span>劵包</span></p>
          </li>
          <li class="line"></li>
          <li>
            <p>{{data.mc_account.coins}}</p>
            <p><span>积分账户</span></p>
          </li>
        </ul>
        <section class="my-options">
          <div @click="dialog=true">
            <i></i>
            <span>我的订单</span>
            <p><i></i></p>
          </div>
          <div @click="dialog=true">
            <i></i>
            <span>我的评价</span>
            <p><i></i></p>
          </div>
          <div @click="dialog=true">
            <i></i>
            <span>我的收货地址</span>
            <p><i></i></p>
          </div>
          <div @click="dialog=true">
            <i></i>
            <span>下载菜城APP</span>
            <p><i></i></p>
          </div>
          <div @click="dialog=true">
            <i></i>
            <span>我的收藏</span>
            <p><i></i></p>
          </div>
        </section>
        <section class="my-others">
          <div @click="dialog=true">
            <i></i>
            <span>意见反馈</span>
            <p><i></i></p>
          </div>
          <div @click="dialog=true">
            <i></i>
            <span>客服与帮助</span>
            <p><i></i></p>
          </div>
          <div @click="dialog=true">
            <i></i>
            <span>设置</span>
            <p><i></i></p>
          </div>
        </section>
      </div>
    </scroller>
    <!-- 主体内容区域 -->
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
            <p>该功能需要在</p>
            <p>菜城手机APP中查看</p>
          </div>        
          <!-- 弹框内容 -->
          <div class="down-btn">
            <button>立即下载</button>
          </div>
          <!-- 关闭 -->
          <div class="alert-close">
            <img @click="dialog=false;" src="../../common/img/common/close_ic.png" />
          </div>
        </div>
    </div>  
    <!-- 弹窗 -->
   </div>
 </template>
 <script>
import { Scroller } from 'vux'
import { mapState } from 'vuex'
import * as http from '@/api/http'
import menuBar from '@/components/footer/menuBar'
export default {
  name: 'personalIndex',
  components: { Scroller, menuBar },
  props: {},
  data() {
    return {
      dialog: false, //  弹框bool值
			custId: '', //  用户ID
			
      data: null //  接受到的数据
    }
  },
  created() {
    if (typeof this.$store.state.loginInfo === 'object') {
      this.custId = this.$store.state.loginInfo.cust_id
    } else {
      this.custId = JSON.parse(this.$store.state.loginInfo).cust_id
    }
    this.getUserCenter()
  },
  mounted() {},
  activited: {},
  update: {},
  beforeRouteUpdate: {},
  methods: {
    //  路由跳转
    jumpTo() {
      this.$router.push('/myCoupon');
    },
    //  获取个人中心数据
    getUserCenter() {
      http.getUserCenter(this.custId, {}).then(response => {
				this.data = response.data;
				console.log(response.data)
      })
    }
  },
  filter: {},
  computed: {
    ...mapState(['menuBarH'])
  },
  watch: {}
}
</script>
 <style lang="less" scoped>
.box {
  padding: 0 12px;
}

.contain-box {
  background-color: #f5f5f5;
}

.person-contain {
  width: 100%;
  font-size: 14px;
  .person-header {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    height: 6.5rem;
    background-color: #ffbd52;
    .box;
    padding-top: 2rem;
    padding-bottom: 1.5rem;
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      border: 2px solid #ffeeaf;
      box-shadow: 0 0 -4px 4px #ffeeaf outset;
      margin-right: 0.5rem;
    }
    ul {
      color: #fff;
      li {
        &:nth-child(1) {
          font-size: 18px;
          line-height: 1.6rem;
        }
        &:nth-child(2) {
          font-size: 14px;
          line-height: 1rem;
        }
      }
    }
    p {
      flex-grow: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      a {
        display: block;
        width: 1.2rem;
        height: 1.2rem;
        background-size: 1.2rem 1.2rem;
        background-image: url(../../common/img/common/core_Jump.png);
      }
    }
  }
  .person-my {
    height: 3.5rem;
    display: flex;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    li:not(.line) {
      flex-grow: 1;
      p {
        font-size: 16px;
        letter-spacing: -0.11px;
        text-align: center;
        span {
          display: inline-block;
          font-size: 20px;
          color: #222;
          transform: scale(0.5, 0.5);
        }
      }
      p:first-child {
        color: #999;
      }
      &:nth-child(1) > p:first-child {
        color: #ff3c00;
      }
    }
    li.line {
      width: 1px;
      height: 1.5rem;
      background-color: #f5f5f5;
    }
  }
  section {
    .box;
    box-sizing: border-box;
    margin-top: 0.5rem;
    background-color: #fff;
    & > div {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 2.2rem;
      color: #333;
      font-size: 14px;
      border-bottom: 1px solid #f5f5f5;
      &:last-child {
        border-bottom: none;
      }
      & > i {
        display: inline-block;
        width: 0.9rem;
        height: 0.9rem;
        margin-right: 0.5rem;
        background-size: 0.9rem 0.9rem;
      }
      & > p {
        flex-grow: 1;
        display: flex;
        justify-content: flex-end;
        & > i {
          display: block;
          width: 1.2rem;
          height: 1.2rem;
          margin-right: -0.3rem;
          background-size: 1.2rem 1.2rem;
          background-image: url(../../common/img/common/jump_gray_ic.png);
        }
      }
    }
    &.my-options {
      div {
        &:nth-child(1) > i {
          background-image: url(../../common/img/mine/me_order_ic.png);
        }
        &:nth-child(2) > i {
          background-image: url(../../common/img/mine/evaluate.png);
        }
        &:nth-child(3) > i {
          background-image: url(../../common/img/mine/personal_address.png);
        }
        &:nth-child(4) > i {
          background-image: url(../../common/img/mine/download_ic.png);
        }
        &:nth-child(5) > i {
          background-image: url(../../common/img/mine/personal_collection.png);
        }
      }
    }
    &.my-others {
      div {
        &:nth-child(1) > i {
          background-image: url(../../common/img/mine/personal_opinion.png);
        }
        &:nth-child(2) > i {
          background-image: url(../../common/img/mine/personal_service.png);
        }
        &:nth-child(3) > i {
          background-image: url(../../common/img/mine/set_ic.png);
        }
      }
    }
  }
}

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
    background-image: url(../../common/img/mine/download_img.png);
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
