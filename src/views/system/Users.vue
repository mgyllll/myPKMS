<template>
  <div>
    <div style="display: flex; justify-content: space-between">
      <div>
        <el-input
        size="small"
        style="width:300px"
        prefix-icon="el-icon-search"
        placeholder="请输入关键词进行搜索..."
        v-model="keyWords"
        clearable
        @clear="initUsers"
        @keyup.enter.native="enter"
        ></el-input>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" >
          <i class="fa fa-angle-double-down"></i>
          高级搜索
        </el-button>
      </div>
      <div>
        <el-button size="small" type="success" >
          <i class="fa fa-level-up"></i>
          导入数据
        </el-button>
        <el-button size="small" type="success" >
          <i class="fa fa-level-down"></i>
          导出数据
        </el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="showAddUser('userForm')">添加管理员</el-button>
      </div>
    </div>
    <div>
      <!-- 表格内容显示区域 -->
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        size="mini"
        :data="currentPageData"
        height="515"
        border
        style="width: 100%;margin-top:10px">
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
    </div>
    <div class="block">
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
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="42%">
      <div>
        <el-form ref="userForm" :model="user" label-width="85px" :rules="addUserRules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名:" prop="userName">
                <el-input size="mini" prefix-icon="el-icon-edit" v-model="user.userName" placeholder="请输入用户姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别:" prop="gender">
                <el-radio-group v-model="user.gender">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="出生日期:" prop="birthDate">
                <el-date-picker
                  v-model="user.birthDate"
                  type="date"
                  size="mini"
                  value-format="yyyy-MM-dd"
                  placeholder="出生日期"
                  editable>
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号:" prop="phone">
                <el-input size="mini" prefix-icon="el-icon-mobile-phone" v-model="user.phone" placeholder="请输入手机号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
             <el-col :span="12">
               <el-form-item label="邮箱:" prop="email">
                <el-input size="mini" prefix-icon="el-icon-message" v-model="user.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
             </el-col>
             <el-col :span="12">
               <el-form-item label="QQ:" prop="qq">
                <el-input size="mini" prefix-icon="iconfont iconqq" v-model="user.qq" placeholder="请输入QQ"></el-input>
              </el-form-item>
             </el-col>
          </el-row>
          <el-row>
             <el-col :span="12">
               <el-form-item label="微信:" prop="weChat">
                <el-input size="mini" prefix-icon="iconfont iconweixin" v-model="user.weChat" placeholder="请输入微信"></el-input>
              </el-form-item>
             </el-col>
             <el-col :span="12">
               <el-form-item label="地址:" prop="native">
                <el-cascader
                  size="mini"
                  v-model="user.native"
                  :options="areasOptions"
                  :props="areasProps"
                  @change="handleChange"
                  style="width:100%"
                  clearable
                  filterable>
                </el-cascader>
              </el-form-item>
             </el-col>
          </el-row>
          <el-row>
             <el-col :span="24">
               <el-form-item label="详细地址:" prop="detail">
                <el-input size="mini" prefix-icon="iconfont icondizhi" v-model="user.detail" placeholder="请输入详细地址"></el-input>
              </el-form-item>
             </el-col>
          </el-row>
          <el-row>
             <el-col :span="12">
              <el-form-item label="用户角色:" prop="roleType">
                <el-select size="mini" v-model="user.roleType" placeholder="请选择用户角色" style="width:100%">
                  <el-option
                    v-for="item in roleOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
             </el-col>
             <el-col :span="12">
               <el-form-item label="密码:" prop="password">
                <el-input size="mini" type="password" prefix-icon="el-icon-lock" v-model="user.password" placeholder="请输入密码"></el-input>
              </el-form-item>
             </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="confirm('userForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'users',
  data () {
    return {
      operate: '',
      title: '',
      areasProps: {
        'multiple': false,
        'label': 'areaName',
        'value': 'areaName',
        'children': 'children',
        expandTrigger: 'hover'
      },
      areasOptions: [],
      roleOptions: [{
        value: 0,
        label: '普通用户'
      }, {
        value: 1,
        label: '管理员'
      }, {
        value: 2,
        label: '超级管理员'
      }],
      user: {
        userID: 0,
        username: '',
        userName: '',
        password: '',
        birthDate: '',
        gender: '男',
        phone: '',
        email: '',
        qq: '',
        weChat: '',
        address: '',
        native: [],
        detail: '',
        city: '',
        roleType: 0,
        photo: ''
      },
      addUserRules: {
        userName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        birthDate: [
          { required: true, message: '请输入出生日期', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        native: [
          { required: true, message: '请选择省/市/县', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        roleType: [
          { required: true, message: '请选择用户角色', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      loading: false,
      currentPageData: [],
      pagesize: 10,
      total: 0,
      currentPage: 1,
      keyWords: '',
      usersData: []
    }
  },
  methods: {
    handleChange (value) {
      console.log(value)
    },
    showAddUser (form) {
      this.operate = 'add'
      this.title = '添加员工'
      this.user = {
        userID: 0,
        username: '',
        userName: '',
        password: '',
        birthDate: '',
        gender: '男',
        phone: '',
        email: '',
        qq: '',
        weChat: '',
        address: '',
        native: [],
        detail: '',
        city: '',
        roleType: 0,
        photo: ''
      }
      this.dialogVisible = true
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
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
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
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
    },
    handleEdit (index, row) {
      this.operate = 'edit'
      console.log(row)
      this.title = '编辑员工信息'
      this.user.userName = row.username
      this.user.gender = row.gender
      this.user.birthDate = row.birthDate
      this.user.phone = row.phone
      this.user.email = row.email
      this.user.qq = row.qq
      this.user.weChat = row.weChat
      this.user.detail = row.address
      this.user.roleType = row.roleType
      this.user.userID = row.userID
      this.dialogVisible = true
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除名称为[' + row.username + ']的用户及其所有数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('/api/system/user/' + row.userID).then(resp => {
          if (resp) {
            this.initUsers()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async initUsers () {
      this.loading = true
      this.$axios.get('/api/system/user/?keywords=' + this.keyWords).then(resp => {
        this.loading = false
        if (resp) {
          this.usersData = resp
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
    enter () {
      this.initUsers()
    },
    search () {
      this.initUsers()
    },
    initAreas () {
      this.$axios.get('/api/areas/').then(resp => {
        if (resp) {
          let tree = translateDataToTree(resp, '')
          this.areasOptions = tree
          console.log(tree)
        }
      })
    },
    confirm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.user.address = ''
          for (var i = 0; i < this.user.native.length; i++) {
            this.user.address = this.user.address + this.user.native[i]
          }
          this.user.address = this.user.address + this.user.detail
          this.user.city = this.user.native[ this.user.native.length - 1 ]
          if (this.operate === 'add') {
            this.$axios.post('/api/system/user/addUser', this.user).then(resp => {
              if (resp) {
                console.log(resp)
                this.$refs[form].resetFields()
                this.dialogVisible = false
                this.initUsers()
              }
            })
          } else if (this.operate === 'edit') {
            this.$axios.post('/api/system/user/', this.user).then(resp => {
              if (resp) {
                console.log(resp)
                this.$refs[form].resetFields()
                this.dialogVisible = false
                this.initUsers()
              }
            })
          }
        }
      })
      this.operate = ''
    }
  },
  mounted () {
    this.initUsers()
    this.initAreas()
  }
}

// 数组生成树
function translateDataToTree (data, parentId) {
  let tree = []
  let temp
  data.forEach((item, index) => {
    if (data[index].parentnodeID === parentId) {
      let obj = data[index]
      temp = translateDataToTree(data, data[index].areaID)
      if (temp.length > 0) {
        obj.children = temp
      }
      tree.push(obj)
    }
  })
  return tree
}
</script>

<style lang="less" scoped>

</style>
