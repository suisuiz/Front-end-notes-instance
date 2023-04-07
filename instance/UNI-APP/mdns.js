/*
 * @Descripttion: mdns 切换 IP
 * @Author: SUI
 */

module.exports = {
  // mdns 自动发现同网段设备服务
  switchIp() {
    // #ifdef APP-PLUS
    if (plus.os.name == 'Android') {
      // console.log('Android')
      let mServerType = '_nfd._tcp' // 服务类型
      let Context = plus.android.importClass('android.content.Context')

      // 获取应用主Activity实例对象系统服务NSD_SERVICE方法
      // console.log('hello world!')
      let mNsdManager = plus.android.runtimeMainActivity().getSystemService(Context.NSD_SERVICE)
      // 实列API接口监听回调函数
      let mDiscoveryListener = plus.android.implements('android.net.nsd.NsdManager$DiscoveryListener', {
        onDiscoveryStarted: function (serviceType) {
          // console.log('onDiscveryStarted', serviceType)
        },
        onDiscoveryStopped: function (serviceType) {
          console.log('onDiscoveryStopped', serviceType)
        },
        onServiceFound: function (service) {
          // console.log('onServiceFound', service)
          // 先发现设备服务再执行连接获取数据  导入service类
          plus.android.importClass(service)

          // 实列化连接服务接口监听回调函数
          // 注意NsdManager$ResolveListener中间使用$不是“.”
          let mResolveListener = plus.android.implements('android.net.nsd.NsdManager$ResolveListener', {
            onServiceResolved: function (services) {
              // console.log('onSercieResolved', services)
              // 连接服务
              let name = services.getServiceName()
              let port = services.getPort()
              let ip = services.getHost()
              // 导入services.getHost()类
              plus.android.importClass(ip)
              ip = ip.getHostAddress()
              if (ip.split('.').length != 4) return

              // ip = "192.168.10.199"
              // ip = '192.168.10.248'
              // name = "08:71:90:43:2e:ed"

              // 获取到 IP 更新 websocket
              console.log(ip, name)
              getApp().mdns_siteId = name
              if (getApp().socketTask2 != null) {
                if (name == getApp().socketTask2.siteid && ip != getApp().socketTask2.ip) {
                  if (uni.getStorageSync('localAddress') !== ip) uni.setStorageSync('localAddress', ip)
                  getApp().socketTask2.close()
                  getApp().socketTask2 = new websocket(`http://${ip}`, true, name, getApp().siteId)
                  getApp().socketTask2.onLogin = (event) => {
                    getApp().sockeDataLogin(event, true)
                  }
                  getApp().socketTask2.onChat = (event) => {
                    getApp().sockeDataMsg(event, true)
                  }
                  getApp().socketTask2.onNotify = (event) => {
                    getApp().sockeDataNotify(event, true)
                  }
                  getApp().socketTask2.onRevoke = (event) => {
                    getApp().sockeDataRevoke(event.response.data, event.seq, true)
                  }
                }
              } else {
                if (uni.getStorageSync('localAddress') !== ip) uni.setStorageSync('localAddress', ip)
                getApp().socketTask2 = new websocket(`http://${ip}`, true, name, getApp().siteId)
                getApp().socketTask2.onLogin = (event) => {
                  getApp().sockeDataLogin(event, true)
                }
                getApp().socketTask2.onChat = (event) => {
                  getApp().sockeDataMsg(event, true)
                }
                getApp().socketTask2.onNotify = (event) => {
                  getApp().sockeDataNotify(event, true)
                }
                getApp().socketTask2.onRevoke = (event) => {
                  getApp().sockeDataRevoke(event.response.data, event.seq, true)
                }
              }
              // getApp().WEBSOCKET2()

              mNsdManager.stopServiceDiscovery(mResolveListener)
              // console.log(name, port, ip)
            },
            onResolveFailed: function (serviceInfo, errorCode) {}
          })
          // 启动连接服务
          mNsdManager.resolveService(service, mResolveListener)
        },
        onServiceLost: function (serviceInfo) {
          // console.log('onServieLost')
        },
        onStartDiscoveryFailed: function (serviceType, errorCode) {
          console.log('onStartDiscoveryFailed')
        },
        onStopDiscoveryFailed: function (serviceType, errorCode) {
          console.log('onStopDiscoveryFailed')
        }
      })
      // 导入mNsdManager Java类对象
      plus.android.importClass(mNsdManager)
      // 启动监听服务（类型，常量，回调函数）参考java discoverServices需要携带的参数类型
      mNsdManager.discoverServices(mServerType, 1, mDiscoveryListener)
    } else {
      console.log('MDNS IOS')

      // test
      // let ip = '192.168.10.199'
      let ip = '192.168.10.248'
      let name = '00:f1:f3:21:72:cd'

      // 获取到 IP 更新 websocket
      if (uni.getStorageSync('localAddress') !== ip) {
        uni.setStorageSync('localAddress', ip)
      }
      if (getApp().socketTask2 != null) {
        if (ip != getApp().socketTask2.ip) {
          getApp().socketTask2.close()
          getApp().socketTask2 = new websocket(`http://${ip}`, true, name)
          getApp().socketTask2.onLogin = (event) => {
            getApp().sockeDataLogin(event, true)
          }
          getApp().socketTask2.onChat = (event) => {
            getApp().sockeDataMsg(event, true)
          }
          getApp().socketTask2.onNotify = (event) => {
            getApp().sockeDataNotify(event, true)
          }
        }
      } else {
        console.log(ip)
        getApp().socketTask2 = new websocket(`http://${ip}`, true, name)
        getApp().socketTask2.onLogin = (event) => {
          getApp().sockeDataLogin(event, true)
        }
        getApp().socketTask2.onChat = (event) => {
          getApp().sockeDataMsg(event, true)
        }
        getApp().socketTask2.onNotify = (event) => {
          getApp().sockeDataNotify(event, true)
        }
      }
    }
    // #endif
  }
}
