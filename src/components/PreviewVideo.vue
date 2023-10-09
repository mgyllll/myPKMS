<template>
    <div>
      <template>
        <!--
        <video :src="videoSrc" :poster="videoImg" :autoplay="playStatus" height="421" width="700" :muted="muteStatus">
          your browser does not support the video tag
        </video>
        <button @click="playClick" :class="{hide: isPlay}">点击播放</button> -->
        <!--class="video-js vjs-default-skin vjs-big-play-centered" -->
        <video  :preload="preload"
                :poster="videoImg"
                :height="height"
                :width="width"
                align="center"
                :controls="controls"
                :loop="loop"
                :autoplay="autoplay">
          <source :src="this.Preview.src" type="video/mp4">
        </video>
      </template>
    </div>
</template>

<script>
export default {
  name: 'Video',
  props: ['Preview'],
  data () {
    return {
      videoImg: '',
      playStatus: '',
      muteStatus: '',
      isMute: true,
      isPlay: false,
      width: '820', // 设置视频播放器的显示宽度（以像素为单位）
      height: '500', // 设置视频播放器的显示高度（以像素为单位）
      preload: 'auto', //  建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
      controls: true, // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
      autoplay: false,
      loop: false // 如果出现该属性，则当媒介文件完成播放后再次开始播放。
    }
  }

  // 自动播放属性,muted:静音播放
  // autoplay: 'muted',

}
</script>

<style scoped >

</style>
