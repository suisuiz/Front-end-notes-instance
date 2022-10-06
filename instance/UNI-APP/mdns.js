/*
 * @Descripttion: mdns 切换 IP
 * @Author: SUI
 * @Date: 2021-07-26 10:47:36
 * @LastEditors: SUI
 * @LastEditTime: 2021-10-14 14:47:20
 * @FilePath: \things\common\mdns.js
 */

module.exports = {
  // mdns 自动发现同网段设备服务
  switchIp() {
    // #ifdef APP-PLUS
    let mServerType = '_nfd._tcp' // 服务类型
    let Context = plus.android.importClass('android.content.Context')

    // 获取应用主Activity实例对象系统服务NSD_SERVICE方法
    // console.log('hello world!')
    let mNsdManager = plus.android
      .runtimeMainActivity()
      .getSystemService(Context.NSD_SERVICE)
    // 实列API接口监听回调函数
    let mDiscoveryListener = plus.android.implements(
      'android.net.nsd.NsdManager$DiscoveryListener', {
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
          let mResolveListener = plus.android.implements(
            'android.net.nsd.NsdManager$ResolveListener', {
              onServiceResolved: function (services) {
                // console.log('onSercieResolved', services)
                // 连接服务
                let name = services.getServiceName()
                let port = services.getPort()
                let ip = services.getHost()
                // 导入services.getHost()类
                plus.android.importClass(ip)
                ip = ip.getHostAddress()

                // 获取到 IP 更新 websocket
                if (uni.getStorageSync('localAddress') !== ip) {
                  uni.setStorageSync('localAddress', ip);
                  getApp().clearSocket2();
                }
                // getApp().WEBSOCKET2();

                let arry = {
                  name: name,
                  port: port,
                  ip: ip,
                }
                mNsdManager.stopServiceDiscovery(mResolveListener)
                // console.log(arry)
              },
              onResolveFailed: function (serviceInfo, errorCode) {},
            }
          )
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
        },
      }
    )
    // 导入mNsdManager Java类对象
    plus.android.importClass(mNsdManager)
    // 启动监听服务（类型，常量，回调函数）参考java discoverServices需要携带的参数类型
    mNsdManager.discoverServices(mServerType, 1, mDiscoveryListener)

    // #endif
  }
}