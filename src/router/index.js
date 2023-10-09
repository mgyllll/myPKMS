import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/common/Login'
import Main from '@/views/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Main',
      name: '主页',
      component: Main,
      children: [
        {
          path: '/Home',
          name: 'Home',
          component: () => import('../views/Home.vue')
        },
        {
          path: '/Users',
          name: '用户管理',
          component: () => import('../views/system/Users.vue')
        },
        {
          path: '/Welcome',
          name: '欢迎页面',
          component: () => import('../views/system/Welcome.vue')
        },
        {
          path: '/Menus',
          name: '菜单权限',
          component: () => import('../views/system/Menus.vue')
        },
        {
          path: '/Roles',
          name: '角色管理',
          component: () => import('../views/system/Roles.vue')
        },
        {
          path: '/Knowledge',
          name: '资源管理',
          component: () => import('../views/resource/Knowledge.vue')
        },
        {
          path: '/Extra',
          name: '附件管理',
          component: () => import('../views/resource/Extra.vue')
        },
        {
          path: '/Type',
          name: '文件类型管理',
          component: () => import('../views/resource/Type.vue')
        },
        {
          path: '/Issue_audit',
          name: '知识发布审核',
          component: () => import('../views/community/Issue_audit.vue')
        },
        {
          path: '/Comment_audit',
          name: '评论审核',
          component: () => import('../views/community/Comment_audit.vue')
        },
        {
          path: '/Notice',
          name: '公告管理',
          component: () => import('../views/community/Notice.vue')
        },
        {
          path: '/Loginlog',
          name: '登入日志',
          component: () => import('../views/log/Loginlog.vue')
        },
        {
          path: '/Operatelog',
          name: '操作日志',
          component: () => import('../views/log/Operatelog.vue')
        },
        {
          path: '/Incent',
          name: ' 激励机制',
          component: () => import('../views/incentive/Incent.vue')
        }
      ]
    },
    {
      path: '/Register',
      name: 'Register',
      component: () => import('../views/common/Register.vue')
    },
    {
      path: '/Retrieve',
      name: 'Retrieve',
      component: () => import('../views/common/Retrieve.vue')
    },
    {
      path: '/Index',
      name: 'Index',
      component: () => import('../views/Index.vue'),
      children: [
        {
          path: '/FriendChat',
          name: 'FriendChat',
          component: () => import('../views/chat/FriendChat.vue')
        },
        {
          path: '/UserHome',
          name: 'UserHome',
          component: () => import('../views/user/UserHome.vue')
        },
        {
          path: '/Personal',
          name: 'Personal',
          component: () => import('../views/user/Personal.vue')
        },
        {
          path: '/Upload',
          name: 'Upload',
          component: () => import('../views/user/Upload.vue')
        },
        {
          path: '/Management',
          name: 'Management',
          component: () => import('../views/user/Management.vue')
        },
        {
          path: '/Mapping',
          name: 'Mapping',
          component: () => import('../views/user/Mapping.vue')
        },
        {
          path: '/Auditing',
          name: 'Auditing',
          component: () => import('../views/user/Auditing.vue')
        },
        {
          path: '/Community',
          name: 'Community',
          component: () => import('../views/user/Community.vue')
        },
        {
          path: '/AboutUs',
          name: 'AboutUs',
          component: () => import('../views/user/AboutUs.vue')
        }
      ]
    },
    {
      path: '/Details',
      name: 'Details',
      component: () => import('../views//user/Details.vue')
    }
  ]
})
