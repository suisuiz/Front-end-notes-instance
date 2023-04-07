<!--
 * @Descripttion: Flv
 * @Author: SUI
-->
<template>
  <div class="page">
    <!-- 背景视频 -->
    <div class="video_wrap">
      <!-- <video id="videoElement" class="video" autoplay :muted="muted"></video> -->
      <video ref="videoFile" class="video" autoplay muted></video>
    </div>
  </div>
</template>

<script>
import flvjs from 'flv.js'
export default {
  name: 'flv',
  data() {
    return {
      muted: true,
      // 视频播放器
      flvPlayer: null
    }
  },

  created() {},

  mounted() {
    this.getPageData()
  },

  beforeDestroy() {
    if (this.flvPlayer !== null) {
      this.flvPlayer.pause()
      this.flvPlayer.destroy()
      this.flvPlayer = null
    }
  },

  destroyed() {},

  methods: {
    // 获取数据
    async getPageData() {
      let that = this
      try {
        // const res = await axios.post(`http://192.168.10.248/${that.siteid}/${that.appid}/get_live`, { roomid: that.roomid })
        const res = await axios.post(`/${that.siteid}/${that.appid}/get_live`, { roomid: that.roomid })
        if (res.status === 200) {
          if (res.data.code === 0) {
            // let flvUrl = 'http://192.168.10.248/00:f1:f3:21:72:cd/service/servicer/live/DS-2CD3T87WD-L20210720AACHG38740354.flv'
            let flvUrl = `/${that.siteid}/${that.appid}${res.data.data}`
            // console.log(flvUrl)
            // 获取背景视频流
            if (flvjs.isSupported()) {
              that.flvPlayer = flvjs.createPlayer(
                {
                  type: 'flv',
                  hasAudio: true,
                  isLive: true,
                  url: flvUrl
                },
                {
                  lazyLoadMaxDuration: 0,
                  enableStashBuffer: false, //关闭IO隐藏缓冲区
                  autoCleanupSourceBuffer: true //自动清除缓存
                }
              )
              that.flvPlayer.attachMediaElement(that.$refs.videoFile)
              try {
                that.flvPlayer.load()
                that.flvPlayer.play()
              } catch (error) {
                console.log(error)
              }
            }
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  .video_wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .video {
      width: 100%;
      // height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
