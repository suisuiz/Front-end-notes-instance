## `jswebrtc` 两种表达方式

### 第一种

```html
<div class="jswebrtc video_box" data-url="webrtc://192.168.100.160/live/DS-2CD3T87WD-L20210720AACHG38740354"></div>
```

### 第二种

```html
<video id="video_webrtc" class="video_box" controls></video>
```

```javascript
function playRtc() {
  let url = decodeURIComponent(this.getQueryVariable('webrtcSrc'))
  url = 'webrtc://192.168.100.160/live/DS-2CD3T87WD-L20210720AACHG38740354'
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
```
