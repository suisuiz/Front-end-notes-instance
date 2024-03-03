# Vue-cli 5 配置

> `vue.config.js`

```js
const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

const resolve = (dir) => path.join(__dirname, dir)

module.exports = defineConfig({
  // 基本路径
  publicPath: '/',
  // 输出文件目录
  outputDir: '',
  assetsDir: 'static',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  runtimeCompiler: true, // 关键点在这
  filenameHashing: true,
  // 调整内部的 webpack 配置。
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src')).set('assets', resolve('src/assets')).set('components', resolve('src/components')).set('types', resolve('src/types')).set('public', resolve('public'))
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => ({
        ...options,
        compilerOptions: {
          // 忽略自定义标签警告 vue3 app.config.compilerOptions.isCustomElement 配置有问题
          isCustomElement: (tag) => {
            return ['xml', 'block', 'mutation', 'category'].includes(tag)
          }
        }
      }))
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      scss: {
        additionalData: `@import './src/assets/styles/variables.scss';`
      },
      sass: {
        implementation: require('sass') // This line must in sass option
      },
      css: {
        modules: {
          auto: () => false
        }
      }
    }
  },
  // webpack-dev-server 相关配置
  devServer: {
    /* 自动打开浏览器 */
    open: process.platform === 'darwin',
    port: 8080,
    https: false,
    // hot: 'only',
    /* 使用代理 */
    proxy: {
      '/robogo': {
        /* 目标代理服务器地址 */
        target: process.env.VUE_APP_BASE_API,
        /* 允许跨域 */
        changeOrigin: true,
        ws: true
      },
      '/loki': {
        /* 目标代理服务器地址 */
        target: process.env.VUE_APP_BASE_API,
        /* 允许跨域 */
        changeOrigin: true,
        ws: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      fallback: {
        path: require.resolve('path-browserify'),
        stream: require.resolve('readable-stream'),
        crypto: require.resolve('crypto-browserify'),
        perf_hooks: false,
        module: false,
        '@blueprintjs/core': false,
        '@blueprintjs/icons': false,
        domain: false,
        fs: false,
        pnpapi: false,
        punycode: false
      }
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        }
      ]
    },
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path][base].gzip',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240, //内容超过10KB进行压缩
        minRatio: 0.8
      })
    ],
    externals: [
      {
        './cptable': 'var cptable'
      }
    ]
  },
  // 第三方插件配置
  pluginOptions: {}
})
```
