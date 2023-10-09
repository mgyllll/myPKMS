<template>
  <div style="margin-top:10px">
    <el-tabs v-model="activeName" type="border-card" style="height:100%" @click="handleClick">
      <el-tab-pane name="auditing">
         <span slot="label"><i class="iconfont iconweishenhe" style="color:#E6A23C;margin-right:5px"></i>待审核</span>
         <div>
          <el-table
              ref="table1"
              :data="currentPageData1"
              style="width: 100%"
              height="495"
              @expand-change="expandChange">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-row :gutter="20">
                        <el-col :span="6">知识标题：</el-col>
                        <el-col :span="18" style="text-align:left">{{props.row.titile}}</el-col>
                      </el-row>
                      <el-row :gutter="20" style="margin-top:10px">
                        <el-col :span="6">知识类别：</el-col>
                        <el-col :span="18">{{props.row.categoryID}}</el-col>
                      </el-row>
                      <el-row :gutter="20" style="margin-top:10px">
                        <el-col :span="6">内容简介：</el-col>
                        <el-col :span="18">{{props.row.description}}</el-col>
                      </el-row>
                      <el-row :gutter="20" style="margin-top:10px">
                        <el-col :span="6">知识标签：</el-col>
                        <el-col :span="18">{{props.row.tag}}</el-col>
                      </el-row>
                      <el-row :gutter="20" style="margin-top:10px">
                        <el-col :span="6" >是否共享：</el-col>
                        <el-col :span="18">
                          <el-tag size="mini" v-if="props.row.isShared == 'true'">共享</el-tag>
                          <el-tag size="mini" v-else type="danger">私密</el-tag>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="8">
                      <img class="cover" :src="'/api/res/' + props.row.photo" style="width:360px;height:200px"/>
                    </el-col>
                    <el-col :span="8">
                      <el-table
                        class="tableBox"
                        height="220"
                        width="500"
                        border
                        :data="filesData"
                        style="width: 100%;margin-top:10px"
                        size="mini"
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
                            <img :src="require('../../assets/img/' + scope.row.suffix + '.png')" style="width:70%" />
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="uploadTime"
                          label="上传时间"
                          width="90"
                          size="mini">
                        </el-table-column>
                        <el-table-column
                          prop="operate"
                          label="操作"
                          width="80"
                          size="mini">
                          <template slot-scope="scope">
                            <el-button type="text" @click="previewFile(scope.$index, scope.row)">
                              <i class="iconfont iconyulan1" style="font-size:20px;color:##85C2FF"></i>
                            </el-button>
                            <a :href="'/api/res' + scope.row.filePath" :download="scope.row.fileName" style="text-decoration:none;margin-left:10px">
                              <i class="iconfont iconxiazai" style="font-size:15px;color:#333333"></i>
                            </a>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column
                sortable
                label="知识编号"
                prop="resourceID">
              </el-table-column>
              <el-table-column
                sortable
                label="用户编号"
                prop="userID">
              </el-table-column>
              <el-table-column
                sortable
                label="知识标题"
                prop="titile">
              </el-table-column>
              <el-table-column
                sortable
                label="创建时间"
                prop="createDate">
              </el-table-column>
              <el-table-column
                sortable
                label="审核情况">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.audited === 1" type="success">已通过</el-tag>
                  <el-tag v-if="scope.row.audited === 0" type="warning">待审核</el-tag>
                  <el-tag v-if="scope.row.audited === -1" type="danger">不通过</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="success"
                    @click="handleAudit(scope.$index, scope.row)"
                    >审核</el-button>
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
            <el-dialog title="知识审核" :visible.sync="dialogFormVisible" style="width:67%;margin-left:18%">
              <el-form size="mini" :model="auditData">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="审核情况:" prop="state">
                      <el-radio-group size="mini" v-model="state">
                        <el-radio-button label="通过"></el-radio-button>
                        <el-radio-button label="不通过"></el-radio-button>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="审核意见:" prop="auditOpinion" >
                      <el-input type="textarea"
                                v-model="auditData.auditOpinion"
                                style="width:400px"
                                :autosize="{minRows: 2, maxRows: 2}">
                        </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    审核时间：
                    {{currentDate}}
                  </el-col>
                  <el-col :span="12" style="text-align:right">
                    审核人：
                    {{auditorName}}
                  </el-col>
                </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="confirm">确 定</el-button>
              </div>
            </el-dialog>
         </div>
         <div>
            <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="currentPage1"
              :page-sizes="[5, 10, 20, 50]"
              :page-size="pagesize1"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total1">
            </el-pagination>
         </div>
      </el-tab-pane>
      <el-tab-pane name="audited">
         <span slot="label"><i class="iconfont iconyishenhe" style="color:#67C23A;margin-right:5px"></i>已审核</span>
          <div>
          <el-table
              :data="currentPageData2"
              style="width: 100%"
              height="495">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-row>
                    <el-col :span="2" style="text-align:right">审核时间：</el-col>
                    <el-col :span="20">{{ props.row.auditTime }}</el-col>
                  </el-row>
                  <el-row style="margin-top:10px">
                    <el-col :span="2" style="text-align:right">审核人：</el-col>
                    <el-col :span="20">{{ props.row.auditorName }}</el-col>
                  </el-row>
                  <el-row style="margin-top:10px">
                    <el-col :span="2" style="text-align:right">审核意见：</el-col>
                    <el-col :span="20">{{ props.row.auditOpinion }}</el-col>
                  </el-row>
                  <el-row style="margin-top:10px">
                    <el-col :span="2" style="text-align:right">审核结论：</el-col>
                    <el-col :span="20">
                      <el-tag size="mini" v-if="props.row.audited === 1" type="success">已通过</el-tag>
                      <el-tag size="mini" v-if="props.row.audited === -1" type="danger">不通过</el-tag>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column
                sortable
                label="知识编号"
                prop="resourceID">
              </el-table-column>
              <el-table-column
                sortable
                label="用户编号"
                prop="userID">
              </el-table-column>
              <el-table-column
                sortable
                label="知识标题"
                prop="titile">
              </el-table-column>
              <el-table-column
                sortable
                label="创建时间"
                prop="createDate">
              </el-table-column>
              <el-table-column
                sortable
                label="审核情况">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.audited === 1" type="success">已通过</el-tag>
                  <el-tag v-if="scope.row.audited === 0" type="warning">待审核</el-tag>
                  <el-tag v-if="scope.row.audited === -1" type="danger">不通过</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="warning"
                    @click="cancelAudit(scope.$index, scope.row)"
                    >消审</el-button>
                </template>
              </el-table-column>
            </el-table>
         </div>
         <div>
            <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="currentPage2"
              :page-sizes="[5, 10, 20, 50]"
              :page-size="pagesize2"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total2">
            </el-pagination>
         </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PreviewVideo from '../../components/PreviewVideo'
import PreviewAudio from '../../components/PreviewAudio'
import PreviewPDF from '../../components/PreviewPDF'
import PreviewImage from '../../components/PreviewImage'
export default {
  name: 'issue_audit',
  components: {
    PreviewVideo,
    PreviewAudio,
    PreviewPDF,
    PreviewImage
  },
  data () {
    return {
      type: '',
      content: {
        src: '',
        title: '',
        artist: '未知艺术家',
        lrc: '',
        pic: ''
      },
      centerDialogVisible: false,
      preRow: {},
      filesData: [],
      state: '通过',
      currentDate: '',
      auditorName: '',
      auditData: {
        auditor: 0,
        resourceID: 0,
        audited: 1,
        auditOpinion: ''
      },
      textarea: '',
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      currentPageData1: [],
      pagesize1: 10,
      total1: 0,
      currentPage1: 1,
      currentPageData2: [],
      pagesize2: 10,
      total2: 0,
      currentPage2: 1,
      auditingData: [],
      auditedData: [],
      activeName: 'auditing'
    }
  },
  methods: {
    previewFile (index, row) {
      this.type = row.filePath.split('.')[1]
      this.content.src = '/api/res' + row.filePath
      this.content.title = row.fileName
      this.centerDialogVisible = true
    },
    expandChange (row, expandedRows) {
      if (this.preRow !== row) {
        this.$refs.table1.toggleRowExpansion(this.preRow, false)
        this.preRow = row
      }
      this.$axios.get('/api/files/?resourceId=' + row.resourceID).then(resp => {
        if (resp) {
          this.filesData = resp
          for (var i = 0; i < this.filesData.length; i++) {
            let suffix = this.filesData[i].filePath.split('.')[1]
            this.filesData[i].suffix = suffix
          }
        }
      })
      console.log('当前行的附件：', this.filesData)
    },
    cancelAudit (index, row) {
      this.auditData.resourceID = row.resourceID
      this.auditData.audited = 0
      this.$axios.put('/api/resources/audit', this.auditData).then(resp => {
        if (resp) {
          this.initRes()
        }
      })
    },
    confirm () {
      if (this.state === '通过') {
        this.auditData.audited = 1
      } else {
        this.auditData.audited = -1
      }
      this.$axios.put('/api/resources/audit', this.auditData).then(resp => {
        if (resp) {
          this.initRes()
          this.state = '通过'
        }
      })
      console.log('提交数据===》', this.auditData)
      this.dialogFormVisible = false
    },
    handleAudit (index, row) {
      console.log(index, row)
      this.dialogFormVisible = true
      this.auditData.resourceID = row.resourceID
    },
    handleSizeChange1 (val) {
      this.pagesize1 = val
      this.currentPageData1 = []
      this.total1 = this.auditingData.length
      let start = (this.currentPage1 - 1) * this.pagesize1
      let end = start + this.pagesize1
      for (var i = start; i < end; i++) {
        if (this.auditingData[i] !== undefined) {
          this.currentPageData1.push(this.auditingData[i])
        }
      }
    },
    handleCurrentChange1 (val) {
      this.currentPage1 = val
      this.currentPageData1 = []
      this.total1 = this.auditingData.length
      let start = (this.currentPage1 - 1) * this.pagesize1
      let end = start + this.pagesize1
      for (var i = start; i < end; i++) {
        if (this.auditingData[i] !== undefined) {
          this.currentPageData1.push(this.auditingData[i])
        }
      }
    },
    handleSizeChange2 (val) {
      this.pagesize2 = val
      this.currentPageData2 = []
      this.total2 = this.auditedData.length
      let start = (this.currentPage2 - 1) * this.pagesize2
      let end = start + this.pagesize2
      for (var i = start; i < end; i++) {
        if (this.auditedData[i] !== undefined) {
          this.currentPageData2.push(this.auditedData[i])
        }
      }
    },
    handleCurrentChange2 (val) {
      this.currentPage2 = val
      this.currentPageData2 = []
      this.total2 = this.auditedData.length
      let start = (this.currentPage2 - 1) * this.pagesize2
      let end = start + this.pagesize2
      for (var i = start; i < end; i++) {
        if (this.auditedData[i] !== undefined) {
          this.currentPageData2.push(this.auditedData[i])
        }
      }
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    async initRes () {
      this.$axios.get('/api/resources/all?all=1').then(resp => {
        if (resp) {
          this.auditingData = []
          this.auditedData = []
          for (var i = 0; i < resp.length; i++) {
            resp[i].filesData = this.filesData[i]
            if (resp[i].audited === 0) {
              this.auditingData.push(resp[i])
            } else if (resp[i].audited === -1 || resp[i].audited === 1) {
              this.auditedData.push(resp[i])
            }
          }
          console.log('未审核数据：', this.auditingData)
          this.currentPage1 = 1
          this.pagesize1 = 10
          this.currentPageData1 = []
          this.total1 = this.auditingData.length
          let start1 = (this.currentPage1 - 1) * this.pagesize1
          let end1 = start1 + this.pagesize1
          for (var j = start1; j < end1; j++) {
            if (this.auditingData[j] !== undefined) {
              this.currentPageData1.push(this.auditingData[j])
            }
          }
          console.log('已审核数据：', this.auditedData)
          this.currentPage2 = 1
          this.pagesize2 = 10
          this.currentPageData2 = []
          this.total2 = this.auditedData.length
          let start2 = (this.currentPage2 - 1) * this.pagesize2
          let end2 = start2 + this.pagesize2
          for (var k = start2; k < end2; k++) {
            if (this.auditedData[k] !== undefined) {
              this.currentPageData2.push(this.auditedData[k])
            }
          }
        }
      })
    }
  },
  mounted () {
    this.initRes()
    let now = new Date()
    this.currentDate = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate()
    this.auditorName = window.sessionStorage.getItem('userName')
    this.auditData.auditor = JSON.parse(window.sessionStorage.getItem('user')).userID
  }
}
</script>

<style lang="less" scoped>
  .cover {
    border-radius: 5%;
  }
</style>
