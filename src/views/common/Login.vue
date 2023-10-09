<template>
  <!-- 登录表单容器 -->
  <div class="login_container">
    <div class="block">
      <el-carousel style="height:101%;width:100%;border-radius:0px" arrow="never" trigger="click">
        <el-carousel-item v-for="(item, index) in carouselData" :key="index" style="height:225%;width:100%;border-radius:0px">
          <img :src="item.posterSrc" width="100%" height="100%">
          <span class="t1"><i class="iconfont iconquotation quote1" ></i>{{item.text1}}</span>
          <span class="t2">{{item.text2}}<i class="iconfont iconquotation-copy quote2" ></i></span>
        </el-carousel-item>
      </el-carousel>
    </div>
     <div class="header" >
    </div>
    <!-- 登录区域 -->
    <div class="login_box">
      <!-- 头像 -->
      <span class="iconfont iconziyuan avatar_box">育儿个人知识管理系统</span>
      <!-- 表单 -->
      <el-form :model="loginForm"
                :rules="loginRules"
                v-loading="loading"
                element-loading-text="正在登录..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0.8)"
                ref="loginForm"
                label-width="0px"
                class="login_form">
        <el-form-item  prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid" placeholder="手机/邮箱/用户名"></el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="密码" show-password></el-input>
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
          <el-link type="danger" @click="register()" >立即注册!</el-link>
          <el-link type="warning" @click="retrieve()">忘记密码?</el-link>
        </div>
        <el-form-item class="login_btn">
          <el-button type="primary" @click="submitForm('loginForm')" style="width:240px;background-color:#ff7979;border:0px">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="nav">
       <span class="logo" style="margin-left:10px">
        <img style="width:4%" src="../../assets/img/logo0418.png" />
      </span>
      <span class="biaoti">
        育儿知识
      </span>
      <span class="slogan">陪&nbsp;伴&nbsp;成&nbsp;长</span>
      <span class="baby"><i class="iconfont iconpaxingdeyinger" style="color:#fff;font-size:23px"></i></span>
      <span class="download">
        <el-dropdown placement="bottom">
          <el-button type="text" style="color:#fff">
            <span style="color:#fff">客户端下载</span>
          </el-button>
          <!-- 下拉菜单 -->
          <el-dropdown-menu slot="dropdown">
            <el-row style="text-align:center">
              <img src="../../assets/img/PKMS_app.png" style="width:210px;height:210px" />
            </el-row>
            <el-row style="font-size:10px;text-align:center">
              <span>扫描上方二维码，下载客户端APP</span>
            </el-row>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
      <span class="more">
        <el-dropdown >
          <el-button type="text" style="color:#fff">
            <span style="color:#fff">更多<i class="iconfont iconjiantou" style="font-size:13px"></i></span>
          </el-button>
          <!-- 下拉菜单 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">官方微博</el-dropdown-item>
            <el-dropdown-item command="2">问题反馈</el-dropdown-item>
            <el-dropdown-item command="3">开放平台</el-dropdown-item>
            <el-dropdown-item command="4">会员中心</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </div>
    <div class="footer">
      <span><i class="iconfont iconbanquan"></i>2021&nbsp;PKMS&nbsp;开发者中心</span>
      <el-divider direction="vertical"></el-divider>
      <span>服务协议</span>
      <el-divider direction="vertical"></el-divider>
      <span>权利声明</span>
      <el-divider direction="vertical"></el-divider>
      <span>版本更新</span>
      <el-divider direction="vertical"></el-divider>
      <span>帮助中心</span>
      <el-divider direction="vertical"></el-divider>
      <span>问题反馈</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      carouselData: [
        {posterSrc: require('../../assets/img/8.jpg'), text1: '安全存储', text2: '育儿井井有条'},
        {posterSrc: require('../../assets/img/2.jpg'), text1: '在线预览', text2: '文件即开即看'},
        {posterSrc: require('../../assets/img/6.jpg'), text1: '实时聊天', text2: '分享育儿心得'},
        {posterSrc: require('../../assets/img/1.jpg'), text1: '社区共享', text2: '获取最新动态'}
      ],
      picSrc: 'logo.png',
      checked: true,
      loading: false,
      captchaUrl: '/api/captcha?time=' + new Date(),
      options: [{
        value: '1',
        label: '普通用户'
      }, {
        value: '2',
        label: '管理员'
      }, {
        value: '3',
        label: '超级管理员'
      }],
      loginForm: {
        // username: '',
        // password: '',
        // code: '',
        // role: '1'
        username: '陈惠琳',
        password: '123456',
        code: '',
        role: '1'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入手机/邮箱/用户名', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
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
                  if (this.loginForm.role === '1') {
                    if (resp.roleType === 0) {
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
                  if (this.loginForm.role === '2' || this.loginForm.role === '3') {
                    if (resp.roleType === 1 || resp.roleType === 2) {
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
    background: #ffadad;
    background-size: 100% 100%;
    //background-image: '../assets/img/dinosaur.jpg';
  }
  .header{
    width: 0%;
    height: 8%;
    background: #fff;
  }
  .nav{
    position: relative;
    top: -8%;
    margin: 0px;
    width: 100%;
    height: 8%;
    background: rgba(0, 0, 0, 0.15);
    color: rgb(255, 255, 255);
    .logo{
      position: relative;
      top: -2px;
    }
    .biaoti{
      font-size: 30px;
      color: #fff;
      position: relative;
      top: -20px;
    }
    .slogan{
      font-size: 20px;
      color: #fff;
      font-family: '新宋体';
      position: relative;
      top: -18px;
      left: 10px;
    }
    .baby{
      position: relative;
      top: -36px;
      left: -130px;
    }
    .download{
      position: relative;
      top: -27px;
      left: 65%;
    }
    .more{
      position: relative;
      top: -27px;
      left: 66%;
    }
  }
  .footer{
    position: relative;
    text-align: center;
    line-height: 45px;
    top: 75%;
    margin: 0px;
    padding: 10px 0px 0px 0px;
    width: 100%;
    height: 7%;
    background: rgba(255, 255, 255, 0.2);
    color: rgb(255, 255, 255);
    font-size: 15px;
    font-family: '新宋体';
  }
  .block{
    text-align: center;
    width: 100%;
    height: 93%;
    background-color: rgba(255, 255, 255, 0.1);
    position: absolute;
    border-radius:0px;
    left: 50%;
    top: 44%;
    transform: translate(-50%, -50%);
    z-index: 0;
    .t1{
      position: absolute;
      left: 20%;
      top: 50%;
      color: rgb(255, 255, 255);
      font-size: 50px;
    }
    .quote1{
      position: absolute;
      left: -20%;
      top: 30%;
      font-size: 30px;
      color: rgba(236, 236, 236, 0.6);
      margin-top: -20px;
      }
    .t2{
      position: absolute;
      left: 20%;
      top: 60%;
      color: rgb(255, 255, 255);
      font-size: 50px;
    }
    .quote2{
      position: absolute;
      left: 100%;
      top: 0%;
      font-size: 30px;
      color: rgba(236, 236, 236, 0.6);
      }
  }
  .login_box{
    width: 380px;
    height: 440px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius:10px;
    position: absolute;
    right: 0%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 12px 0 rgba(255, 0, 0, 0.5);
    .avatar_box{
      position: relative;
      top: 10%;
      left: -8%;
      margin: 10px 0px 0px 110px;
      font-size: 20px;
      font-family: '华文楷体';
      color: rgb(255, 112, 112);
    }
    .login_form{
      position: absolute;
      top: 25%;
      bottom: 0px;
      width: 100%;
      padding: 0px 30px;
      box-sizing: border-box;
      .login_btn{
        position: absolute;
        left: 8%;
        top: 82%;
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
      left: 9%;
      top: 73%;
    }
    .right{
      position: absolute;
      left: 58%;
      top: 72%;
    }
  }
</style>
