# Vue3 - element-plus 相关

## 1、安装 element-plus: vue3、cli[vue -V] (5.00+)

```
npm install element-plus --save
npm install -D unplugin-vue-components unplugin-auto-import
```

## 2、配置`vue.config.js`

```javascript
const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

// // 添加这一行（保证ElLoading等组件库的样式完整，要不然就会样式丢失）
// const ElementPlus = require('unplugin-element-plus/webpack')

module.exports = defineConfig({
  lintOnSave: false,
  productionSourceMap: false,
  transpileDependencies: true,
  // outputDir: './build',
  configureWebpack: {
    // resolve: {
    //   alias: {
    //     components: '@/components'
    //   }
    // },
    //配置webpack自动按需引入element-plus
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
      // // 添加这一行
      // ElementPlus()
    ]
  }
})
```

## 3、运行报错

> TypeError: AutoImport is not a function
> TypeError: Components is not a function

<!-- （插件版本问题，回退插件版本）-vue 项目 element plus 按需引入配置错误 -->

AutoImport => unplugin-auto-import
Components => unplugin-vue-components
执行回退插件版本

```
npm install unplugin-auto-import@0.16.1
```

```
npm install unplugin-vue-components@0.25.2
```
