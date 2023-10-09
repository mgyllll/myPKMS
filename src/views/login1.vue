<template>
  <!-- 登录表单容器 -->
  <div class="login_container">
    <!-- 登录区域 -->
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img :src="require('../../assets/img/' + picSrc)">
      </div>
      <!-- 表单 -->
      <el-form :model="loginForm"
                :rules="loginRules"
                v-loading="loading"
                element-loading-text="正在登录..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                ref="loginForm"
                label-width="0px"
                class="login_form">
        <el-form-item  prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item  prop="role">
          <el-select v-model="loginForm.role" placeholder="请选择角色" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item  prop="code">
          <div class="code_box">
            <el-input v-model="loginForm.code" prefix-icon="el-icon-mobile-phone" placeholder="点击图片更换验证码" class="code"></el-input>
            <img :src="captchaUrl" @click="updateCaptcha" />
        </div>
        </el-form-item>
        <div class="left" style="marging:0px;padding:0px;width:200px;display:flex">
          <el-checkbox v-model="checked">记住我</el-checkbox>
        </div>
        <div class="right" >
          <el-link type="primary" @click="register()">立即注册！</el-link>
          <el-link type="warning" @click="retrieve()">忘记密码？</el-link>
        </div>
        <el-form-item class="login_btn">
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      picSrc: 'logo.png',
      checked: true,
      loading: false,
      captchaUrl: '/api/captcha?time=' + new Date(),
      options: [{
        value: '2',
        label: '普通用户'
      }, {
        value: '1',
        label: '管理员'
      }, {
        value: '0',
        label: '超级管理员'
      }],
      loginForm: {
        username: '陈惠琳',
        password: '',
        code: '',
        role: '2'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    updateCaptcha () {
      this.captchaUrl = '/api/captcha?time=' + new Date()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        this.loading = true
        if (valid) {
          axios.post('/api/login', this.loginForm).then(resp => {
            this.loading = false
            if (resp) {
              console.log(resp)
              // 存储用户token
              const tokenStr = resp.obj.tokenHead + resp.obj.token
              console.log(tokenStr)
              window.sessionStorage.setItem('userName', this.loginForm.username)
              window.sessionStorage.setItem('tokenStr', tokenStr)
              this.$axios.get('/api/user/info').then(resp => {
                if (resp) {
                  let path = this.$route.query.redirect
                  if (this.loginForm.role === '2') {
                    if (resp.roleType === 2) {
                      this.$router.replace((path === '/' || path === undefined) ? '/Index' : path)
                      this.$message({
                        message: '登录成功！',
                        type: 'success',
                        duration: 500
                      })
                    } else {
                      this.$message({
                        message: '非普通用户，请选择正确的用户身份！',
                        duration: 1000,
                        type: 'error'
                      })
                      this.updateCaptcha()
                    }
                  }
                  if (this.loginForm.role === '0' || this.loginForm.role === '1') {
                    if (resp.roleType === 0 || resp.roleType === 1) {
                      this.$router.replace((path === '/' || path === undefined) ? '/Main' : path)
                      this.$message({
                        message: '登录成功！',
                        type: 'success',
                        duration: 500
                      })
                    } else {
                      this.$message({
                        message: '非(超级)管理员，请选择正确的用户身份！',
                        duration: 1000,
                        type: 'error'
                      })
                      this.updateCaptcha()
                    }
                  }
                }
              })
              // 登陆成功，跳转页面
              // this.$router.replace('/Main')
            } else {
              this.updateCaptcha()
            }
          })
        } else {
          this.loading = false
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    register (formName) {
      this.$router.push('/Register')
    },
    retrieve (formName) {
      this.$router.push('/Retrieve')
    }
  }
}
</script>

<style lang="less" scoped>
  .login_container{
    height: 100%;
    background: url('../../assets/img/back_img1.jpg')no-repeat;
    background-size: 100% 100%;
    //background-image: '../assets/img/dinosaur.jpg';
  }
  .login_box{
    width: 450px;
    height: 450px;
    background-color: #ffffff;
    border-radius:15px;
    position: absolute;
    left: 50%;
    top: 55%;
    transform: translate(-50%, -50%);

    .avatar_box{
      width: 100px;
      height: 100px;
      border: 1px solid #eeeeee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      margin: -65px auto;
      background-color: #ffffff;

      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eeeeee;
      }
    }

    .login_form{
      position: absolute;
      top: 25%;
      bottom: 0px;
      width: 100%;
      padding: 0px 20px;
      box-sizing: border-box;

      .login_btn{
        position: absolute;
        left: 62%;
        top: 85%;
        display: flex;
        justify-content: flex-end;
      }

      .code_box{
        display: flex;
        .code{
          width: 70%;
          justify-content: left;
          margin: 0px 30px 0px 0px;
        }

        .code_img{
          width: 30%;
          height: 40px;
          justify-content:  flex-end;
        }
      }
    }
    .left{
      position: absolute;
      left: 5%;
      top: 73%;
    }
    .right{
      position: absolute;
      left: 65%;
      top: 72%;
    }
  }
</style>
