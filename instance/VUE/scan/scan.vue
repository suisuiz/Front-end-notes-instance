<!--
 * @Descripttion: 
 * @Author: SUI
 * @Date: 2021-11-22 17:30:13
 * @LastEditors: SUI
 * @LastEditTime: 2021-11-22 18:06:07
 * @FilePath: \phone-hubc:\Users\wangy\Desktop\git\instance-hub\VUE\scan.vue
-->
<template>
  <div id="scan">
    <div class="scan-btn" @click="scanbtn"></div>

    <!--  JS-SDK说明文档  https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html

          1.微信公众号平台绑定安全域名，注意不要加协议名
          2、安装微信sdk
            npm install weixin-js-sdk --save
          3、需要的页面中引入
            import wx from "weixin-js-sdk"
          4、点击事件，触发微信扫码
            handleScan() {}
     -->

    <!--  -->
  </div>
</template>

<script>
// 引入微信 SDK
import wx from 'weixin-js-sdk'

export default {
  name: 'Scan',

  data() {
    return {
      result: ''
    }
  },

  created() {},

  methods: {
    handleScan() {
      let that = this
      this.$http({
        method: 'GET',
        // 扫一扫接口
        url: '/wxscan',
        withCredentials: false
      })
        .then((res) => {
          if (res.status == 200) {
            // console.log('DATA', res.data)
            // 扫一扫  配置参数由后台提供
            wx.config({
              // 开启调试模式
              debug: false,
              // 必填，公众号的唯一标识
              appId: res.data.appId,
              // 必填，生成签名的时间戳
              timestamp: res.data.timestamp,
              // 必填，生成签名的随机串
              nonceStr: res.data.nonceStr,
              // 必填，签名
              signature: res.data.signature,
              //使用的 api
              jsApiList: ['scanQRCode']
            })

            // 通过ready接口处理成功验证  config 信息验证后会执行 ready 方法
            wx.ready(() => {
              // console.log('wx.ready')
              wx.checkJsApi({
                //使用的 api
                jsApiList: ['scanQRCode'],
                success(res) {
                  if (res.checkResult.scanQRCode === true) {
                    wx.scanQRCode({
                      // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                      needResult: 1,
                      // 扫码类型
                      scanType: ['qrCode', 'barCode'],
                      success(res) {
                        that.result = res.resultStr
                        that.confirm()
                      }
                    })
                  } else {
                    console.log('抱歉，当前客户端版本不支持扫一扫')
                  }
                },
                fail() {
                  //checkJsApiFail
                  console.log('fail=checkJsApiFail')
                }
              })
            })

            // config 信息验证失败会执行 error 函数
            wx.error(() => {
              //配置验证失败
              console.log('wx.error=配置验证失败')
            })
          }
        })
        .catch((res) => {
          if (typeof fail != 'undefined') {
            console.log('catch', res)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
