<template>
  <div class="container">
    <el-form size="mini" ref="form" :model="form" label-width="95px" :rules="uploadRules">
      <el-row class="tool" >
        <el-col :span="12" style="text-align:left;padding-left:10px;padding-top:8px">
          <span style="color:#BEBEBE"><i class="iconfont iconyuanchuang"></i>欢迎进行育儿知识创作，请尊重原创，切勿抄袭！</span>
        </el-col>
        <el-col :span="12" style="text-align:right;padding-right:10px">
          <el-form-item class="button" label-width="0px">
            <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
            <el-button @click="clearAll">清空</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" class="left" style="min-height:880px">
          <el-row style="text-align:center;padding:0px 0px 15px 0px;">育儿知识发布</el-row>
          <el-row>
            <el-form-item label="标题名称:" prop="titile">
              <el-input v-model="form.titile" style="width:320px" placeholder="请输入标题"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="育儿类别:" prop="categoryID">
              <el-cascader
                style="width:320px"
                placeholder="请选择育儿类别"
                v-model="form.categoryID"
                :options="categoryOptions"
                :props="categoryProps"
                @change="handleChange"
                clearable
                filterable>
              </el-cascader>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="内容简介:" prop="description" >
              <el-input type="textarea" placeholder="请输入内容简介" v-model="form.description" style="width:320px" :autosize="{minRows: 6, maxRows: 6}"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="标签选择:" prop="label">
              <el-select v-model="form.label"
                          placeholder="请选择知识标签"
                          multiple
                          filterable
                          clearable
                          style="width:320px"
                          allow-create
                          default-first-option>
                <el-option
                  v-for="item in labelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="封面上传:" prop="cover">
              <el-upload
                  v-model="form.cover"
                  ref="uploadCover"
                  :before-upload="beforeUpload"
                  :action="'/api/sys/upload/uploadCover/'"
                  list-type="picture-card"
                  :on-success="successUploadCover"
                  :auto-upload="false"
                  accept="image/jpeg,image/png"
                  :data="extraData"
                  :limit="1"
                  :show-file-list="true">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                      >
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleDownload(file)"
                        >
                          <i class="el-icon-download"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                <div class="el-upload__tip" slot="tip">只能上传一张 jpg/png 图片</div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="是否共享:" prop="isShared">
              <el-switch
                v-model="form.isShared"
                active-color="#13ce66"
                inactive-color="#ff4949"
                ></el-switch>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="附件上传:" class="extra">
              <el-upload
                :before-upload="beforeUploadFile"
                ref="uploadFiles"
                class="upload-demo"
                drag
                :action="'/api/sys/upload/uploadFile/'"
                multiple
                :data="extraData"
                :on-success="successUploadFiles"
                :auto-upload="false">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">文件列表：</div>
              </el-upload>
            </el-form-item>
          </el-row>
        </el-col>
        <el-col :span="17" class="right" style="width:1060px;height:880px">
          <el-form-item class="content" label-width="10px" prop="content">
            <mavon-editor ref="md" v-model="form.content" style="height:860px" @imgAdd="handleEditorImgAdd"
     @imgDel="handleEditorImgDel" ></mavon-editor>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      pic: true,
      extraData: {
        resID: 0,
        uID: 0
      },
      categoryProps: {
        'multiple': false,
        'label': 'cayegoryName',
        'value': 'categoryID',
        'children': 'children',
        expandTrigger: 'hover'
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      categoryOptions: [],
      labelOptions: [],
      uploadRules: {
        titile: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        categoryID: [
          { required: true, message: '请选择类别', trigger: 'blur' }
        ],
        label: [
          { required: true, message: '请选择或输入至少一个标签', trigger: 'blur' }
        ],
        description: [
          { min: 10, message: '至少 10 个字符', trigger: 'blur' },
          { required: true, message: '请输入描述内容', trigger: 'blur' }
        ],
        cover: [
          { required: true, trigger: 'blur' }
        ],
        content: [
          { required: true, trigger: 'blur' }
        ],
        isShared: [
          { required: true, trigger: 'blur' }
        ]
      },
      form: {
        titile: '',
        label: '',
        isShared: true,
        categoryID: '',
        description: '',
        cover: '',
        content: ''
      },
      resData: {
        categoryID: '',
        description: '',
        isShared: '',
        photo: '',
        resourceID: 0,
        tag: '',
        titile: '',
        richText: ''
      },
      fileData: {
        fileName: '',
        filePath: '',
        fileSize: 0,
        resourceID: 0
      }
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
    this.init()
  },
  methods: {
    handleEditorImgAdd (pos, $file) {
      let formData = new FormData()
      formData.append('file', $file)
      this.$axios.post('/api/sys/upload/uploadCover/', formData).then(resp => {
        if (resp) {
          console.log(resp)
          this.$refs.md.$img2Url(pos, resp.obj.fileurl)
        }
      })
    },
    handleEditorImgDel (pos) {

    },
    clearAll () {
      this.$refs['form'].resetFields()
      this.$refs.uploadCover.clearFiles()
      this.$refs.uploadFiles.clearFiles()
    },
    handleChange () {
    },
    onSubmit (form) {
      this.$refs[form].validate((valid) => {
        this.$refs.uploadCover.submit()
        this.resData.categoryID = this.form.categoryID[this.form.categoryID.length - 1]
        this.resData.description = this.form.description
        this.resData.isShared = this.form.isShared
        this.resData.richText = this.form.content
        console.log(33, this.form.content)
        this.resData.tag = ''
        for (var i = 0; i < this.form.label.length; i++) {
          console.log(this.form.label[i])
          if (this.resData.tag === '') {
            this.resData.tag = this.form.label[i]
          } else {
            this.resData.tag = this.resData.tag + ';' + this.form.label[i]
          }
        }
        this.resData.titile = this.form.titile
      })
    },
    handleRemove (file) {
      this.$refs.uploadCover.clearFiles()
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload (file) {
      console.log(file)
    },
    init () {
      this.$axios.get('/api/categories/data').then(resp => {
        if (resp) {
          let tree = translateDataToTree(resp, '0')
          this.categoryOptions = tree
          console.log(this.categoryOptions)
        }
      })
    },
    successUploadCover (response, file, fileList) {
      this.resData.photo = 'pkms_cover/' + response.obj.filename
      console.log(44, this.resData)
      this.$axios.post('/api/resources/addRes', this.resData).then(resp => {
        if (resp) {
          console.log('资源编码：', resp.obj.resourceID)
          this.fileData.resourceID = resp.obj.resourceID
          this.$refs.uploadFiles.submit()
        }
      })
      // this.$refs.form.resetFields()
      // this.docUrl = response.obj.fileurl
      // this.filename = response.obj.filename
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
      // this.docUrl = response.obj.fileurl
      // this.filename = response.obj.filename
    },
    beforeUpload (file) {
    },
    beforeUploadFile (file) {
      this.extraData.uID = JSON.parse(window.sessionStorage.getItem('user')).userID
      this.extraData.resID = this.fileData.resourceID
      console.log('附加参数', this.extraData)
      console.log('上传附件之前', file)
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
<style>
.container{
  margin-top: 0px;
  margin-left: 10px;
}
.left{
  padding-top: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.right{
  padding-top: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.el-upload-dragger{
  width: 315px !important;
}
.tool{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.button{
  height: 15px;
  margin: 5px 0px;
}
</style>
