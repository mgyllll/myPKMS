<template>
  <div id="uesrtext">
    <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" v-on:keyup="addMessage"></textarea>
  </div>
</template>

<script>

export default {
  name: 'uesrtext',
  data () {
    return {
      content: ''
    }
  },
  methods: {
    addMessage (e) {
      if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
      // if (e.keyCode === 13 && this.content.length) {
        // eslint-disable-next-line no-new-object
        let msgObj = new Object()
        msgObj.to = this.$store.state.currentSession.username
        msgObj.content = this.content
        this.$store.state.stomp.send('/ws/chat', {}, JSON.stringify(msgObj))
        this.$store.commit('addMessage', msgObj)
        this.content = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
#uesrtext {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 30%;
  border-top: solid 1px #DDD;
  > textarea {
    padding: 10px;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
  }
}
</style>
