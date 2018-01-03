/*
 * @Author: WuFengliang 
 * @Date: 2017-12-26 09:22:49 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint:  底部菜单栏
 */
 <template>
   <div>
     <ul class="menu-bar">
       <router-link tag="li" :to="'/home'" exact-active-class="active">
        <div>
          <i class="icon-home"></i>
          <p>首页</p>
        </div>
       </router-link>
       <router-link tag="li" :to="'/product'" exact-active-class="active">
        <div>
          <i class="icon-product"></i>
          <p>分类</p>
        </div>
       </router-link>
       <router-link tag="li" :to="'/cart'" exact-active-class="active">
        <div>
          <i class="icon-cart"></i>
          <p>购物车</p>
        </div>
       </router-link>
       <router-link tag="li" :to="'/mine'" exact-active-class="active">
        <div>
          <i class="icon-mine"></i>
          <p>个人中心</p>
        </div>
       </router-link>
     </ul>
   </div>
 </template>
 <script>
import { Scroller } from 'vux'
export default {
  name: 'menuBar',
  components: { Scroller },
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
  computed: {},
  watch: {}
}
</script>
 <style lang="css" scoped>
.menu-bar {
  width: 100%;
  height: 2.45rem;
  background-color: #fafafa;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  font-size: 12px;
  border-top: 0.5px solid #e5e5e5;
  border-bottom: 0.5px solid #e5e5e5;
  z-index: 1;
}

.menu-bar > li {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-bar > li > div > p {
  font-size: 0.6rem;
  margin-top: 0.2rem;
}

.menu-bar > li > div > i {
  display: block;
  width: 1.2rem;
  height: 1.2rem;
  background-size: 1.2rem 1.2rem;
  margin: auto;
}

.active {
  color: #ffbd52;
}

i.icon-home {
  background-image: url(../../common/img/menuBar/tab_home_default.png);
}

i.icon-product {
  background-image: url(../../common/img/menuBar/tab_classify_default.png);
}

i.icon-cart {
  background-image: url(../../common/img/menuBar/tab_shopping_default.png);
}

i.icon-mine {
  background-image: url(../../common/img/menuBar/tab_personal_default.png);
}

.active i.icon-home {
  background-image: url(../../common/img/menuBar/tab_home_selected.png);
}
.active i.icon-product {
  background-image: url(../../common/img/menuBar/tab_classify_selected.png);
}

.active i.icon-cart {
  background-image: url(../../common/img/menuBar/tab_shopping_selected.png);
}

.active i.icon-mine {
  background-image: url(../../common/img/menuBar/tab_personal_selected.png);
}
</style>