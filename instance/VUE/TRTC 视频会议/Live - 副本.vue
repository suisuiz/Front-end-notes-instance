<template>
  <div class="page" ref="page_live">
    <button @click="createClient">推流</button>
    <button @click="leaveRoom">停止</button>

    <div>本地流</div>
    <div id="local_stream" v-if="localShow" class="live_box" :style="{ height: liveheight }"></div>

    <div>远端视频流</div>
    <div v-for="(item, i) in remoteStreamList" :id="item.id" :key="i" class="live_box" :style="{ height: liveheight }"></div>
  </div>
</template>

<script>
// node 要装 trtc-js-sdk
import TRTC from 'trtc-js-sdk'
/**
 *  TRTC Web SDK
 *  https://github.com/LiteAVSDK/TRTC_Web/tree/main/SDK
 *  https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/Client.html
 */
export default {
  name: 'Live',
  data() {
    return {
      roomId: '',
      userId: '',
      // 创建链接
      client: null,
      // 本地流
      localStream: null,
      // 远端视频流
      remoteStreamList: [],

      // sdkID
      sdkAppId: 1400692574,
      // 签名
      userSig: '',

      liveheight: '0px',
      localShow: false
    }
  },
  created() {},

  mounted() {
    let that = this
    let { people, room } = that.$route.query
    that.liveheight = `${that.$refs.page_live.clientWidth / 1.5}px`
    // console.log(people)
    if (room) that.roomId = room / 1
    // if (people === '1') {
    //   that.userId = '12f5c78c3-9646-474c-901d-32343b5fb2ad'
    //   that.userSig =
    //     'eJwsjs1Kw0AURt-lbnXqnZ87MQMuXAQqFinGWnTXzo9cTCRMYjSI7y4m2Z6P73B*4GlXb*J3xzmCk0SkEPFyphzix8CJYwYHUiXyxbXXorTGClMYL0qUQWiljT5TOqtTgOXYh-dT13EAJw2iLRUVZl34DRzU*3x38Hvk5mF7fzEd8hdXr8fQTFeyHdNu*1JPt9XxuX-8rG5W5cDtf5*1VmltiBY6zmlqg-D7FwAA--*VhDk6'
    // } else if (people === '2') {
    //   that.userId = 'zhang'
    //   that.userSig =
    //     'eJwsjc8LgjAYQP*X71rI-NomDroEdkgpKD10lLb0U1xDV-SD-vdIvb4H730gz06BeTrqDahQCIGMseVISRvr6UqmBwXvurQVTGLQbekcaVAhZ0zGKCI*G6pAQW3vjfW3oy6G5HJOnbTamCTFpsfFbs-jbPU6bPOi6zbtek566v5-KSVK5Dya6GNcY8Dg*wsAAP--AWkx8g__'
    // } else {
    //   that.userId = '11c53127e-17a3-4613-a966-c9d2ce841bc3'
    //   that.userSig =
    //     'eJwsjs1OhDAURt-lbrVjb38utIkrHKMjzEaDbGtbTSUS-mKIxnc3A2zPl*-k-MJL*XyIS5-GCBa11oJzfr3SFGI3p-cUR7CA6LVEkUWGmZNMEUrmDBHzJggfc4VvXsJ2nELr*j4FsKg4JyN0pvYlfYCFY1mc3DCdi*GnuP9sX5euPFaVah7a-OTq*i6Ec-PU3Fw9*up2V87p69JHRIJEbsxGv9c0ceDw9x8AAP--aCw4cA__'
    // }

    if (that.userId) {
      that.createClient(this.userId)
    }
  },

  beforeDestroy() {
    this.leaveRoom()
  },

  destroyed() {},

  methods: {
    // 创建链接
    createClient() {
      let that = this
      if (that.client === null) {
        const userId = that.userId
        const sdkAppId = that.sdkAppId
        const userSig = that.userSig
        that.client = TRTC.createClient({ mode: 'rtc', sdkAppId, userId, userSig })
        // 注册远程监听，要放在加入房间前
        that.subscribeStream(that.client)
        // 初始化后才能加入房间
        that.joinRoom(that.client, that.roomId)
        // 公共监听方法----主要是推流方摄像头关闭，音频关闭开启
        that.publicMonitor(that.client)
      }
    },

    // 加入房间
    async joinRoom(client, roomId) {
      let that = this
      try {
        await client.join({ roomId })
        console.log('进房成功')
        // 创建本地流
        that.createStream(that.userId)
        // 播放远端流
        that.playStream(that.client)
      } catch (error) {
        console.error('进房失败 ' + error)
      }
    },

    // 创建本地音视频流
    async createStream(userId) {
      let that = this
      const localStream = TRTC.createStream({ userId, audio: true, video: true })
      that.localStream = localStream
      that.localShow = true
      try {
        await localStream.initialize()
        console.log('初始化本地流成功')
        localStream.play('local_stream')
        // 创建好后才能发布
        that.publishStream(localStream, that.client)
      } catch (error) {
        console.error('初始化本地流失败 ' + error)
      }
    },

    // 发布本地音视频流
    async publishStream(localStream, client) {
      try {
        await client.publish(localStream)
        console.log('本地流发布成功')
      } catch (error) {
        console.error('本地流发布失败 ' + error)
      }
    },

    // 订阅远端流--加入房间之前
    subscribeStream(client) {
      client.on('stream-added', (event) => {
        const remoteStream = event.stream
        // 订阅远端流
        client.subscribe(remoteStream)
      })
    },

    // 播放远端流
    playStream(client) {
      let that = this
      client.on('stream-subscribed', (event) => {
        const remoteStream = event.stream
        console.log('远端流订阅成功：' + remoteStream.getUserId())
        that.remoteStreamList.push({
          id: `${'remote_stream-' + remoteStream.getId()}`,
          userid: remoteStream.getUserId()
        })
        // 播放
        that.$nextTick(() => {
          remoteStream.play('remote_stream-' + remoteStream.getId())
        })
      })
    },

    // 退出音视频
    async leaveRoom() {
      let that = this
      var client = that.client
      if (client === null) return
      try {
        await client.leave()
        console.log('退出音视频')
        // 停止本地流，关闭本地流内部的音视频播放器
        that.localStream.stop()
        // 关闭本地流，释放摄像头和麦克风访问权限
        that.localStream.close()
        that.localShow = false
        that.localStream = null
        that.client = null
        that.remoteStreamList = []
      } catch (error) {
        console.error('退出失败 ' + error)
      }
    },

    // 主要检测推流方公共方法内
    publicMonitor(client) {
      let that = this
      // https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/module-ClientEvent.html

      // 远端流移除事件
      client.on('stream-removed', (evt) => {
        const remoteStream = evt.stream
        console.log('远端流移除', remoteStream)
      })

      // 远端流更新事件
      // 例如远端新增了视频流，您可以从只订阅音频变成同时订阅音频和视频
      client.on('stream-updated', (evt) => {
        const remoteStream = evt.stream
        console.log('远端流更新', remoteStream)
        // if (remoteStream.hasVideo()) {
        //   client.subscribe(remoteStream, { audio: true, video: true }).catch((error) => {
        //     console.error('failed to subscribe remoteStream', error)
        //   })
        // }
      })

      // SDK 和腾讯云的连接状态变更事件
      client.on('connection-state-changed', (event) => {
        const prevState = event.prevState
        const curState = event.state
        console.log('连接状态变更', prevState, curState)
      })

      // 远端用户进房事件
      client.on('peer-join', (evt) => {
        const userId = evt.userId
        console.log('远端用户进房', userId)
      })

      // 远端用户退房事件
      client.on('peer-leave', (evt) => {
        const userId = evt.userId
        console.log('远端用户退房', userId)
        // 两种方式移除空的模块

        let filter = that.remoteStreamList.filter((element) => {
          return element.userid !== userId
        })
        that.remoteStreamList = filter

        // let remoteStream = that.remoteStreamList
        // let filterIndex = -1
        // remoteStream.filter((element, index) => {
        //   if (element.userid === userId) filterIndex = index
        // })
        // if (filterIndex !== -1) remoteStream.splice(filterIndex, 1)
        // that.remoteStreamList = remoteStream
      })

      //关闭本地摄像头   this.localStream.muteVideo()
      //开始本地摄像头   this.localStream.unmuteVideo()
      //关闭本地麦克风   this.localStream.muteAudio()
      //开启本地麦克风   this.localStream.unmuteAudio()
      // 远端用户禁用音频事件
      client.on('mute-audio', (evt) => {
        const userId = evt.userId
        console.log('远端用户关闭音频', userId)
      })
      // 远端用户开启音频
      client.on('unmute-audio', (evt) => {
        const userId = evt.userId
        console.log('远端用户开启音频', userId)
      })
      // 远端用户禁用视频事件
      client.on('mute-video', (evt) => {
        const userId = evt.userId
        console.log('远端用户关闭视频', userId)
      })
      // 远端用户开启视频
      client.on('unmute-video', (evt) => {
        const userId = evt.userId
        console.log('远端用户开启视频', userId)
      })

      // 被动退出房间事件
      client.on('client-banned', (evt) => {
        console.log(`reason: ${evt.reason}, message: ${evt.message}`)
        // 根据对应的 reason 提示用户
      })
    }

    //监听声音大小 在本地视频里发布成功后调用。
    // setVolumeInterval(stream, userId) {
    //   setInterval(() => {
    //     const volume = stream.getAudioLevel()
    //     console.log(volume)
    //     // volume>0.01 算是正常说话；
    //     //如需监听房间内所有人声音大小需要在增加人员后调用下；针对每个人设置一个setInterval
    //     //在关闭麦克风和人员退出需要清除该人员的定时器。房间退出后结束全部定时器；
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  overflow: scroll;
}
.live_box {
  margin-bottom: 0.35rem;
  border-radius: 0.05rem;
  box-shadow: 0.025rem 0.025rem 0.125rem 0.025rem rgba(0, 0, 0, 0.2);
}
</style>
