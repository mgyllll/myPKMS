/* eslint-disable import/no-duplicates */
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import './assets/css/global.css'
import axios from 'axios'
import '../vue.config'
import 'font-awesome/css/font-awesome.css'

import './assets/new-icons/iconfont.css'
import VideoPlayer from 'vue-video-player'
import * as echarts from 'echarts'
import vueAplayer from 'vue-aplayer'

import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

import { Message } from 'element-ui'
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css'
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

import Vuex from 'vuex'
import store from './vuex/store'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)

Vue.use(Vuex)

Vue.component(CollapseTransition.name, CollapseTransition)

Vue.use(Viewer)

Vue.prototype.$echarts = echarts
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
Vue.use(vueAplayer)

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.HOST = '/api'
Vue.prototype.$axios = axios

router.beforeEach((to, from, next) => {
  if (window.sessionStorage.getItem('tokenStr')) {
    if (!window.sessionStorage.getItem('user')) {
      return axios.get('/api/system/user/statistics').then(resp => {
        if (resp) {
          window.sessionStorage.setItem('user', JSON.stringify(resp))
          next()
        }
      })
    }
    var user = JSON.parse(window.sessionStorage.getItem('user'))
    if (user.roleType === 0) {
      if (to.path === '/AboutUs' || to.path === '/Auditing' || to.path === '/Community' || to.path === '/Details' || to.path === '/Management' || to.path === '/Mapping' || to.path === '/Personal' || to.path === '/Upload' || to.path === '/UserHome' || to.path === '/Index' || to.path === '/FriendChat') {
        next()
      } else {
        Message.error({message: '非（超级）管理员，权限不足！', duration: 1000})
        next(from.path)
      }
    } else {
      if (to.path === '/Home' || to.path === '/Main' || to.path === '/Menus' || to.path === '/Roles' || to.path === '/Users' || to.path === '/Welcome' || to.path === '/Extra' || to.path === '/Knowledge' || to.path === '/Type' || to.path === '/Loginlog' || to.path === '/Operatelog' || to.path === '/Incent' || to.path === '/Comment_audit' || to.path === '/Issue_audit' || to.path === '/Notice') {
        next()
      } else {
        Message.error({message: '非普通用户，权限不足！', duration: 1000})
        next(from.path)
      }
    }
  } else {
    if (to.path === '/' || to.path === '/Register' || to.path === '/Retrieve') {
      next()
    } else {
      Message.error({message: '请先登录！', duration: 1000})
      next('/?redirect=' + to.path)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
