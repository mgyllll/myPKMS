<template>
  <div id="card">
    <header>
      <img class="avatar" v-bind:src="'/api/res/pkms_avatar/' + user.photo" v-bind:alt="user.username">
      <p class="name">{{user.username}}</p>
    </header>
    <footer>
      <el-input class="search" style="padding:0px" size="mini" v-model="$store.state.filterKey" @keyup.enter.native="enter" placeholder="search user...">
      </el-input>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'card',
  data () {
    return {
      user: JSON.parse(window.sessionStorage.getItem('user'))
    }
  },
  methods: {
    enter () {
      this.$store.dispatch('initData')
    }
  }
}
</script>

<style lang="less" scoped>
#card {
padding: 12px;
.avatar{
  width: 40px;
  height: 40px;
  vertical-align: middle;/*这个是图片和文字居中对齐*/
}
.name {
  display: inline-block;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
  color: rgb(255, 255, 255);
}
.search {
  background: #26292E;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  border: 1px solid #3a3a3a;
  border-radius: 4px;
  outline: none;/*鼠标点击后不会出现蓝色边框*/
  color: #FFF;
  }
}
</style>
