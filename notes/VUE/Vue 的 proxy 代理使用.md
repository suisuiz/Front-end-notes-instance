# vue 的 proxy 代理使用

### 使用方法

https://www.jianshu.com/p/61ef3d7a64c5



https://www.jianshu.com/p/f5d5ffa92e0b



```
devServer: {
  proxy: {
    "/zzz": {
      target: "http://XX.XX.XX.XX:8082",
      changeOrigin: true,
      ws: true,
    },
    "/xxx": {
      target: "http://XX.XX.XX.XX:8083",
      changeOrigin: true,
      ws: true,
    },
  },
},
// 那么实际发送给后端的请求就是：
// http://XX.XX.XX.XX:8082/zzz/one
// http://XX.XX.XX.XX:8083/xxx/two
```

