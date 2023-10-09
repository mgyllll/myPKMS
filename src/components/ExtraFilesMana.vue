<template>
  <div>
    <div>
      <el-table
        border
        :data="currentPageData"
        style="width: 100%;margin-top:10px"
        size="mini"
        height="567"
        :highlight-current-row="true">
        <el-table-column
          prop="fileID"
          label="文件编码"
          width="50"
          size="mini">
        </el-table-column>
        <el-table-column
          prop="fileName"
          label="文件名称"
          width="180"
          size="mini">
        </el-table-column>
        <el-table-column
          prop="types"
          label="文件类型"
          width="80"
          size="mini">
          <template slot-scope="scope">
            <img :src="require('../assets/img/' + scope.row.suffix + '.png')" style="width:80%" />
          </template>
        </el-table-column>
        <el-table-column
          prop="uploadTime"
          label="上传时间"
          width="120"
          size="mini">
        </el-table-column>
        <el-table-column
          prop="operate"
          label="操作"
          width="120"
          size="mini">
          <template slot-scope="scope">
            <el-button type="text" @click="previewFile(scope.$index, scope.row)">
              <i class="iconfont iconyulan1" style="font-size:25px;color:##85C2FF"></i>
            </el-button>
            <a :href="'/api/res' + scope.row.filePath" :download="scope.row.fileName" style="text-decoration:none;margin-left:10px">
              <i class="iconfont iconxiazai" style="font-size:20px;color:#333333"></i>
            </a>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :title="content.title"
        :visible.sync="centerDialogVisible"
        width="70%"
        center>
        <span style="text-align:center">
          <PreviewVideo v-if="type === 'mp4'" :Preview="content"></PreviewVideo>
          <PreviewAudio v-else-if="type === 'mp3'" :Preview="content"></PreviewAudio>
          <PreviewPDF v-else-if="type === 'pdf'" :Preview="content"></PreviewPDF>
          <PreviewImage v-else-if="type === 'jpg' || type === 'png'" :Preview="content"></PreviewImage>
          <span v-else style="color:#BEBEBE">非常抱歉！暂不支持该文件类型的预览，请下载后用相关应用打开！</span>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="centerDialogVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import PreviewVideo from './PreviewVideo'
import PreviewAudio from './PreviewAudio'
import PreviewPDF from './PreviewPDF'
import PreviewImage from './PreviewImage'
export default {
  name: 'ExtraFilesMana',
  components: {
    PreviewVideo,
    PreviewAudio,
    PreviewPDF,
    PreviewImage
  },
  data () {
    return {
      centerDialogVisible: false,
      filesData: [],
      currentPageData: [],
      pagesize: 10,
      total: 0,
      currentPage: 1,
      type: '',
      content: {
        src: '',
        title: '',
        artist: '未知艺术家',
        lrc: '',
        pic: ''
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pagesize = val
      this.currentPageData = []
      this.total = this.filesData.length
      let start = (this.currentPage - 1) * this.pagesize
      let end = start + this.pagesize
      for (var i = start; i < end; i++) {
        if (this.filesData[i] !== undefined) {
          this.currentPageData.push(this.filesData[i])
        }
      }
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.currentPageData = []
      this.total = this.filesData.length
      let start = (this.currentPage - 1) * this.pagesize
      let end = start + this.pagesize
      for (var i = start; i < end; i++) {
        if (this.filesData[i] !== undefined) {
          this.currentPageData.push(this.filesData[i])
        }
      }
    },
    previewFile (index, row) {
      this.type = row.filePath.split('.')[1]
      this.content.src = '/api/res' + row.filePath
      this.content.title = row.fileName
      this.centerDialogVisible = true
    },
    initFiles () {
      axios.get('/api/files/all').then(resp => {
        if (resp) {
          console.log(resp)
          this.filesData = resp
          for (var i = 0; i < this.filesData.length; i++) {
            let suffix = this.filesData[i].filePath.split('.')[1]
            this.filesData[i].suffix = suffix
          }
          this.currentPage = 1
          this.pagesize = 10
          this.currentPageData = []
          this.total = this.filesData.length
          let start = (this.currentPage - 1) * this.pagesize
          let end = start + this.pagesize
          for (var j = start; j < end; j++) {
            if (this.filesData[j] !== undefined) {
              this.currentPageData.push(this.filesData[j])
            }
          }
          console.log(this.filesData)
        }
      })
    }
  },
  mounted () {
    this.initFiles()
  }
}
</script>

<style scoped>

</style>
