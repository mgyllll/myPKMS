<template>
  <div>
    <!-- 用户列表卡片 -->
    <el-card size="mini" class="box-card">
      <el-form size="mini" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item size="mini" label="角色" label-width="50px">
        <el-select size="mini" v-model="formInline.city" placeholder="请选择">
          <el-option
            size="mini"
            v-for="item in cities"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item size="mini" label="用户名"  label-width="70px" style="text-align: left;">
          <el-input size="mini" clearable v-model="formInline.user" placeholder="请输入用户名" ></el-input>
        </el-form-item>
        <el-form-item size="mini" label="邮箱"  label-width="70px">
          <el-input size="mini" clearable v-model="formInline.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item size="mini" style="padding-left:20px">
          <el-radio size="mini" v-model="formInline.radio" label="0">美女</el-radio>
          <el-radio size="mini" v-model="formInline.radio" label="1">帅哥</el-radio>
          <el-radio size="mini" v-model="formInline.radio" label="2">保密</el-radio>
        </el-form-item>
        <el-form-item size="mini" label="昵称"  label-width="50px" style="text-align: left;">
          <el-input size="mini" clearable v-model="formInline.nickName" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item size="mini" style="margin-left: 15px;margin-right: 0px;">
          <el-button size="mini" icon="el-icon-refresh" >刷新</el-button>
          <el-button size="mini" type="primary" icon="el-icon-search" >查询</el-button>
          <el-button size="mini" type="success" icon="el-icon-plus" >添加</el-button>
          <el-button size="mini" type="info" icon="el-icon-download" >导出</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格内容显示区域 -->
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        size="mini"
        :data="currentPageData"
        height="420"
        border
        style="width: 100%">
        <el-table-column
          fixed
          type="index"
          width="50" />
        <el-table-column
          fixed
          type="selection"
          width="55" />
        <el-table-column
          fixed
          prop="userID"
          label="用户编码"
          width="80">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="140">
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          width="60">
        </el-table-column>
        <el-table-column
          prop="birthDate"
          label="出生日期"
          width="120">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="qq"
          label="QQ"
          width="120">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="200">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="300">
        </el-table-column>
        <el-table-column
          fixed='right'
          prop="operate"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      style="padding-top: 10px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'menus',
  data () {
    return {
      currentPageData: [],
      pagesize: 10,
      total: 0,
      currentPage: 1,
      loading: false,
      keyWords: '',
      usersData: [],
      value: true,
      formInline: {
        user: '',
        region: '',
        city: '',
        radio: '0',
        nickName: ''
      },
      cities: [{
        value: '1',
        label: '普通用户'
      }, {
        value: '2',
        label: '管理员'
      }, {
        value: '3',
        label: '超级管理员'
      }]
    }
  },
  methods: {
    handleEdit (index, row) {
    },
    handleDelete (index, row) {
    },
    async initUsers () {
      this.loading = true
      this.$axios.get('/api/system/user/?keywords=' + this.keyWords).then(resp => {
        this.loading = false
        if (resp) {
          this.usersData = resp
          console.log(resp)
          this.currentPage = 1
          this.pagesize = 10
          this.currentPageData = []
          this.total = this.usersData.length
          let start = (this.currentPage - 1) * this.pagesize
          let end = start + this.pagesize
          for (var i = start; i < end; i++) {
            if (this.usersData[i] !== undefined) {
              this.currentPageData.push(this.usersData[i])
            }
          }
        }
      })
    },
    onSubmit () {
      console.log('submit!')
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.currentPageData = []
      this.total = this.usersData.length
      let start = (this.currentPage - 1) * this.pagesize
      let end = start + this.pagesize
      for (var i = start; i < end; i++) {
        if (this.usersData[i] !== undefined) {
          this.currentPageData.push(this.usersData[i])
        }
      }
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.currentPageData = []
      this.total = this.usersData.length
      let start = (this.currentPage - 1) * this.pagesize
      let end = start + this.pagesize
      for (var i = start; i < end; i++) {
        if (this.usersData[i] !== undefined) {
          this.currentPageData.push(this.usersData[i])
        }
      }
      console.log(`当前页: ${val}`)
    }
  },
  mounted () {
    this.initUsers()
  }
}
</script>

<style lang="less" scoped>

</style>
