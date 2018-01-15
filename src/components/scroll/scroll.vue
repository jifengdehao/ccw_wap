/**
*
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：布局scroll
*/
<template>
  <div ref="scroll" class="scroll">
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
      data: {
        type: Array,
        default: null
      },
      click: {
        type: Boolean,
        default: true
      },
      probeType: {
        type: Number,
        default: 1
      },
      pullup: {
        type: Boolean,
        default: false
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        this.scroll = new BScroll(this.$refs.scroll, {
          click: this.click,
          probeType: this.probeType
        });
        // 派发组件滚动结束事件
        if (this.pullup) {
          this.scroll.on('scrollEnd', (pos) => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd',pos)
            }
          })
        }
        // 派发组件滚动 返回实时滚动的位置
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          });
        }
        // 派发组件滚动开始事件
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          });
        }
      },
      //禁用组件
      disable() {
        this.scroll && this.scroll.disable()
      },
      // 销毁组件
      destroy() {
        this.scroll && this.scroll.destroy()
      },
      // 刷新组件
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      // 滚动到目标位置
      scrollTo () {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      // 滚动到目标元素
      scrollToElement () {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .scroll {
    height: 100%;
    overflow: hidden;
  }
</style>
