<template>
  <div>
    <div class="tools">
      <el-button  type="text" @click="prePage" class="iconfont iconarrow-up-circle" style="font-size:30px;color:#7e7e79"></el-button>
      <el-button  type="text" @click="nextPage" class="iconfont icondirection-down-circle" style="font-size:30px;color:#7e7e79"></el-button>
      <span class="page" style="font-size:20px;color:#7e7e79;margin:0px 10px;padding-bottom:10px">{{pageNum}}/{{pageTotalNum}} </span>
      <el-button  type="text" @click="clock" class="iconfont iconshunshizhenxuanzhuan" style="font-size:30px;color:#7e7e79"></el-button>
      <el-button  type="text" @click="counterClock" class="iconfont iconnishizhenxuanzhuan" style="font-size:30px;color:#7e7e79"></el-button>
      <el-button  type="text" @click="scaleD" class="iconfont iconadd-circle" style="font-size:30px;color:#7e7e79"></el-button>
      <el-button  type="text" @click="scaleX" class="iconfont iconminus-circle" style="font-size:30px;color:#7e7e79"></el-button>
    </div>
    <pdf ref="pdf"
        :src="this.Preview.src"
        :page="pageNum"
        :rotate="pageRotate"
        @progress="loadedRatio = $event"
        @page-loaded="pageLoaded($event)"
        @num-pages="pageTotalNum=$event"
        @error="pdfError($event)"
        @link-clicked="page = $event">
    </pdf>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  name: 'PDF',
  props: ['Preview'],
  components: {
    pdf
  },
  data () {
    return {
      pageNum: 1,
      pageTotalNum: 1,
      pageRotate: 0,
      // 加载进度
      loadedRatio: 0,
      curPageNum: 0,
      scale: 100
    }
  },
  mounted: function () {},
  methods: {
    // 上一页函数，
    prePage () {
      var page = this.pageNum
      page = page > 1 ? page - 1 : this.pageTotalNum
      this.pageNum = page
    },
    // 下一页函数
    nextPage () {
      var page = this.pageNum
      page = page < this.pageTotalNum ? page + 1 : 1
      this.pageNum = page
    },
    // 页面顺时针翻转90度。
    clock () {
      this.pageRotate += 90
    },
    // 页面逆时针翻转90度。
    counterClock () {
      this.pageRotate -= 90
    },
    // 页面加载回调函数，其中e为当前页数
    pageLoaded (e) {
      this.curPageNum = e
    },
    // 其他的一些回调函数。
    pdfError (error) {
      console.error(error)
    },
    // 放大
    scaleD () {
      this.scale += 5
      this.$refs.pdf.$el.style.width = parseInt(this.scale) + '%'
      this.$refs.pdf.$el.style.height = parseInt(this.scale) + '%'
    },
    // 缩小
    scaleX () {
      if (this.scale === 100) {
        return
      }
      this.scale += -5
      this.$refs.pdf.$el.style.width = parseInt(this.scale) + '%'
      this.$refs.pdf.$el.style.height = parseInt(this.scale) + '%'
    }
  }
}
</script>
