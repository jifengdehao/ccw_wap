/*
 * @Author: huShangJun 
 * @Date: 2018-01-09 17:23:49 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 弹窗
 */
 <template>
  <div class="vux-alert">
    <x-dialog>
     
    </x-dialog>
  </div>
</template>
<script>
import {XDialog} from 'vux'

export default {
  name: 'alert',
  components: {
    XDialog
  },
  created () {
    // if (typeof this.value !== 'undefined') {
    //   this.showValue = this.value
    // }
  },
  props: [],
  data () {
    return {
      showValue: false
    }
  },
  methods: {
    // _onHide () {
    //   this.showValue = false
    // }
  },
  watch: {
    // value (val) {
    //   this.showValue = val
    // },
    // showValue (val) {
    //   this.$emit('input', val)
    // }
  }
}
</script>

<style lang="less">
</style>
