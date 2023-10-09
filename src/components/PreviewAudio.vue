<template>
    <div>
      <template>
       <div style="width: 60%" >
         <aplayer :music="this.Preview"></aplayer>
        </div>
      </template>
    </div>
</template>

<script>
import aplayer from 'vue-aplayer'
export default {
  components: {
    aplayer
  },
  name: 'Audio',
  props: ['Preview'],
  data () {
    return {
      videoUpload: {
        progress: false,
        progressPercent: 0,
        successPercent: 0,
        music: {
          title: '成全（改版）（Cover 林宥嘉）2222',
          author: '伦桑',
          url: '/api/res/pdf/3.mp3',
          lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
        }
      }
    }
  }
}
</script>

<style scoped >

</style>
