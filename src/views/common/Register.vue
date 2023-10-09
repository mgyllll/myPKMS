<template>
  <div class="register_box">
    <div class="title">新用户注册</div>
    <div >
        <el-form ref="userForm" :model="user" label-width="90px" :rules="addUserRules">
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
                  placeholder="出生日期">
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
                  clearable>
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
                <el-select size="mini" v-model="user.roleType" placeholder="请选择用户角色" style="width:100%" disabled>
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
      <div class="btn">
      <el-button size="small" @click="cancelForm">取 消</el-button>
      <el-button size="small" type="primary" @click="submitForm('userForm')">注 册</el-button>
      </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data () {
    return {
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
        roleType: 0
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
          { required: true, message: '请输入详细地址', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        roleType: [
          { required: true, message: '请选择用户角色', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.initAreas()
  },
  methods: {
    handleChange (value) {
      console.log(value)
    },
    initAreas () {
      this.$axios.get('/api/areas/').then(resp => {
        if (resp) {
          let tree = translateDataToTree(resp, '')
          this.areasOptions = tree
        }
      })
    },
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          for (var i = 0; i < this.user.native.length; i++) {
            this.user.address = this.user.address + this.user.native[i]
          }
          this.user.address = this.user.address + this.user.detail
          this.user.city = this.user.native[ this.user.native.length - 1 ]
          console.log(this.user)
          this.$axios.post('/api/system/user/addUser', this.user).then(resp => {
            if (resp) {
              this.$refs[form].resetFields()
              this.$router.push('/')
            }
          })
        }
      })
    },
    cancelForm () {
      this.$router.push('/')
    }
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
<style>
.register_box{
  background-color: rgba(255, 255, 255, 0.8);
  padding-top: 50px;
  padding: 45px 20px 0px 20px;
  width: 620px;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.el-upload__tip {
  line-height: 1.2;
}
.btn {
  text-align: center;
}
.title{
    text-align: center;
    margin-bottom: 30px;
    font-family: '新宋体';
    font-size: 32px;
  }

</style>
