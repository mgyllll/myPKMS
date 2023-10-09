<template>
  <div>
    <el-container style="height: 660px; border: 0px solid #000">
      <el-aside width="230px" style="background-color: rgb(238, 241, 246)">
        <div class="title">
          <span >育儿知识库</span>
        </div>
        <el-tree
          :data="data"
          node-key="categoryID"
          ref="tree"
          :props="defaultProps"
          style="background-color: rgb(238, 241, 246)"
          :expand-on-click-node="false"
          @node-contextmenu="rightClick"
          :highlight-current="true"
          @node-click="handleNodeClick"
          :default-expanded-keys="defaultkeys">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-dropdown size='mini' placement="bottom" trigger="click">
                <span class="el-dropdown-link">
                  <i class="fa fa-plus" style="font-size:10px;color:#429ef3"></i>
                </span>
                <el-dropdown-menu size='small' slot="dropdown">
                  <el-dropdown-item command="a">
                    <el-button size='small' type="text" style="margin: 0px" @click="addNode">新增兄弟节点</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item command="a">
                    <el-button size='small' type="text" style="margin: 0px" @click="addChildNode">新增子节点</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button
                size='small'
                type="text"
                style="margin: 0px"
                >
                <i  class="fa fa-pencil-square-o" style="font-size:10px;color:#429ef3"></i>
              </el-button>
              <el-button
                size='small'
                type="text"
                @click="() => remove(node, data)"
                style="margin: 0px">
                <i class="fa fa-trash-o" style="font-size:10px;color:#ee2211"></i>
              </el-button>
            </span>
          </span>
        </el-tree>
        <el-dialog
          :title="nodeType"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <el-form ref="form">
            <el-form-item label="节点名称" >
              <el-input placeholder="请输入节点名称" v-model="treeNode.cayegoryName" style="width: 220px"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </span>
        </el-dialog>
      </el-aside>
      <el-container>
        <el-header style="text-align: left; font-size: 12px; height: 30px;background-color:rgb(245,245,245)">
          <div class="buttons">
            <el-button v-show="tabShow" type="text" size="mini"  @click="changeIsShow">
              <i class="fa fa-reply" style="font-size:20px;color:#585858"></i>
            </el-button>
            <el-button v-show="tableShow" type="primary"  size="mini" style="margin-top:5px;margin-left:0px" @click="addRes">新增</el-button>
            <el-button v-show="tableShow" icon="el-icon-delete" size="mini" type="danger" >批量删除</el-button>
            <el-button v-show="tabShow" type="warning" icon="el-icon-thumb" size="mini"  @click="saveForm">保存</el-button>
            <el-button v-show="tabShow" type="primary" icon="el-icon-position" size="mini" @click="submitForm">提交</el-button>
          </div>
        </el-header>
        <el-main v-show="tableShow" style="padding-top:8px;margin-top:0px;padding-left:10px">
          <el-table
            :data="currentPageData"
            stripe
            border
            height="560"
            size="mini"
            style="margin-left:0px"
            >
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column prop="resourceID" label="编号" width="120">
            </el-table-column>
            <el-table-column prop="titile" label="标题" width="350">
            </el-table-column>
            <el-table-column prop="tag" label="标签" width="300">
              <template slot-scope="t">
                <span v-if="t.row.tag !== ''">
                  <el-tag
                  type="warning"
                  disable-transitions v-for="(value, key) in t.row.tag.split(';')" :key="key" style="margin-left:3px">{{value}}</el-tag>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="createDate" label="创建时间" width="100">
            </el-table-column>
            <el-table-column prop="lastModifyDate" label="最近一次修改时间" width="120">
            </el-table-column>
            <el-table-column prop="isShared" label="是否共享" width="70" >
              <template slot-scope="share" >
                <el-tag
                  type="primary"
                  disable-transitions v-if="share.row.isShared === 'true'">共享</el-tag>
                  <el-tag
                  type="danger"
                  disable-transitions v-else>私密</el-tag>
              </template>
            </el-table-column>
             <el-table-column
                prop="operate"
                label="操作"
                width="140">
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" size="mini" circle></el-button>
                  <el-button type="danger" icon="el-icon-delete" size="mini" circle></el-button>
                  <el-button type="info" icon="el-icon-share" size="mini" circle @click="handleInfo(scope.$index, scope.row)"></el-button>
                </template>
              </el-table-column>
          </el-table>
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
        </el-main>
        <el-tabs v-show="tabShow"
        v-model="editableTabsValue"
        type="border-card"
        editable
        @edit="handleTabsEdit"
        style="margin-top:10px;margin-left:10px"
        @tab-remove="removeTab">
          <el-tab-pane label="资源详情" name="1" closable>
            <el-row :gutter="8">
              <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
                <el-col :span="17">
                  <el-form-item size="mini" label="知识标题:" prop="title">
                    <el-input v-model="formData.title" placeholder="请输入标题知识标题" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item size="mini" label="是否共享:" prop="isShared">
                    <el-switch
                      v-model="value"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
                    </el-switch>
                  </el-form-item>
                </el-col>

                <el-col :span="20">
                  <el-form-item size="mini" label="知识类别:" prop="category" >
                    <el-cascader v-model="formData.category" :options="categoryOptions" :props="categoryProps"
                      :style="{width: '100%'}" placeholder="请选择知识类别" filterable clearable></el-cascader>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item size="mini" label="内容简介:" prop="note">
                    <el-input v-model="formData.note" type="textarea" placeholder="请输入内容简介" show-word-limit
                      :autosize="{minRows: 9, maxRows: 9}" :style="{width: '100%'}"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item size="mini" label="封面图片:" prop="cover">
                    <el-upload
                      ref="coverUpload"
                      class="cover-uploader"
                      :action="'/api/sys/upload/uploadCover/'"
                      :show-file-list="false"
                      :auto-upload="true"
                      :on-success="handleCoverSuccess"
                      :before-upload="beforeCoverUpload">
                      <img class="el-icon-plus avatar-uploader-icon" v-if="this.coverURL !==  ''"  :src="'/api/res/' + this.coverURL" :alt="'陈惠琳'"  >
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :span="20">
                  <el-form-item size="mini" label="知识标签:" prop="label">
                    <el-select v-model="formData.label"
                                placeholder="请选择知识标签"
                                multiple
                                filterable
                                clearable
                                :style="{width: '100%'}"
                                allow-create
                                default-first-option>
                      <el-option v-for="(item, index) in labelOptions" :key="index" :label="item.label"
                        :value="item.value" :disabled="item.disabled" ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item size="mini" label="知识资源:" prop="upload">
                    <el-upload
                      :before-upload="beforeUploadFile"
                      ref="uploadFiles"
                      class="upload-demo"
                      :action="'/api/sys/upload/uploadFile/'"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      multiple
                      :data="extraData"
                      :on-success="successUploadFiles"
                      :limit="5"
                      :auto-upload="false"
                      :on-exceed="handleExceed"
                      >
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-table
                      class="tableBox"
                      height="185"
                      width="500"
                      border
                      :data="tableData1"
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
                          <img :src="require('../../assets/img/' + scope.row.types[0].suffix + '.png')" style="width:80%" />
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
                          <el-button type="text" @click="deleteFile(scope.$index, scope.row)">
                            <i class="iconfont iconshanchu" style="font-size:20px;color:#D81E06 "></i>
                          </el-button>
                          <el-button type="text" @click="previewFile(scope.$index, scope.row)">
                            <i class="iconfont iconyulan1" style="font-size:25px;color:##85C2FF"></i>
                          </el-button>
                          <a :href="'/api/res' + scope.row.filePath" :download="scope.row.fileName" style="text-decoration:none;margin-left:10px">
                            <i class="iconfont iconxiazai" style="font-size:20px;color:#333333"></i>
                          </a>
                        </template>
                      </el-table-column>
                    </el-table>
                </el-col>
              </el-form>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="富文本编辑" name="2" closable>
            <mavon-editor ref="md" v-model="formData.content" style="height:548px" @imgAdd="handleEditorImgAdd"
     @imgDel="handleEditorImgDel" ></mavon-editor>
          </el-tab-pane>
          <el-tab-pane
            :key="item.name"
            v-for="(item) in editableTabs"
            :label="item.title"
            :name="item.name"
          >
          <PreviewVideo v-if="item.type === 'mp4'" :Preview="item.content"></PreviewVideo>
          <PreviewAudio v-else-if="item.type === 'mp3'" :Preview="item.content"></PreviewAudio>
          <PreviewPDF v-else-if="item.type === 'pdf'" :Preview="item.content"></PreviewPDF>
          <PreviewImage v-else-if="item.type === 'jpg' || item.type === 'png'" :Preview="item.content"></PreviewImage>
          <span v-else style="color:#BEBEBE">非常抱歉！暂不支持该文件类型的预览，请下载后用相关应用打开！</span>
          </el-tab-pane>
        </el-tabs>
      </el-container>
    </el-container>
    <div v-show="menuVisible" >
          <ul id="menu" class="menu" style="">
              <el-dropdown-item size="mini" style="padding:0 5px;height:25px;line-height: 25px;">
                <el-button type="text" size="mini" @click="addNode" >
                  <i class="fa fa-plus-square-o"></i>
                  兄弟节点
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item size="mini" style="padding:0 5px;height:25px;line-height: 25px;">
                <el-button type="text" size="mini" @click="addChildNode">
                  <i class="fa fa-plus-square"></i>
                  子节点
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item  size="mini" style="padding:0 5px;height:25px;line-height: 25px;">
                <el-button type="text" size="mini" @click="deleteNode" style="color:#f00">
                  <i class="fa fa-trash-o"></i>
                  删除节点
                </el-button>
              </el-dropdown-item>
          </ul>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import PreviewVideo from '../../components/PreviewVideo'
import PreviewAudio from '../../components/PreviewAudio'
import PreviewPDF from '../../components/PreviewPDF'
import PreviewImage from '../../components/PreviewImage'
var _treeNode = {
  categoryID: '_',
  cayegoryName: '',
  parentNodeID: '0',
  isParentFlag: 0,
  level: 1,
  ancester: ''
}
let id = 15
export default {
  name: 'userHome',
  data () {
    return {
      defaultkeys: ['1@1'],
      nodeFlag: -1,
      currentCategoryid: '',
      value: true,
      currentPageData: [],
      total: 0,
      currentPage: 1,
      pagesize: 20,
      fileData: {
        fileName: '',
        filePath: '',
        fileSize: 0,
        resourceID: 0
      },
      resData: {
        description: '',
        photo: '',
        resourceID: 0,
        tag: '',
        titile: '',
        categoryID: '',
        isShared: ''
      },
      extraData: {
        resID: 0,
        uID: 0
      },
      coverURL: '',
      currentNode: {},
      nodeType: '',
      lastNode: {},
      treeNode: _treeNode,
      dialogVisible: false,
      id: 14,
      menuVisible: false,
      tableShow: true,
      tabShow: false,
      tableData: [],
      data: [],
      defaultProps: {
        children: 'children',
        label: 'cayegoryName'
      },
      tableData1: [],
      formData: {
        title: '',
        category: [],
        label: [],
        note: '',
        upload: null,
        isShared: '',
        content: ''
      },
      rules: {
        title: [{
          required: true,
          message: '请输入标题知识标题',
          trigger: 'blur'
        }],
        category: [{
          required: true,
          type: 'array',
          message: '请至少选择一个知识类别',
          trigger: 'change'
        }],
        label: [{
          required: true,
          type: 'array',
          message: '请至少选择一个知识标签',
          trigger: 'change'
        }],
        note: [{
          required: true,
          message: '请输入内容简介',
          trigger: 'blur'
        }]
      },
      categoryOptions: [],
      labelOptions: [],
      categoryProps: {
        'multiple': false,
        'label': 'cayegoryName',
        'value': 'categoryID',
        'children': 'children'
      },
      editableTabsValue: '1',
      editableTabs: [],
      tabIndex: 3,
      priorTab: '',
      tabNumber: 1
    }
  },
  watch: {},
  components: {
    PreviewVideo,
    PreviewAudio,
    PreviewPDF,
    PreviewImage
  },
  mounted () {
    this.initTree()
  },
  methods: {
    handleEditorImgAdd (pos, $file) {
      let formData = new FormData()
      formData.append('file', $file)
      this.$axios.post('/api/sys/upload/uploadCover/', formData).then(resp => {
        if (resp) {
          // console.log(resp)
          this.$refs.md.$img2Url(pos, resp.obj.fileurl)
        }
      })
    },
    handleEditorImgDel (pos) {
    },
    addRes () {
      this.$router.push('/Upload')
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.currentPageData = []
      let start = (this.currentPage - 1) * this.pagesize
      let end = start + this.pagesize
      for (var i = start; i < end; i++) {
        if (this.tableData[i] !== undefined) {
          this.currentPageData.push(this.tableData[i])
        }
      }
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.currentPageData = []
      let start = (this.currentPage - 1) * this.pagesize
      let end = start + this.pagesize
      for (var i = start; i < end; i++) {
        if (this.tableData[i] !== undefined) {
          this.currentPageData.push(this.tableData[i])
        }
      }
      console.log('当前页数据', this.currentPageData)
      console.log(`当前页: ${val}`)
    },
    handleCoverSuccess (res, file) {
      // console.log('上传封面后返回的图片路径', res.obj.filename)
      this.coverURL = 'pkms_cover/' + res.obj.filename
      // console.log('上传给后台的数据', this.resData)
    },
    beforeCoverUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传封面图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传封面图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    download () {
      let a = document.createElement('a')
      window.location.href = a.href
    },
    successUploadFiles (response, file) {
      console.log(response, file)
      this.fileData.fileName = file.name.split('.')[0]
      this.fileData.fileSize = file.size
      this.fileData.filePath = '/pkms_files/' + this.extraData.uID + '/' + this.extraData.resID + '/pkms_' + file.name.split('.')[1].toLowerCase() + '/' + response.obj.filename
      console.log('上传内容：', this.fileData)
      this.$axios.post('/api/files/add', this.fileData).then(resp => {
        if (resp) {
          console.log(resp)
        }
      })
    },
    beforeUploadFile (file) {
      this.extraData.uID = JSON.parse(window.sessionStorage.getItem('user')).userID
      this.extraData.resID = this.resData.resourceID
      console.log('附加参数', this.extraData)
      console.log('上传附件之前', file)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    previewFile (index, row) {
      let flag = true
      let tabs = this.editableTabs
      tabs.forEach((tab, index) => {
        if (tab.title === row.fileName) {
          this.editableTabsValue = tab.name
          flag = false
        }
      })
      if (flag) {
        let newTabName = ++this.tabIndex + ''
        ++this.tabNumber
        this.editableTabs.push({
          title: row.fileName,
          name: newTabName,
          type: row.filePath.split('.')[1],
          content: {
            src: '/api/res' + row.filePath,
            title: row.fileName,
            artist: '未知艺术家',
            lrc: '',
            pic: ''
          }
        })
        this.editableTabsValue = newTabName
      }
      // console.log('预览的index', index)
      // console.log('预览的row', row)
      // console.log('新选项卡：', this.editableTabs)
    },
    handleInfo (index, row) {
      this.editableTabsValue = '1'
      this.tabNumber = 1
      // console.log(index)
      console.log('row', row)
      // console.log('dddddd', this.$refs.tree.getNode({'categoryID': row.categoryID}).data.ancester)
      let data1 = this.$refs.tree.getNode({'categoryID': row.categoryID}).data
      let str = data1.ancester + data1.categoryID
      let category = str.split('#')
      // console.log('联级分类', category)
      this.fileData.resourceID = row.resourceID
      this.resData.resourceID = row.resourceID
      this.resData.categoryID = row.categoryID
      this.resData.isShared = row.isShared
      this.coverURL = row.photo
      this.formData.title = row.titile
      this.formData.category = category
      this.formData.note = row.description
      if (row.richText) {
        this.formData.content = row.richText
      } else {
        this.formData.content = ''
      }
      if (row.isShared === 'true') {
        this.value = true
      } else {
        this.value = false
      }
      console.log(this.formData.isShared)
      this.formData.label = row.tag.split(';')
      // console.log(row.resourceID)
      this.$axios.get('/api/files/?resourceId=' + row.resourceID).then(resp => {
        if (resp) {
          this.tableData1 = resp
          // console.log('dddd', resp)
        }
      })
      this.tableShow = !this.tableShow
      this.tabShow = !this.tabShow
    },
    initTree () {
      axios.get('/api/categories/data').then(resp => {
        if (resp) {
          // console.log(resp)
          let tree = translateDataToTree(resp, '0')
          this.categoryOptions = tree
          this.data = tree
        }
      })
    },
    handleClose (done) {
      done()
      this.treeNode.cayegoryName = ''
    },
    cancel () {
      this.dialogVisible = false
      this.treeNode.cayegoryName = ''
    },
    confirm () {
      this.$axios.post('/api/categories/addCategory', this.treeNode).then(resp => {
        if (resp) {
          console.log('增加的节点', resp.obj)
          var newNode = resp.obj
          if (this.nodeFlag === 0) {
            newNode.level = this.currentNode.level + 1
            this.$refs.tree.append(newNode, this.currentNode)
            this.defaultkeys = [this.currentNode.categoryID]
          }
          if (this.nodeFlag === 1) {
            newNode.level = this.currentNode.level
            if (this.currentNode.level === 1) {
              this.$refs.tree.insertAfter(newNode, this.lastNode)
            } else {
              this.$refs.tree.append(newNode, this.$refs.tree.getNode({'categoryID': this.currentNode.parentNodeID}))
            }
          }
        }
      })
      this.dialogVisible = false
    },
    append (data) {
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    remove (node, data) {
      let msg = ''
      // console.log('node的值：', node)
      // console.log('data的值：', data)
      // console.log(data.isParentFlag)
      if (data.isParentFlag === 1) {
        msg = '是否永久删除【' + data.cayegoryName + '】及其所有子节点！'
      }
      if (data.isParentFlag === 0) {
        msg = '是否永久删除【' + data.cayegoryName + '】节点！'
      }
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('/api/categories/' + this.currentNode.categoryID)
        this.$refs.tree.remove(node)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      // this.$refs.tree.remove(node)
      // const parent = node.parent
      // const children = parent.data.children || parent.data
      // const index = children.findIndex(d => d.id === data.id)
      // children.splice(index, 1)
    },
    resByCategoryId (data) {
      this.$axios.get('/api/resources/?categoryID=' + data.categoryID).then(resp => {
        if (resp) {
          this.currentPageData = []
          console.log('【' + data.cayegoryName + '】：', resp)
          this.tableData = resp
          this.total = this.tableData.length
          let start = (this.currentPage - 1) * this.pagesize
          let end = start + this.pagesize
          for (var i = start; i < end; i++) {
            // console.log(i + '------------', this.tableData[i])
            if (this.tableData[i] !== undefined) {
              this.currentPageData.push(this.tableData[i])
            }
          }
          // console.log('当前页数据', this.currentPageData)
        }
      })
    },
    // 单击树节点
    handleNodeClick (data) {
      this.currentCategoryid = data.categoryID
      // console.log('before---------》', this.editableTabs)
      let tabs = this.editableTabs
      tabs.forEach((tab, index) => {
        --this.tabNumber
        this.removeTab(tab.name)
      })
      // console.log('after-----------》', this.editableTabs)
      this.tabShow = false
      this.tableShow = true
      this.menuVisible = false
      this.currentNode = this.$refs.tree.getCurrentNode()
      // console.log('获得当前选中的节点：', this.currentNode)
      // console.log('获得当前选中的节点：', data)
      this.resByCategoryId(data)
    },
    rightClick (MouseEvent, object, Node, element) { // 鼠标右击触发事件
      let tabs = this.editableTabs
      tabs.forEach((tab, index) => {
        --this.tabNumber
        this.removeTab(tab.name)
      })
      this.tabShow = false
      this.tableShow = true
      this.menuVisible = false // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
      this.menuVisible = true // 显示模态窗口，跳出自定义菜单栏
      var menu = document.querySelector('#menu')
      menu.style.left = MouseEvent.clientX - 0 + 'px' // MouseEvent.clientX获取鼠标点击的坐标，在该处新增加的menu填充的位置
      menu.style.top = MouseEvent.clientY + 0 + 'px'
      document.addEventListener('click', this.foo) // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
      console.log('右键被点击的event:', MouseEvent)
      console.log('右键被点击的object:', object)
      console.log('右键被点击的value:', Node)
      console.log('右键被点击的element:', element)
      this.currentCategoryid = object.categoryID
      this.resByCategoryId(object)
      // console.log('鼠标点击了树形结构图')
      // 存储待操作的节点或删除、或在该层或子层添加节点
      this.currentNode = object
      // console.log('1111', this.currentNode)
      // alert(Node.level +":"+Node.label)
    },
    foo () { // 取消鼠标监听事件 菜单栏
      this.menuVisible = false
      document.removeEventListener('click', this.foo) // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
    },
    addNode () {
      console.log(this.data)
      // this.lastNode = resp[tree.length - 1]
      this.lastNode = this.data[this.data.length - 1]
      this.treeNode.cayegoryName = ''
      this.treeNode.parentNodeID = this.currentNode.parentNodeID
      this.nodeType = '添加【' + this.currentNode.cayegoryName + '】的兄弟节点'
      this.dialogVisible = true
      this.nodeFlag = 1
    },
    addChildNode () {
      this.treeNode.cayegoryName = ''
      this.treeNode.parentNodeID = this.currentNode.categoryID
      this.nodeType = '添加【' + this.currentNode.cayegoryName + '】的子节点'
      this.dialogVisible = true
      this.nodeFlag = 0
    },
    deleteNode () {
      let msg = ''
      if (this.currentNode.isParentFlag === 1) {
        msg = '是否永久删除【' + this.currentNode.cayegoryName + '】及其所有子节点！'
      }
      if (this.currentNode.isParentFlag === 0) {
        msg = '是否永久删除【' + this.currentNode.cayegoryName + '】节点！'
      }
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('/api/categories/' + this.currentNode.categoryID)
        this.$refs.tree.remove(this.currentNode)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      // console.log(this.currentNode.isParentFlag)
    },
    saveForm () {
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          // console.log('修改后的数据：', this.formData)
          this.resData.description = this.formData.note
          this.resData.tag = ''
          for (var i = 0; i < this.formData.label.length; i++) {
            if (this.resData.tag === '') {
              this.resData.tag = this.formData.label[i]
            } else {
              this.resData.tag = this.resData.tag + ';' + this.formData.label[i]
            }
          }
          this.resData.titile = this.formData.title
          this.resData.photo = this.coverURL
          this.resData.isShared = this.value
          this.resData.categoryID = this.formData.category[this.formData.category.length - 1]
          this.resData.richText = this.formData.content
          // console.log('类别', this.formData.category[this.formData.category.length - 1])
          // console.log('传给后台的数据1', this.resData)
          this.$refs.uploadFiles.submit()
          this.$axios.put('/api//resources/updateRes', this.resData).then(resp => {
            if (resp) {
              console.log('修改后返回的值：', resp)
            }
          })
        }
      })
    },
    submitForm () {
      console.log('传给后台的数据2', this.resData)
      this.$axios.get('/api/resources/?categoryID=' + this.currentCategoryid).then(resp => {
        if (resp) {
          this.currentPageData = []
          this.tableData = resp
          this.total = this.tableData.length
          let start = (this.currentPage - 1) * this.pagesize
          let end = start + this.pagesize
          for (var i = start; i < end; i++) {
            if (this.tableData[i] !== undefined) {
              this.currentPageData.push(this.tableData[i])
            }
          }
        }
      })
      this.changeIsShow()
      this.$refs.uploadFiles.clearFiles()
    },
    removeTab (targetName) {
      --this.tabNumber
      this.tabIndex = --this.tabIndex
      let tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      // console.log(this.tabNumber)
      if (this.tabNumber === 1) {
        activeName = '1'
      }
      console.log('上一个tab', activeName)
      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
    },
    handleTabsEdit (targetName, action) {
    },
    changeIsShow () {
      this.tableShow = !this.tableShow
      this.tabShow = !this.tabShow
    },
    getCheckedNodes () {
      console.log(this.$refs.tree.getCheckedNodes())
    },
    getCheckedKeys () {
      console.log(this.$refs.tree.getCheckedKeys())
    },
    setCheckedNodes () {
      this.$refs.tree.setCheckedNodes([{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 9,
        label: '三级 1-1-1'
      }])
    },
    setCheckedKeys () {
      this.$refs.tree.setCheckedKeys([3])
    },
    resetChecked () {
      this.$refs.tree.setCheckedKeys([])
    }
  }
}

// eslint-disable-next-line no-unused-vars
// 数组生成树
function translateDataToTree (data, parentId) {
  let tree = []
  let temp
  data.forEach((item, index) => {
    if (data[index].parentNodeID === parentId) {
      let obj = data[index]
      temp = translateDataToTree(data, data[index].categoryID)
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
  .el-header {
    margin-top: 0px;
    background-color: #ffffff;
    line-height: 30px;
    padding-left: 10px;
  }

  .title{
    background-color: #5c656e;
    height: 30px;
    text-align: center;
    font-family: '楷体';

    span{
      color: #fff;
      line-height: 30px;
    }
  }

  .el-aside {
    color: #333;
  }
  .menu__item {
            display: block;
            line-height: 20px;
            text-align: center;
            margin-top: 10px;
            padding: 0;
        }
        .menu {
            height: 80px;
            width: 75px;
            margin: 0px;
            position: absolute;
            border-radius: 4px;
            //border: 1px solid #999999;
            background-color: hsl(0, 0%, 100%);
            padding: 5px 0px 0px 0px;
            box-shadow: 2px;
        }
        li:hover {
            //background-color: #429ef3;
            color: #585858;
        }

    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
  }
  .avatar-uploader-icon {
    font-size: 50px;
    color: #dadada;
    width: 306px;
    height: 174px;
    line-height: 174px;
    text-align: center;
    background-color: #5c656e;
    opacity:0.5;
    border-radius: 5px;
  }
</style>
