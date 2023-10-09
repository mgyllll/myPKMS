import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import {Notification} from 'element-ui'

Vue.use(Vuex)
// eslint-disable-next-line no-unused-vars
const now = new Date()

const store = new Vuex.Store({
  state: {
    uid: 0,
    sessions: {},
    users: [],
    currentUser: JSON.parse(window.sessionStorage.getItem('user')),
    currentSession: null,
    filterKey: '',
    stomp: null,
    isDot: {},
    currentMsg: {}
  },
  getters: {

  },
  mutations: {
    changeCurrentSession (state, currentSession) {
      console.log(currentSession.username)
      state.currentSession = currentSession
      state.currentUser = JSON.parse(window.sessionStorage.getItem('user'))
      console.log(state.currentSession.username)
      console.log(state.currentUser)
      Vue.set(state.isDot, state.currentUser.username + '#' + state.currentSession.username, false)
    },
    addMessage (state, msg) {
      let mss = state.sessions[state.currentUser.username + '#' + msg.to]
      if (!mss) {
        // state.sessions[state.currentUser.username + '#' + msg.to] = []
        Vue.set(state.sessions, state.currentUser.username + '#' + msg.to, [])
      }
      state.sessions[state.currentUser.username + '#' + msg.to].push({
        content: msg.content,
        date: new Date(),
        self: !msg.notSelf
      })
    },
    INIT_DATA (state) {
      // 浏览器本地历史聊天记录
      let data = localStorage.getItem('vue-chat-session')
      if (data) {
        state.sessions = JSON.parse(data)
      }
    },
    INIT_USERS (state, data) {
      state.users = data
    }
  },
  actions: {
    connect (context) {
      context.state.stomp = Stomp.over(new SockJS('/ws/ep'))
      let token = window.sessionStorage.getItem('tokenStr')
      context.state.stomp.connect({'Auth-Token': token}, success => {
        context.state.stomp.subscribe('/user/queue/chat', msg => {
          let receiveMsg = JSON.parse(msg.body)
          if (!context.state.currentSession || receiveMsg.from !== context.state.currentSession.username) {
            Notification.info({
              title: '【' + receiveMsg.from + '】发来一条消息',
              message: receiveMsg.content.length > 10 ? receiveMsg.content.substring(0, 10) + '...' : receiveMsg.content,
              position: 'bottom-right'
            })
            Vue.set(context.state.isDot, context.state.currentUser.username + '#' + receiveMsg.from, true)
          }
          Vue.set(context.state.currentMsg, context.state.currentUser.username + '#' + receiveMsg.from, receiveMsg.content.length < 8 ? receiveMsg.content : receiveMsg.content.substring(0, 7) + '...')
          receiveMsg.notSelf = true
          receiveMsg.to = receiveMsg.from
          context.commit('addMessage', receiveMsg)
        })
      }, _error => {

      })
    },
    initData (context) {
      context.commit('INIT_DATA')
      axios.get('/api/chat/user?keywords=' + this.state.filterKey).then(resp => {
        if (resp) {
          context.commit('INIT_USERS', resp)
        }
      })
    }
  }
})

store.watch(function (state) {
  return state.sessions
}, function (val) {
  console.log('CHANGE: ', val)
  localStorage.setItem('vue-chat-session', JSON.stringify(val))
}, {
  deep: true/* 这个貌似是开启watch监测的判断,官方说明也比较模糊 */
})

export default store
