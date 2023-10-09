<template>
  <div id="list">
    <ul style="padding-left:0px;overflow: hidden" >
      <span v-if="$store.state.users">
      <scroll :data="$store.state.users" style="height:500px">
      <li v-for="(item, index) in $store.state.users" :key="index"
          :class="{ active: $store.state.currentSession?item.username === $store.state.currentSession.username : false}"
          @click="changeCurrentSession(item)"><!--   :class="[item.id === currentSession ? 'active':'']" -->
        <el-row style="padding:0px;margin:0px">
          <el-col :span="6" style="padding:0px;margin:0px">
            <el-badge :is-dot="$store.state.isDot[user.username + '#' + item.username]">
              <img class="avatar" :src="'/api/res/pkms_avatar/' + item.photo" :alt="item.username">
            </el-badge>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="24">
                {{item.username}}
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="font-size:10px;color:#8B8682">
                {{$store.state.currentMsg[user.username + '#' + item.username]}}
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </li>
      </scroll>
      </span>
    </ul>
  </div>
</template>

<script>
import Scroll from '../scroll.vue'
export default {
  name: 'list',
  components: {
    Scroll
  },
  data () {
    return {
      user: JSON.parse(window.sessionStorage.getItem('user'))
    }
  },
  computed: {
  },
  methods: {
    changeCurrentSession: function (currentSession) {
      console.log(12345678, currentSession)
      this.$store.commit('changeCurrentSession', currentSession)
    }
  }
}
</script>

<style lang="less" scoped>
#list {
  height: 200px;
  li {
    padding: 0px 10px 5px 10px;
    border-bottom: 1px solid #292C33;
    cursor: pointer;
    &:hover {
      background-color: rgba(255, 255, 255, 0.03);
    }
  }
  li.active {/*注意这个是.不是冒号:*/
      background-color: rgba(255, 255, 255, 0.1);
  }
  .avatar {
    border-radius: 2px;
    width: 35px;
    height: 35px;
    vertical-align: middle;
  }
  .name {
    display: inline-block;
    margin-left: 15px;
    margin-top: 0px;
    margin-bottom: 0px;
  }
}
</style>
