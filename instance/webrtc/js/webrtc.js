class webRtcJs {
  constructor(opt) {
    let rtcPlayer = null
    // console.log(JSON.stringify(opt))
  }
  getQueryVariable(variable) {
    let query = window.location.search.substring(1)
    let vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split('=')
      if (pair[0] == variable) {
        return pair[1]
      }
    }
    return false
  }

  postMsg(data) {
    console.log(JSON.stringify(data))
    uni.postMessage({ data })
  }

  addEventMessage() {
    window.addEventListener(
      'message',
      (e) => {
        console.log('addEventListener message==', JSON.stringify(e))
      },
      false
    )
  }

  getMessage() {
    window.getUniAppMessage = (arg) => {
      console.log('网页接收到消息', JSON.stringify(arg))
    }
  }

  playRtc() {
    let url = decodeURIComponent(this.getQueryVariable('webrtcSrc'))
    if (url) {
      let videoDom = document.getElementById('video_webrtc')
      this.rtcPlayer = new JSWebrtc.Player(url, {
        video: videoDom,
        autoplay: true,
        onplay: (obj) => {
          videoDom.addEventListener('canplay', function (e) {
            videoDom.play()
          })
        }
      })
    }
  }
}
