/**
* $
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：轮播图
*/
<template>
  <div class="slider-wrapper">
    <div class="slide" ref="slide">
      <div class="slide-group" ref="slideGroup">
        <slot>
        </slot>
      </div>
      <div v-if="showDot" class="dots">
        <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  const COMPONENT_NAME = 'slide'
  export default {
    name: COMPONENT_NAME,
    props: {
      // 是否无缝轮播
      loop: {
        type: Boolean,
        default: true
      },
      // 是否自动轮播
      autoPlay: {
        type: Boolean,
        default: true
      },
      // 轮播时间
      interval: {
        type: Number,
        default: 4000
      },
      // 是否显示小点
      showDot: {
        type: Boolean,
        default: true
      },
      click: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    mounted() {
      this.update()
      window.addEventListener('resize', () => {
        if (!this.slide || !this.slide.enabled) {
          return
        }
        clearTimeout(this.resizeTimer)
        this.resizeTimer = setTimeout(() => {
          if (this.slide.isInTransition) {
            this._onScrollEnd()
          } else {
            if (this.autoPlay) {
              this._play()
            }
          }
          this.refresh()
        }, 60)
      })
    },
    activated() {
      if (!this.slide) {
        return
      }
      this.slide.enable()
      let pageIndex = this.slide.getCurrentPage().pageX
      this.slide.goToPage(pageIndex, 0, 0)
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated() {
      this.slide.disable()
      clearTimeout(this.timer)
    },
    beforeDestroy() {
      this.slide.disable()
      clearTimeout(this.timer)
    },
    methods: {
      update() {
        if (this.slide) {
          this.slide.destroy()
        }
        this.$nextTick(() => {
          this.init()
        })
      },
      refresh() {
        this._setSlideWidth(true)
        this.slide.refresh()
      },
      next() {
        this.slide.next()
      },
      init() {
        clearTimeout(this.timer)
        this.currentPageIndex = 0
        this._setSlideWidth()
        if (this.showDot) {
          this._initDots()
        }
        this._initSlide()
        if (this.autoPlay) {
          this._play()
        }
      },
      _setSlideWidth(isResize) {
        this.children = this.$refs.slideGroup.children;
        let width = 0;
        let slideWidth = this.$refs.slide.clientWidth;
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i];
          child.className = 'slide-item';
          child.style.width = slideWidth + 'px';
          width += slideWidth;
        }
        if (this.loop && !isResize) {
          width += 2 * slideWidth;
        }
        this.$refs.slideGroup.style.width = width + 'px';
      },
      _initSlide() {
        this.slide = new BScroll(this.$refs.slide, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          },
          bounce: false,
          click: this.click
        })
        this.slide.on('scrollEnd', this._onScrollEnd)
        this.slide.on('touchEnd', () => {
          if (this.autoPlay) {
            this._play()
          }
        })
        this.slide.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _onScrollEnd() {
        let pageIndex = this.slide.getCurrentPage().pageX
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          this._play()
        }
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _play() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.slide.next()
        }, this.interval)
      }
    }
  }
</script>
<style type="text/less" lang="less" scoped>
  .slider-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
    .slide {
      min-height: 1px;
      .slide-group {
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        .slide-item {
          float: left;
          box-sizing: border-box;
          overflow: hidden;
          text-align: center;
          a {
            display: block;
            width: 100%;
            overflow: hidden;
            text-decoration: none;
          }
          img {
            display: block;
            width: 100%;
          }
        }
      }
      .dots {
        position: absolute;
        right: 0;
        left: 0;
        bottom: 12px;
        transform: translateZ(1px);
        text-align: center;
        font-size: 0;
        .dot {
          display: inline-block;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          &.active {
            width: 20px;
            border-radius: 5px;
            background: rgba(255, 255, 255, 0.8);
          }
        }
      }
    }
  }
</style>
