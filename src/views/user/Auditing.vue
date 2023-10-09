<template>
  <div>
    <div>
      <el-table
        :data="currentPageData"
        style="width: 100%;"
        height="628"
        :default-sort = "{prop: 'createDate', order: 'descending'}">
        <el-table-column type="expand">
          <template slot-scope="scope">
             <el-row>
              <el-col :span="5">
                <div class="block" style="margin-top:12px">
                  <el-timeline>
                    <el-timeline-item
                      v-for="(activity, index) in scope.row.activities"
                      :key="index"
                      :color="activity.color"
                      :timestamp="activity.timestamp">
                      <span :style="'color:'+ activity.color">{{activity.content}}</span>
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </el-col>
              <el-col :span="19">
                <el-card class="box-card" shadow="never">
                  <div slot="header" class="clearfix">
                    <i v-if="scope.row.audited === -1" class="iconfont iconshanchuhang" style="color:#F56C6C"></i>
                    <i v-if="scope.row.audited === 0" class="iconfont iconweishenhe" style="color:#E6A23C"></i>
                    <i v-if="scope.row.audited === 1" class="iconfont iconyishenhe" style="color:#67C23A"></i>
                    <span :style="'color:' + scope.row.activities[1].color">{{scope.row.situation}}</span>
                  </div>
                  <div style="color:#909399">
                    <span>审核环节：</span><span>管理员审核</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>审核人：</span><span>{{scope.row.auditorName}}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>审核时间：</span><span>{{scope.row.auditTime}}</span>
                  </div>
                  <div style="color:#909399;margin-top:10px">
                    <span>审核意见：</span>
                    <span>{{scope.row.auditOpinion}}</span>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span style="color:#F56C6C">说明：上述流程中蓝色表示已审核，黄色表示待审核，红色表示审核不通过或退回</span>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
          label="知识编号"
          prop="resourceID">
        </el-table-column>
        <el-table-column
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
          label="审核情况"
          :filters="[{ text: '已通过', value: 1 }, { text: '待审核', value: 0 }, { text: '不通过', value: -1 }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.audited === 1" type="success">已通过</el-tag>
            <el-tag v-if="scope.row.audited === 0" type="warning">待审核</el-tag>
            <el-tag v-if="scope.row.audited === -1" type="danger">不通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
import AuditSituation from '../../components/AuditSituation'
export default {
  name: 'auditing',
  components: {
    AuditSituation
  },
  data () {
    return {
      currentPageData: [],
      pagesize: 10,
      total: 0,
      currentPage: 1,
      tableData: [],
      filterData: []
    }
  },
  methods: {
    filterTag (value, row) {
      return row.audited === value
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.currentPageData = []
      this.total = this.tableData.length
      let start = (this.currentPage - 1) * this.pagesize
      let end = start + this.pagesize
      for (var i = start; i < end; i++) {
        if (this.tableData[i] !== undefined) {
          this.currentPageData.push(this.tableData[i])
        }
      }
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.currentPageData = []
      this.total = this.tableData.length
      let start = (this.currentPage - 1) * this.pagesize
      let end = start + this.pagesize
      for (var i = start; i < end; i++) {
        if (this.tableData[i] !== undefined) {
          this.currentPageData.push(this.tableData[i])
        }
      }
    },
    initRes () {
      this.$axios.get('/api/resources/all?all=0').then(resp => {
        if (resp) {
          console.log(resp)
          this.tableData = resp
          for (var i = 0; i < this.tableData.length; i++) {
            let activities = [{
              content: '创建成功',
              timestamp: '',
              color: '#409EFF'
            }, {
              content: '管理员审核',
              timestamp: '',
              color: ''
            }, {
              content: '成功发布',
              timestamp: '',
              color: ''
            }]
            let situation = ''
            activities[0].timestamp = this.tableData[i].createDate
            if (this.tableData[i].audited === -1) {
              situation = '不通过'
              activities[1].timestamp = this.tableData[i].auditTime
              activities[1].color = '#F56C6C'
              activities[2].timestamp = ''
              activities[2].color = '#909399'
            } else if (this.tableData[i].audited === 0) {
              situation = '待审核'
              activities[1].timestamp = ''
              activities[1].color = '#E6A23C'
              activities[2].timestamp = ''
              activities[2].color = '#909399'
            } else if (this.tableData[i].audited === 1) {
              situation = '已通过'
              activities[1].timestamp = this.tableData[i].auditTime
              activities[1].color = '#409EFF'
              activities[2].timestamp = this.tableData[i].auditTime
              activities[2].color = '#409EFF'
            }
            this.tableData[i].activities = activities
            this.tableData[i].situation = situation
          }
          console.log(this.tableData)
          this.currentPage = 1
          this.pagesize = 10
          this.currentPageData = []
          this.total = this.tableData.length
          let start = (this.currentPage - 1) * this.pagesize
          let end = start + this.pagesize
          for (var j = start; j < end; j++) {
            if (this.tableData[j] !== undefined) {
              this.currentPageData.push(this.tableData[j])
            }
          }
        }
      })
    }

  },
  mounted () {
    this.initRes()
  }
}
</script>

<style lang="less" scoped>
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .box-card{
    width: 50%;
  }

</style>
