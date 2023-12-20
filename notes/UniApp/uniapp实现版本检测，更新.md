## uniapp 实现版本检测，更新

### 1.首先需要获取当前 app 的版本

```javascript
export default {
  getVersion() {
    const systemInfo = uni.getSystemInfoSync()
    // 应用程序版本号
    // #ifdef APP
    me.version = systemInfo.appWgtVersion
    // #endif
    // #ifdef H5
    me.version = systemInfo.appVersion
    // #endif
  }
}
```

### 2.在获取到服务器保存的 app 版本

### 3.点击按钮验证版本号

```javascript
export default {
  // 检查更新按钮
  checkUpdate() {
    const me = this
    const compare = me.compareVersion(me.version, me.webVersion)
    if (compare < 0) {
      me.$refs.version.open()
    } else {
      me.$showMessage('已是最新版本')
    }
  },
  // 比较版本号
  compareVersion(v1, v2) {
    const arr1 = v1.split('.')
    const arr2 = v2.split('.')
    if (arr1.length === arr2.length) {
      for (let i = 0; i < arr1.length; i++) {
        let ver1 = parseInt(arr1[i] || '0')
        let ver2 = parseInt(arr2[i] || '0')
        if (ver1 > ver2) {
          return 1
        } else if (ver1 < ver2) {
          return -1
        }
      }
      return 0
    } else {
      this.$showMessage('版本号的长度不一致，请联系管理员解决')
      return 0
    }
  }
}
```

### 4.如果版本号不是最新的就打开提示弹窗

### 5.点击更新时下载，并显示进度（弹窗显示）

用官方提供的 onProgressUpdate 可以获取到下载进度。

```vue
<template>
  <uni-popup ref="process" type="center">
    <view class="popup-content">
      <progress :percent="progress" border-radius="5"></progress>
    </view>
    <view style="text-align: center;color: #fff;padding: 10px;">
      {{ '下载中: ' + progress + '%' }}
    </view>
  </uni-popup>
</template>
```

```javascript
export default {
  // 更新
  dialogConfirm() {
    this.$refs.version.close()
    var downloadTask = uni.downloadFile({
      url: base_url + '/UploadFile/base.apk',
      success: (res) => {
        this.$refs.process.close()
        this.progress = 0
        if (res.statusCode === 200) {
          uni.openDocument({
            filePath: res.tempFilePath,
            success() {}
          })
        }
      }
    })
    downloadTask.onProgressUpdate((res) => {
      this.$refs.process.open()
      this.progress = res.progress
    })
  }
}
```

下载完成后关闭弹窗,获取的临时地址用 uni.openDocument 打开文件，就可以安装了。
