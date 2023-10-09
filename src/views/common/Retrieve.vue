<template>
  <div class="retrieve_box">
    <el-row class="title">找回密码</el-row>
    <el-row :gutter="15">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px"
        label-position="left">
        <el-col :span="24">
          <el-form-item label-width="0" prop="password">
            <el-input v-model="formData.password" placeholder="请输入密码" clearable prefix-icon='el-icon-lock'
              show-password :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label-width="0" prop="password1">
            <el-input v-model="formData.password1" placeholder="确认密码" clearable prefix-icon='el-icon-lock'
              show-password :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="17">
          <el-form-item label-width="0" prop="phone">
            <el-input v-model="formData.phone" placeholder="请输入手机号" clearable :style="{width: '100%'}">
              <template slot="prepend">手机号</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label-width="0" prop="field103">
            <el-button type="primary" icon="el-icon-mobile-phone" size="medium"> 获取验证码 </el-button>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label-width="0" prop="verifyCode">
            <el-input v-model="formData.verifyCode" placeholder="请输入验证码" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="text-align:right">
          <el-form-item size="large">
            <el-button size="small" type="primary" @click="submitForm">确认</el-button>
            <el-button size="small" @click="returnForm">返回</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data () {
    return {
      formData: {
        password: undefined,
        password1: undefined,
        phone: undefined,
        field103: undefined,
        verifyCode: ''
      },
      rules: {
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        password1: [{
          required: true,
          message: '确认密码',
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }],
        verifyCode: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    submitForm () {
      this.$refs['elForm'].validate(valid => {
        // eslint-disable-next-line no-useless-return
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm () {
      this.$refs['elForm'].resetFields()
    },
    returnForm () {
      this.$router.push('/')
    }
  }
}

</script>
<style>
.retrieve_box{
  background-color: rgba(255, 255, 255, 0.8);
  width: 500px;
  height: 400px;
  position: absolute;
  padding: 50px 20px 0px 20px;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
}
.title{
  text-align: center;
  margin-bottom: 25px;
  font-family: '新宋体';
  font-size: 32px;
}
</style>
