<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  data () {
    return {
      scroll: null
    }
  },

  props: {
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    probeType: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: null
    },
    refreshDelay: {
      type: Number,
      default: 2
    },
    scrollToEndFlag: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        console.log('refresh')
        this.refresh()
      }, this.refreshDelay)
    }
  },
  mounted () {
    // 1.创建BetterScroll对象，并传入DOM和选项（probetype,click,pullUpload）
    this.scroll = new BScroll(this.$refs.wrapper, {
      pullUpLoad: this.pullUpLoad,
      click: true,
      probeType: this.probeType
    })
    console.log(this.scroll)
    // 监听scroll(滚动)事件，该事件会返回一个position
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        // 发射自定义scroll事件给父组件，并发出position参数
        this.$emit('scroll', position)
      })
    }
    // 监听pullingUp事件，监听到该事件完成上拉加载更多
    //
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // 发射自定义pullingUp事件给父组件
        this.$emit('pullingUp')
      })
    }
  },
  methods: {

    refresh () {
      this.scroll && this.scroll.refresh()
      if (this.scrollToEndFlag) {
        this.scroll.scrollTo(0, this.scroll.maxScrollY)
        console.log(this.scroll)
      }
    },
    // 封装滚动的方法
    topBack (x, y, time = 300) {
      this.scroll.scrollTo(x, y, time)
    },

    // 封装完成刷新的方法
    finishPullUp () {
      this.scroll.finishPullUp()
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      console.log(arguments)
      var el = arguments[0]
      // eslint-disable-next-line no-unused-vars
      var time = arguments[1]
      // this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      var targetEle = this.getElement(el)
      var pos = this.offset(targetEle)
      return pos
      // this.scrollTo(pos.left, pos.top, time, easing);
    },
    getElement (el) {
      return (typeof el === 'string'
        ? document.querySelector(el)
        : el)
    },
    offset (el) {
      var left = 0
      var top = 0
      var index = 0
      while (index < 2) {
        console.log('dta', el)
        left -= el.offsetLeft
        top -= el.offsetTop
        el = el.offsetParent
        index += 1
      }
      if (this.scroll.maxScrollY > top) {
        top = this.scroll.maxScrollY
      }
      return {
        left: left,
        top: top
      }
    }
  }
}
</script>

<style scoped>

</style>
