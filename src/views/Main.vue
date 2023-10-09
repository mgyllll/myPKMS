<template>
  <el-container class="main_container">
     <!-- 头部布局 -->
     <el-header>
        <!-- LOGO和项目名称 -->
        <span class="logo">
          <img style="width:4%" src="../assets/img/logo0418.png" />
        </span>
         <span  class="biaoti">育儿个人知识管理系统</span>
        <span class="welcome">
          <el-button icon="el-icon-bell" type="text" @click="chat"></el-button>
          <span >欢迎：{{userName}}</span>
        </span>
        <!-- 用户登录展示头像 -->
        <div class="right_box">
          <el-dropdown @command="handleCommand">
            <img v-if="user.photo !=='' " :src="'/api/res/pkms_avatar/' + user.photo" :alt="userName" >
            <img v-else src="../assets/img/dinosaur.jpg" :alt="userName" >
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="fa fa-address-card-o" command="userInfo" style="font-size:13px">个人中心</el-dropdown-item>
              <el-dropdown-item icon="fa fa-cog" command="setting" style="font-size:13px">设置</el-dropdown-item>
              <el-dropdown-item icon="fa fa-sign-out" command="logout" style="font-size:13px">注销登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
     </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse?'64px':'218px'">
        <!-- 展开/收起 -->
        <div class="toggle_box" @click="toggleCollapse">|||</div>
        <el-menu
        :default-active="activePath"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
        :unique-opened="false"
        :router="true">
        <MenuTree :menuList="this.menuList"></MenuTree>
      </el-menu>
      </el-aside>
      <el-main>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Main' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class='homeWelcome' v-if="this.$router.currentRoute.path=='/Main'">
          欢迎来到育儿个人知识后台管理系统！
        </div>
        <!-- 路由视图 -->
        <router-view class="mainRouterView"></router-view>
        <!-- <div class="bc"></div> -->
      </el-main>
    </el-container>
    <el-drawer
      title="我是外面的 Drawer"
      :visible.sync="drawer"
      :with-header="false"
      size="50%"
      class="drawer">
      <div id="app">
        <div class="sidebar">
          <card></card>
          <list></list>
        </div>
        <div class="main">
          <message></message>
          <usertext></usertext>
        </div>
      </div>
    </el-drawer>
  </el-container>
</template>

<script>
import axios from 'axios'
import MenuTree from '../components/MenuTree'
import card from '../components/chat/card.vue'
import list from '../components/chat/list.vue'
import message from '../components/chat/message.vue'
import usertext from '../components/chat/usertext.vue'

export default {
  name: 'Main',
  data () {
    return {
      drawer: false,
      userPhoto: '',
      userName: '',
      user: JSON.parse(window.sessionStorage.getItem('user')),
      isCollapse: false,
      activePath: '',
      menuList: [
        {
          'id': 1,
          'parentId': 0,
          'menuName': '系统管理',
          'url': '',
          'icon': 'el-icon-setting',
          'open': 1,
          'disabled': false,
          'type': 0,
          'children': [
            {
              'id': 101,
              'parentId': 1,
              'menuName': '欢迎页面',
              'url': '/Welcome',
              'icon': 'el-icon-star-off',
              'open': 0,
              'disabled': false,
              'type': 0,
              'children': []
            },
            {
              'id': 102,
              'parentId': 1,
              'menuName': '用户管理',
              'url': '/Users',
              'icon': 'el-icon-user',
              'open': 0,
              'disabled': false,
              'type': 0,
              'children': []
            },
            {
              'id': 103,
              'parentId': 1,
              'menuName': '菜单权限',
              'url': '/Menus',
              'icon': 'el-icon-help',
              'open': 0,
              'disabled': false,
              'type': 0,
              'children': []
            },
            {
              'id': 104,
              'parentId': 1,
              'menuName': '角色管理',
              'url': '/Roles',
              'icon': 'el-icon-postcard',
              'open': 0,
              'disabled': false,
              'type': 0,
              'children': []
            }
          ]
        },
        {
          'id': 2,
          'parentId': 0,
          'menuName': '知识管理',
          'url': '',
          'icon': 'el-icon-folder-opened',
          'open': 0,
          'disabled': false,
          'type': 0,
          'children': [
            // {
            //   'id': 201,
            //   'parentId': 2,
            //   'menuName': '资源管理',
            //   'url': '/Knowledge',
            //   'icon': 'el-icon-s-check',
            //   'open': 1,
            //   'disabled': true,
            //   'type': 0,
            //   'children': []
            // },
            {
              'id': 202,
              'parentId': 2,
              'menuName': '附件管理',
              'url': '/Extra',
              'icon': 'el-icon-paperclip',
              'open': 0,
              'disabled': false,
              'type': 0,
              'children': []
            },
            {
              'id': 203,
              'parentId': 3,
              'menuName': '文件类型管理',
              'url': '/Type',
              'icon': 'el-icon-document',
              'open': 0,
              'disabled': false,
              'type': 0,
              'children': []
            }
          ]
        },
        {
          'id': 3,
          'parentId': 0,
          'menuName': '社区管理',
          'url': '',
          'icon': 'el-icon-s-shop',
          'open': 0,
          'disabled': false,
          'type': 0,
          'children': [
            {
              'id': 301,
              'parentId': 3,
              'menuName': '知识发布审核',
              'url': '/Issue_audit',
              'icon': 'el-icon-s-check',
              'open': 0,
              'disabled': false,
              'type': 0,
              'children': []
            },
            {
              'id': 302,
              'parentId': 3,
              'menuName': '评论审核',
              'url': '/Comment_audit',
              'icon': 'el-icon-s-comment',
              'open': 0,
              'disabled': false,
              'type': 0,
              'children': []
            },
            {
              'id': 303,
              'parentId': 3,
              'menuName': '公告管理',
              'url': '/Notice',
              'icon': 'el-icon-s-claim',
              'open': 0,
              'disabled': false,
              'type': 0,
              'children': []
            }
          ]
        },
        {
          'id': 4,
          'parentId': 0,
          'menuName': '日志管理',
          'url': '',
          'icon': 'el-icon-camera',
          'open': 0,
          'disabled': false,
          'type': 0,
          'children': [
            {
              'id': 401,
              'parentId': 4,
              'menuName': '登入日志',
              'url': '/Loginlog',
              'icon': 'el-icon-date',
              'open': 0,
              'disabled': false,
              'type': 0,
              'children': []
            },
            {
              'id': 402,
              'parentId': 4,
              'menuName': '操作日志',
              'url': '/Operatelog',
              'icon': 'el-icon-edit',
              'open': 1,
              'disabled': false,
              'type': 0,
              'children': []
            }
          ]
        },
        {
          'id': 5,
          'parentId': 0,
          'menuName': '激励机制',
          'url': '/Incent',
          'icon': 'el-icon-medal',
          'open': 0,
          'disabled': false,
          'type': 0,
          'children': []
        }
      ]
    }
  },
  components: {
    MenuTree,
    card,
    list,
    message,
    usertext
  },
  mounted () {
    this.$store.dispatch('initData')
    this.$store.dispatch('connect')
    this.userName = window.sessionStorage.getItem('userName')
    this.userPhoto = JSON.parse(window.sessionStorage.getItem('user')).photo
  },
  created () {
    console.log(this.user)
  },
  methods: {
    chat () {
      this.drawer = true
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log('dddddddddd')
      console.log(key, keyPath)
    },
    handleCommand (command) {
      if (command === 'logout') {
        this.$confirm('此操作将注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 注销登录
          axios.post('/api/logout')
          // 清空用户信息
          window.sessionStorage.removeItem('tokenStr')
          window.sessionStorage.removeItem('user')
          window.sessionStorage.removeItem('userName')
          // 跳转到登录
          this.$router.replace('/')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      }
      if (command === 'userInfo') {
        this.$message('click on item ' + command)
      }
      if (command === 'setting') {
        this.$message('click on item ' + command)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .main_container{
    height: 100%;
  }
  // 头部布局
  .el-header {
    height: 19%;
    background-color: #001529;
    padding: 0px;
    color: #ffffff;
    font-size: 20px;
    // 左边LOGO和标题
    .logo{
      position: relative;
      top: 0px;
      left: 10px;
    }
    // 标题
    .biaoti{
      font-family: '楷体';
      position: relative;
      top: -20px;
      left: 10px;
      }
      .navMenu{
        width: 500px;
        position: relative;
        top: -66.5px;
        left: 580px;
      }
    .welcome{
      position: relative;
      top: -25px;
      left: 1050px;
      font-size: 16px;
    }
    // 右边的登录头像
    .right_box{
      width: 20px;
      margin:  0px;
      position: relative;
      top: -80px;
      left: 1460px;
      .el-dropdown>img{
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background-color: #ffffff;
        margin: 5px 0px 0px 0px;
        background-size: contain;
        }
    }
  }
  // 侧边栏
  .el-aside {
    background-color: #001529;
    height: 662px;
    //
    .el-menu{
      border-right: none;
    }

    // 展开/收起
    .toggle_box{
      background-color: rgb(73, 82, 79);
      font-size: 15px;
      font-weight: bold;
      line-height: 25px;
      color: #ffffff;
      letter-spacing: 0.2em;
      text-align: center;
      cursor: pointer;
    }
  }
  // 内容主题
  .el-main {
    background-color: #E9EEF3;
  }
  /* 下拉菜单样式 */
  .el-dropdown-link {
    cursor: pointer; //变成手
    color: #409EFF;
  }

 .homeWelcome{
   height: 540px;
   text-align: center;
   font-size: 50px;
   font-family: '华文楷体';
   color: #409eff;
   padding-top: 50px;
   line-height: 480px;
 }
 .mainRouterView{
   margin-top: 10px;
 }
#app {
  margin: 0px auto;
  width: 770px;
  height: 721px;
  overflow: hidden;
  border-radius: 0px;
  .sidebar, .main {
    height: 100%;
  }
  .sidebar {
    float: left;
    color: #f4f4f4;
    background-color: #2e3238;
    width: 200px;
  }
  .main {
    position: relative;
    overflow: hidden;
    background-color: #eee;
  }
}
</style>
