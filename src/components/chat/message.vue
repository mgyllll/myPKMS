<template>
  <div>
    <div class="who el-icon-arrow-left" v-if="$store.state.currentSession">
      <span style="margin-left:258px">{{$store.state.currentSession.username}}</span>
    </div>
    <div id="message" v-if="$store.state.currentSession" >
      <scroll  :data="$store.state.sessions[user.username + '#' + $store.state.currentSession.username]" style="height:430px">
            <div  v-for="(entry, index) in $store.state.sessions[user.username + '#' + $store.state.currentSession.username]" :key="index">
              <p class="time">
                <span>{{entry.date | time}}</span>
              </p>
              <div class="main" :class="{self:entry.self}">
                <img class="avatar" :src="entry.self ? '/api/res/pkms_avatar/' + user.photo : '/api/res/pkms_avatar/' + $store.state.currentSession.photo" alt="">
                <p class="text">{{entry.content}}</p>
              </div>
            </div>
        </scroll>
    </div>
  </div>
</template>

<script>
import Scroll from '../scroll.vue'
export default {
  name: 'message',
  components: {
    Scroll
  },
  data () {
    return {
      user: JSON.parse(window.sessionStorage.getItem('user'))
    }
  },
  computed: {},
  filters: {
    time (date) {
      if (date) {
        date = new Date(date)
      }
      return `${date.getHours()}:${date.getMinutes()}`
    }
  },
  directives: {/* 这个是vue的自定义指令,官方文档有详细说明 */
    // 发送消息后滚动到底部,这里无法使用原作者的方法，也未找到合理的方法解决，暂用setTimeout的方法模拟
    'scroll-bottom' (el) {
      // console.log(el.scrollTop);
      setTimeout(function () {
        el.scrollTop += 9999
      }, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.who{
    width: 100%;
    height: 50px;
    padding: 0px;
    line-height: 50px;
    background-color:#2e3238;
    color: rgb(255, 255, 255);;
  }
#message {
  padding: 15px;
  max-height: 68%;
  overflow-y: scroll;
  ul {
    list-style-type: none;
    padding-left: 0px;
    li {
      margin-bottom: 15px;
    }
  }
  .time {
    text-align: center;
    margin: 7px 0;
    > span {
      display: inline-block;
      padding: 0 18px;
      font-size: 12px;
      color: #FFF;
      background-color: #dcdcdc;
      border-radius: 2px;
    }
  }
  .main {
    .avatar {
      float: left;
      margin: 0 10px 0 0;
      border-radius: 3px;
      width: 30px;
      height: 30px;

    }
    .text {
      display: inline-block;
      padding: 0 10px;
      max-width: 80%;
      background-color: #fafafa;
      border-radius: 4px;
      line-height: 30px;
    }
  }
  .self {
    text-align: right;
    .avatar {
      float: right;
      margin: 0 0 0 10px;
      border-radius: 3px;
      width: 30px;
      height: 30px;
    }
    .text {
      display: inline-block;
      padding: 0 10px;
      max-width: 80%;
      background-color: #b2e281;
      border-radius: 4px;
      line-height: 30px;
    }
  }
}
</style>
