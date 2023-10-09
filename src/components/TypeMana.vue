<template>
  <div>
    <div>
      <!-- Form -->
      <el-dialog class="addType" :before-close="handleClose" size="mini" :title="title" :visible.sync="dialogFormVisible" >
        <el-form :rules="typeRules" size="mini" :model="form" ref="form">
          <el-form-item size="mini" label="文件名称:" :label-width="formLabelWidth" prop="typeName">
            <el-input size="mini" v-model="form.typeName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item size="mini" label="后缀名:" :label-width="formLabelWidth" prop="suffix">
            <el-input size="mini" v-model="form.suffix" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item size="mini" label="备注:" :label-width="formLabelWidth" prop="note">
            <el-input size="mini" type="textarea" rows="4" v-model="form.note" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="cancel('form')">取 消</el-button>
          <el-button size="mini" type="primary" @click="confirm('form')">确 定</el-button>
        </div>
      </el-dialog>
      <el-button  icon="el-icon-plus" size="mini" type="primary" @click="addType()">添加</el-button>
      <el-button  icon="el-icon-delete" size="mini" type="danger" :disabled="this.multipleSelection.length==0" @click="deleteMany">批量删除</el-button>
    </div>
    <div class="typeTable">
      <el-table
        size="small"
        :data="currentPageData"
        style="width: 100%"
        height="529"
        :stripe="true"
        :border="true"
         @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
         >
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form size="small" label-position="left" inline class="demo-table-expand">
              <el-form-item size="small" label="类型编号">
                <span>{{ props.row.typeID }}</span>
              </el-form-item>
              <el-form-item size="small" label="类型名称">
                <span>{{ props.row.typeName }}</span>
              </el-form-item>
              <el-form-item size="small" label="后缀名">
                <span>{{ props.row.suffix }}</span>
              </el-form-item>
              <el-form-item size="small" label="类型描述">
                <span>{{ props.row.note }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="typeID"
          label="类型编码"
          width="90">
        </el-table-column>
        <el-table-column
          prop="typeName"
          label="类型名称"
          width="220">
        </el-table-column>
        <el-table-column
          prop="suffix"
          label="后缀名"
          width="90">
          <template slot-scope="scope">
            <el-tag
              type="success"
              disable-transitions>{{scope.row.suffix}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="operate"
          label="操作"
          width="200">
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
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'MenuTree',
  data () {
    return {
      currentPageData: [],
      pagesize: 10,
      total: 0,
      currentPage: 1,
      multipleSelection: [],
      title: '',
      flag: '',
      typeRules: {
        typeName: [
          { required: true, message: '请输入类型名称', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        suffix: [
          { required: true, message: '请输入后缀名', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false,
      formLabelWidth: '90px',
      form: {
        typeName: '',
        suffix: '',
        note: ''
      },
      updateType: {
        typeID: 0,
        typeName: '',
        suffix: '',
        note: ''
      },
      typeData: []
    }
  },
  methods: {
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.currentPageData = []
      this.total = this.typeData.length
      let start = (this.currentPage - 1) * this.pagesize
      let end = start + this.pagesize
      for (var i = start; i < end; i++) {
        if (this.typeData[i] !== undefined) {
          this.currentPageData.push(this.typeData[i])
        }
      }
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.currentPageData = []
      this.total = this.typeData.length
      let start = (this.currentPage - 1) * this.pagesize
      let end = start + this.pagesize
      for (var i = start; i < end; i++) {
        if (this.typeData[i] !== undefined) {
          this.currentPageData.push(this.typeData[i])
        }
      }
    },
    deleteMany () {
      this.$confirm('此操作将永久删除[' + this.multipleSelection.length + ']条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = '?'
        this.multipleSelection.forEach(items => {
          ids += 'ids=' + items.typeID + '&'
        })
        console.log(ids)
        axios.delete('/api/system/config/types/' + ids).then(resp => {
          if (resp) {
            this.initTypes()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(val)
    },
    formReset () {
      this.form.typeName = ''
      this.form.suffix = ''
      this.form.note = ''
    },
    handleClose (done) {
      this.flag = ''
      this.formReset()
      done()
    },
    cancel (typeFrom) {
      this.flag = ''
      this.formReset()
      this.dialogFormVisible = false
    },
    addType () {
      this.flag = 'add'
      this.title = '添加文件类型'
      this.dialogFormVisible = true
    },
    confirm (typeFrom) {
      if (this.flag === 'add') {
        this.flag = ''
        this.$refs[typeFrom].validate((valid) => {
          if (valid) {
            axios.post('/api/system/config/types/', this.form).then(resp => {
              if (resp) {
                this.initTypes()
                this.dialogFormVisible = false
                this.$refs[typeFrom].resetFields()
              }
            })
          } else {
            this.$refs[typeFrom].resetFields()
            return false
          }
        })
      }
      if (this.flag === 'edit') {
        this.flag = ''
        this.updateType.typeName = this.form.typeName
        this.updateType.suffix = this.form.suffix
        this.updateType.note = this.form.note
        this.$refs[typeFrom].validate((valid) => {
          if (valid) {
            axios.put('/api/system/config/types/', this.updateType).then(resp => {
              if (resp) {
                this.initTypes()
                this.dialogFormVisible = false
                this.$refs[typeFrom].resetFields()
              }
            })
          } else {
            this.$refs[typeFrom].resetFields()
            return false
          }
        })
      }
    },
    handleEdit (index, row) {
      this.updateType.typeID = row.typeID
      this.flag = 'edit'
      this.title = '修改[' + row.typeID + '-' + row.typeName + ']文件类型'
      this.form.typeName = row.typeName
      this.form.suffix = row.suffix
      this.form.note = row.note
      this.dialogFormVisible = true
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除[' + row.typeID + row.typeName + ']文件类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete('/api/system/config/types/' + row.typeID).then(resp => {
          if (resp) {
            this.initTypes()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    initTypes () {
      axios.get('/api/system/config/types/').then(resp => {
        this.typeData = resp
        this.currentPage = 1
        this.pagesize = 10
        this.currentPageData = []
        this.total = this.typeData.length
        let start = (this.currentPage - 1) * this.pagesize
        let end = start + this.pagesize
        for (var i = start; i < end; i++) {
          if (this.typeData[i] !== undefined) {
            this.currentPageData.push(this.typeData[i])
          }
        }
      })
    }
  },
  mounted () {
    this.initTypes()
  }
}
</script>

<style lang="less">
  .typename,.suffix,.note{
    width: 300px;
    margin-left: 8px;
  }
  .addType{
    width: 800px;
    position: absolute;
    left: 25%;
  }
  .typeTable{
    margin-top: 10px;
  }

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
    width: 100%;
  }
</style>
