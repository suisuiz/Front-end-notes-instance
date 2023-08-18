<!--
 * @Descripttion: rtmp推流
 * @Author: SUI
-->
<template>
  <view>
    <!-- 
        live-pusher 文档
        https://uniapp.dcloud.net.cn/component/live-pusher.html
    -->
    <live-pusher
      id="meetingLivePusher"
      ref="livePusherRef"
      class="live_pusher"
      :style="{ width: windowWidth + 'px', height: windowHeight + 'px' }"
      :url="pushUrl"
      mode="HD"
      orientation="horizontal"
      :muted="liveMutedBol"
      :enable-camera="true"
      :auto-focus="true"
      :beauty="5"
      aspect="16:9"
      whiteness="3"
      @statechange="statechange"
      @netstatus="netstatus"
      @error="error"
    ></live-pusher>
  </view>
</template>

<script>
let app = require('@/common/common.js')
// 引入方法
let { getIP } = require('@/common/content/util.js')
export default {
  name: 'LivePush',
  props: {
    page_info: {
      type: Object
    },
    hand_upid: {
      type: String
    },
    meetingid: {
      type: String
    },
    meeting_state: {
      type: String
    }
  },
  watch: {
    page_info: {
      handler(newName, oldName) {
        this.pageInfo = newName
      },
      immediate: true,
      deep: true
    },
    meetingid: {
      handler(newName, oldName) {
        this.meeting_id = newName
        this.getPushUrl()
      },
      immediate: true,
      deep: true
    },
    hand_upid: {
      handler(newName, oldName) {
        this.hand_up_id = newName
        if (this.meetingState === 'join') this.pushState()
      },
      immediate: true,
      deep: true
    },
    meeting_state: {
      handler(newName, oldName) {
        this.meetingState = newName
        this.changeState()
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      pageInfo: this.page_info,
      meeting_id: this.meetingid,
      hand_up_id: this.hand_upid,
      meetingState: this.meeting_state,

      myUserId: uni.getStorageSync('userId'),
      windowWidth: '',
      windowHeight: '',

      livePushContent: null,
      pushLiveBol: '',
      pushUrl: '',
      liveMutedBol: false
    }
  },

  mounted() {
    this.livePushContent = uni.createLivePusherContext('meetingLivePusher', this)
    let that = this
    uni.getSystemInfo({
      success: (res) => {
        that.windowHeight = res.windowHeight
        that.windowWidth = res.windowWidth
      }
    })
  },

  beforeDestroy() {
    let that = this
    if (that.livePushContent !== null && that.pushLiveBol) {
      that.stopLive()
    }
  },

  methods: {
    // 获取推流地址
    getPushUrl() {
      let that = this
      let { siteid } = that.pageInfo
      let host = getIP(siteid, 'host')
      let src = `rtmp://${host}/live/${that.meeting_id}?token=${app.getToken().token}`
      that.pushUrl = src
      if (that.meetingState === 'join') {
        setTimeout(() => {
          that.pushState()
        }, 1000)
      }
    },

    // 会议状态
    changeState() {
      let that = this
      let state = that.meetingState
      if (state === 'join') {
        setTimeout(() => {
          that.pushState()
        }, 1000)
      } else if (state === 'leave') {
        if (that.livePushContent !== null && that.pushLiveBol) that.stopLive()
      }
    },

    // 判断是否推流
    pushState() {
      let that = this
      if (that.pushUrl === '') return
      if (that.livePushContent !== null && that.hand_up_id) {
        if (that.hand_up_id === that.myUserId) {
          setTimeout(() => {
            that.startLive()
          }, 2000)
        } else {
          if (that.pushLiveBol) {
            that.stopLive()
          }
        }
      }
    },

    statechange(event) {
      let that = this
      console.log('statechange:***********************' + JSON.stringify(event))
      let { detail } = event
      if (detail && detail.code === -1307) {
        if (that.pushLiveBol) that.stopLive()
        setTimeout(() => {
          that.startLive()
        }, 1500)
      }
    },
    netstatus(e) {
      // console.log('netstatus:***********************' + JSON.stringify(e))
    },
    error(e) {
      console.error('error:***********************' + JSON.stringify(e))
    },

    startLive() {
      let that = this
      console.log('开始推流+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++', that.pushUrl)
      if (that.pushLiveBol) return
      if (that.livePushContent && that.pushUrl) {
        that.livePushContent.start({
          success: (a) => {
            that.pushLiveBol = true
            console.log('livePusher.start:' + JSON.stringify(a))
          },
          fail: (err) => console.error(err)
        })
      }
    },

    stopLive() {
      let that = this
      console.log('结束推流+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      if (that.livePushContent) {
        that.livePushContent.stop({
          success: (a) => {
            that.pushLiveBol = false
            console.log('结束推流成功  success', JSON.stringify(a))
          },
          fail: (err) => console.error(err)
        })
      }
    },

    // 切自己摄像头 & 静音
    switch_camera() {
      let that = this
      if (that.livePushContent) {
        that.livePushContent.switchCamera({
          success: (a) => {
            console.log('livePusher.switchCamera:' + JSON.stringify(a))
          },
          fail: (err) => console.error(err)
        })
      }
    },
    // 静音麦
    mute_local_audio(action) {
      let that = this
      console.log(`${action === 'open_voice' ? '取消静音' : '静音'}`)
      that.$parent.muteAudioBol = !that.$parent.muteAudioBol
      that.liveMutedBol = !that.liveMutedBol
    },
    // 关摄像头
    mute_local_video(action) {
      let that = this
      console.log(`${action === 'open_live' ? '开摄像头' : '关摄像头'}`)
      that.$parent.muteVideoBol = !that.$parent.muteVideoBol
      if (that.livePushContent) {
        if (action === 'open_live') {
          that.livePushContent.startPreview({
            success: (a) => {
              console.log('livePusher.startPreview:' + JSON.stringify(a))
            },
            fail: (err) => console.error(err)
          })
        } else {
          that.livePushContent.stopPreview({
            success: (a) => {
              console.log('livePusher.stopPreview:' + JSON.stringify(a))
            },
            fail: (err) => console.error(err)
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.live_pusher {
  flex: 1;
}
</style>
