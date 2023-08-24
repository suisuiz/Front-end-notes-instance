<template>
  <!-- webrtc播放器 -->
  <!-- cover -->
  <video id="jswebrtc" ref="jswebrtc" controls style="width: 100%; height: 100%; object-fit: contain"></video>
</template>

<script>
export default {
  name: 'WebrtcLive',
  props: {
    liveSrc: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      player: null
    }
  },
  mounted() {
    this.$watch(
      'liveSrc',
      () => {
        if (this.liveSrc) {
          this.initVideo(this.liveSrc)
        }
      },
      { immediate: true }
    )
  },
  methods: {
    initVideo(url) {
      if (this.player) {
        this.player.destroy()
        this.player = null
      }

      let videoDom = document.getElementById('jswebrtc')
      this.player = new JSWebrtc.Player(url, {
        video: videoDom,
        autoplay: true,
        onplay: (obj) => {
          console.log(obj)
          videoDom.addEventListener('canplay', function (e) {
            console.log(e)
            videoDom.play()
          })
        }
      })
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.player.destroy()
    }
  }
}
</script>

<style></style>
