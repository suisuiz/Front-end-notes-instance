/*
 * @Descripttion: mdns 切换 IP
 * @Author: SUI
 */
let websocket = require('@/common/websocket.js')
let serverType = '_nfd._tcp'
let mDiscoveryListener = null
let mResolveListener = null
let mNsdManager = null
let DB = require('@/common/sqlite.js')
module.exports = {
  // mdns 自动发现同网段设备服务
  async switchIp() {
    let that = this
    // #ifdef APP-PLUS
    if (plus.os.name == 'Android') {
      let wifiInfos = { name: '', id: '' }
      let isGetWifi = true
      uni.getNetworkType({
        success(res) {
          if (res.networkType === 'wifi') {
            isGetWifi = false
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
            that.findMDNS(wifiInfos)
          }
        }
      })
      setTimeout(() => {
        if (isGetWifi) that.findMDNS(wifiInfos)
      }, 4000)
    } else {
      // test
      let ip = '192.168.10.248'
      let name = '00:f1:f3:21:72:cd'
      let storage_ip = uni.getStorageSync('localAddress')
      getApp().mdns_siteId = name
      if (getApp().socketTask2 != null) {
        if (ip !== getApp().socketTask2.ip || (ip === getApp().socketTask2.ip && name !== getApp().socketTask2.siteid)) {
          // 修改WiFi缓存表数据
          let updateSql = `ip = '${ip}', name = '${name}'`
          await DB.updateTableData('wificache', updateSql, 'wifi', wifi_infos.id)
          // 和缓存比较 不一致更新缓存
          if (storage_ip !== ip) uni.setStorageSync('localAddress', ip)
          getApp().socketTask2.close()
          that.connectSocket(ip, name, 'mdns发现-发现ip当前连接不一致')
        }
      } else {
        // 和缓存比较 不一致更新缓存
        if (storage_ip !== ip) uni.setStorageSync('localAddress', ip)
        that.connectSocket(ip, name, 'mdns发现-当前未连接')
      }
    }
    // #endif
  },

  async findMDNS(wifi_infos) {
    let that = this
    let storage_ip = uni.getStorageSync('localAddress')
    let wifi_ip = ''
    console.log('******************当前连接的 WIFI', wifi_infos)
    if (wifi_infos.id !== '') {
      try {
        let wifiList = await DB.selectTableData('wificache', 'wifi', wifi_infos.id)
        if (wifiList.length > 0) {
          let { ip, name } = wifiList[0]
          wifi_ip = ip
          console.log('==========wifi_ip=======', wifi_ip, name)
          if (getApp().socketTask2 != null) {
            if (ip !== getApp().socketTask2.ip) {
              getApp().socketTask2.close()
              that.connectSocket(ip, name, '缓存表-发现ip当前连接不一致')
            }
          } else {
            that.connectSocket(ip, name, '缓存表-当前未连接')
          }
        }
      } catch (error) {
        console.error(error)
      }
    }

    let mServerType = serverType // 服务类型
    let Context = plus.android.importClass('android.content.Context')
    // 获取应用主Activity实例对象系统服务NSD_SERVICE方法
    if (mNsdManager == null) {
      mNsdManager = plus.android.runtimeMainActivity().getSystemService(Context.NSD_SERVICE)
    }
    // 实列API接口监听回调函数
    if (mDiscoveryListener != null) {
      mNsdManager.stopServiceDiscovery(mDiscoveryListener)
    }
    mDiscoveryListener = plus.android.implements('android.net.nsd.NsdManager$DiscoveryListener', {
      onDiscoveryStarted: function (serviceType) {
        console.log('onDiscveryStarted', serviceType)
      },
      onDiscoveryStopped: function (serviceType) {
        console.log('onDiscoveryStopped', serviceType)
      },
      onServiceFound: function (service) {
        console.log('onServiceFound', JSON.stringify(service))
        // 先发现设备服务再执行连接获取数据  导入service类
        plus.android.importClass(service)

        // 实列化连接服务接口监听回调函数
        // 注意NsdManager$ResolveListener中间使用$不是“.”
        mResolveListener = plus.android.implements('android.net.nsd.NsdManager$ResolveListener', {
          async onServiceResolved(services) {
            console.log('onSercieResolved', services)
            // 连接服务
            let name = services.getServiceName()
            // let port = services.getPort()
            let ip = services.getHost()
            // 导入services.getHost()类
            plus.android.importClass(ip)
            ip = ip.getHostAddress()
            if (ip.split('.').length != 4) return

            // ip = '192.168.100.160'
            // name = 'egwedge6a7dd454075901'

            if (wifi_ip === '') {
              // WiFi 缓存表
              let sql = `'${wifi_infos.id}','${ip}','${name}'`
              let condition = "'wifi','ip','name'"
              await DB.insertTableData('wificache', sql, condition)
            }
            // 获取到 IP 更新 websocket
            console.log(ip, name)
            getApp().mdns_siteId = name
            if (getApp().socketTask2 != null) {
              if (ip !== getApp().socketTask2.ip || (ip === getApp().socketTask2.ip && name !== getApp().socketTask2.siteid)) {
                // 修改WiFi缓存表数据
                let updateSql = `ip = '${ip}', name = '${name}'`
                await DB.updateTableData('wificache', updateSql, 'wifi', wifi_infos.id)
                // 和缓存比较 不一致更新缓存
                if (storage_ip !== ip) uni.setStorageSync('localAddress', ip)
                getApp().socketTask2.close()
                that.connectSocket(ip, name, 'mdns发现-发现ip当前连接不一致')
              }
            } else {
              // 和缓存比较 不一致更新缓存
              if (storage_ip !== ip) uni.setStorageSync('localAddress', ip)
              that.connectSocket(ip, name, 'mdns发现-当前未连接')
            }
            // getApp().WEBSOCKET2()

            //mNsdManager.stopServiceDiscovery(mResolveListener)
            mNsdManager.stopServiceResolution(mResolveListener)
          },
          onResolveFailed: function (serviceInfo, errorCode) {
            console.log('onResolveFailed', errorCode)
            mNsdManager.stopServiceResolution(mResolveListener)
          }
        })
        // 启动连接服务
        mNsdManager.resolveService(service, mResolveListener)
      },
      onServiceLost: function (serviceInfo) {
        console.log('onServieLost', serviceInfo)
        //mNsdManager.stopServiceDiscovery(mDiscoveryListener)
      },
      onStartDiscoveryFailed: function (serviceType, errorCode) {
        console.log('onStartDiscoveryFailed', serviceType, errorCode)
      },
      onStopDiscoveryFailed: function (serviceType, errorCode) {
        console.log('onStopDiscoveryFailed', serviceType, errorCode)
      }
    })
    // 导入mNsdManager Java类对象
    plus.android.importClass(mNsdManager)
    // 启动监听服务（类型，常量，回调函数）参考java discoverServices需要携带的参数类型
    mNsdManager.discoverServices(mServerType, 1, mDiscoveryListener)
  },

  // 连socket
  connectSocket(ip, name) {
    const APPVUE = getApp()
    uni.setStorageSync('localAddress', ip)
    APPVUE.socketTask2 = new websocket(`http://${ip}`, true, name, APPVUE.siteId)
    APPVUE.socketTask2.onLogin = (event) => {
      APPVUE.sockeDataLoginAndPull(event, true, 'login')
    }
    APPVUE.socketTask2.onPull = (event) => {
      APPVUE.sockeDataLoginAndPull(event, true, 'pull')
    }
    APPVUE.socketTask2.onChat = (event) => {
      APPVUE.sockeDataMsg(event, true)
    }
    APPVUE.socketTask2.onNotify = (event) => {
      APPVUE.sockeDataNotify(event, true)
    }
    APPVUE.socketTask2.onRevoke = (event) => {
      APPVUE.sockeDataRevoke(event.response.data, event.seq, true)
    }
  }
}
