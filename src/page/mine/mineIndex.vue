/*
 * @Author: WuFengliang 
 * @Date: 2017-12-26 09:28:40 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint:  个人中心模块首页
 */
 <template>
   <div>
    <menu-bar></menu-bar>
    <scroller :height="menuBarH" lock-x :scrollbarY="true" ref="scroller">
      <div>
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        personalIndex
        <br />
        end
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

</style>
