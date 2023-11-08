# 获取 Wifi 列表

## 案例

### 单独获取名称和 id

```javascript
uni.getNetworkType({
  success(res) {
    if (res.networkType === 'wifi') {
      // 主窗体
      let MainActivity = plus.android.runtimeMainActivity()
      let Context = plus.android.importClass('android.content.Context')
      // 导入WIFI管理 和 WIFI 信息 的class
      plus.android.importClass('android.net.wifi.WifiManager')
      plus.android.importClass('android.net.wifi.WifiInfo')
      // plus.android.importClass('android.net.wifi.ScanResult')
      // plus.android.importClass('java.util.ArrayList')
      // 获取 WIFI 管理实例
      let wifiManager = MainActivity.getSystemService(Context.WIFI_SERVICE)
      // 获取当前连接的 WIFI
      let info = wifiManager.getConnectionInfo()
      // 当前 WIFI 的 SSID (WIFI 名称)
      let ssid = info.getSSID()
      // 这里的 获取到的名称 是 带 双引号的 如 "cmcc"  所以我们这里处理一下
      ssid = ssid.replace(/(^\"*)|(\"*$)/g, '')
      // 当前 WIFI 的 BSSID (MAC 地址)
      let bssid = info.getBSSID()
      if (ssid && bssid !== null) {
        wifiInfos = { name: ssid, id: bssid }
        console.log('*********获取的当前 WIFI', wifiInfos)
      }
    }
  }
})
```

### 获取列表

```javascript
// 获取 Wifi 列表
uni.getNetworkType({
  success() {
    // 主窗体
    let MainActivity = plus.android.runtimeMainActivity()
    // 上下文
    let Context = plus.android.importClass('android.content.Context')
    // 导入WIFI管理 和 WIFI 信息 的class
    plus.android.importClass('android.net.wifi.WifiManager')
    plus.android.importClass('android.net.wifi.WifiInfo')
    plus.android.importClass('android.net.wifi.ScanResult')
    plus.android.importClass('java.util.ArrayList')
    // 获取 WIFI 管理实例
    let wifiManager = MainActivity.getSystemService(Context.WIFI_SERVICE)

    // 获取当前连接的 WIFI
    let info = wifiManager.getConnectionInfo()
    // 当前 WIFI 的 SSID (WIFI 名称)
    let ssid = info.getSSID()
    // 这里的 获取到的名称 是 带 双引号的 如 "cmcc"  所以我们这里处理一下
    ssid = ssid.replace(/(^\"*)|(\"*$)/g, '')
    // 当前 WIFI 的 BSSID (MAC 地址)
    let bssid = info.getBSSID()
    let wifiInfos = { ssid, bssid }
    console.log('当前连接的 WIFI', wifiInfos)

    // 获取 WIFI 列表
    let resultList = wifiManager.getScanResults(),
      len = resultList.size()
    let tmpListId = []
    let tmpListName = []
    for (let i = 0; i < len; i++) {
      console.log('**************', resultList.get(i).toString())
      if (resultList.get(i).plusGetAttribute('BSSID').length > 0) {
        tmpListId.push(resultList.get(i).plusGetAttribute('BSSID'))
      }
      if (resultList.get(i).plusGetAttribute('SSID').length > 0) {
        tmpListName.push(resultList.get(i).plusGetAttribute('SSID'))
      }
    }
    tmpListName = tmpListName.filter(function (item, index, self) {
      return self.indexOf(item) == index
    })
    // 存放wifi列表
    console.log('MAC 地址列表', tmpListId)
    console.log('WIFI 名称列表', tmpListName)
  },
  fail(error) {
    console.error('获取WiFi失败', error)
  }
})
```

### 相关链接

```
  https://blog.csdn.net/yjl23332/article/details/115666943

  https://ask.dcloud.net.cn/question/12113
```
