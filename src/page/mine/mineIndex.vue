/*
 * @Author: WuFengliang 
 * @Date: 2017-12-26 09:28:40 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint:  个人中心模块首页
 */
 <template>
   <div>
    <menu-bar></menu-bar>
    <scroller :height="menuBarH" lock-x ref="scroller">
      <div class="person-contain">
        <div class="person-header">
          <img src="" />
          <ul>
            <li>小不点</li>
            <li>13838384381</li>
          </ul>
          <p><a></a></p>
        </div>
      </div>
    </scroller>
   </div>
 </template>
 <script>
import { Scroller } from 'vux'
import { mapState } from 'vuex'
import menuBar from '@/components/footer/menuBar'
export default {
  name: 'personalIndex',
  components: { Scroller, menuBar },
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  activited: {},
  update: {},
  beforeRouteUpdate: {},
  methods: {},
  filter: {},
  computed: {
    ...mapState(['menuBarH'])
  },
  watch: {}
}
</script>
 <style lang="less" scoped>
.box {
  padding: 0 0.6rem;
}

.person-contain {
  width: 100%;
  font-size: 0.7rem;
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
      background-color: #f00;
      border-radius: 50%;
      margin-right: 0.5rem;
    }
    ul {
      color: #fff;
      li {
        &:nth-child(1) {
          font-size: 0.8rem;
          line-height: 1.6rem;
        }
        &:nth-child(2) {
          font-size: 0.7rem;
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
        height: 0.6rem;
        background-image: url(../../common/img/home/home_drop_down.png);
        transform: rotate(-90deg);
      }
    }
  }
}
</style>
