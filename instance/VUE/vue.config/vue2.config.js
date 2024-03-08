// https://cli.vuejs.org/zh/config/#vue-config-js
const Timestamp = new Date().getTime()
module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  publicPath: './',

  // 不同的方式 方向代理

  // 1、全部代理
  // devServer: {
  //   proxy: 'http://192.168.1.150:18889'
  // },

  // 2、根据不同的接口前缀 代理
  devServer: {
    proxy: {
      '/container': {
        target: 'http://192.168.1.150:7005',
        changeOrigin: true,
        ws: true
      },
      '/api/light-app/transmit': {
        target: 'http://192.168.1.150:7005',
        changeOrigin: true,
        ws: true
      },
      '/api/v2/device/service': {
        target: 'http://192.168.1.150:59881',
        changeOrigin: true,
        ws: true
      },
      '/api/v2/device/name': {
        target: 'http://192.168.1.150:59882',
        changeOrigin: true,
        ws: true
      },
      '/stream': {
        target: 'http://192.168.1.150:18889',
        changeOrigin: true,
        ws: true
      },
      '/start': {
        target: 'http://192.168.1.150:8000',
        changeOrigin: true,
        ws: true
      },
      '/stop': {
        target: 'http://192.168.1.150:8000',
        changeOrigin: true,
        ws: true
      }
    }
  },

  // webpack 配置
  configureWebpack: {
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `static/js/[name].${Timestamp}.js`,
      chunkFilename: `static/js/[name].${Timestamp}.js`
    }
  }
}
