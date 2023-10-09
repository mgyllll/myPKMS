<template>
  <div>
    <el-upload
        class="upload-demo"
        :on-success="successupload"
        drag
        action="/api/sys/upload/uploadPic/"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>

      <a :href="'/api/res/pkms_files/1027/2017333504023/pkms_pdf/1.pdf'" :download="filename">点击显示名</a>

  </div>
</template>

<script>
export default {
  name: 'knowledge',
  data () {
    return {
      docUrl: '',
      filename: ''
    }
  },
  methods: {
    successupload (response, file) {
      console.log(response, file.name)
      this.docUrl = response.obj.fileurl
      this.filename = response.obj.filename
    },
    download () {
      let a = document.createElement('a')
      a.href = this.docUrl
      console.log(this.docUrl)
      window.location.href = this.docUrl
    }
  }
}
</script>

<style lang="less" scoped>

</style>
