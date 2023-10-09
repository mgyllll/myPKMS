<template>
  <div>
    <el-button  icon="el-icon-plus" size="mini" type="primary" >添加</el-button>
    <el-button  icon="el-icon-delete" size="mini" type="danger" :disabled="this.multipleSelection.length==0" >批量删除</el-button>
    <el-table
      :data="tableData"
      style="width: 36%;margin-top:10px"
      @selection-change="handleSelectionChange"
      border
      height="525">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
        prop="roleType"
        label="角色编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="160">
      </el-table-column>
      <el-table-column label="操作" width="160">
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
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="5"
      layout="total, prev, pager, next"
      :total="3">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'roles',
  data () {
    return {
      tableData: [],
      multipleSelection: [],
      currentPage: 1
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(val)
    }
  },
  mounted () {
    this.$axios.get('/api/role/').then(resp => {
      if (resp) {
        this.tableData = resp
      }
    })
  }
}
</script>

<style lang="less" scoped>

</style>
