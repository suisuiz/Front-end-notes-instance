# XMLHttpRequest 实现下载文件的功能

### 方式一：

```javascript
download('http://.....exportData', { name: '小明', age: 18 })

function download(url, data) {
  var xhr = new XMLHttpRequest() //ajax的技术核心是XMLHttpRequest对象
  xhr.open('post', url)
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8') //设置请求头
  xhr.responseType = 'blob' //返回类型blob
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        var data = xhr.response
        var defaultFileName = xhr.getResponseHeader('Content-Disposition').split(';')[1].split('filename=')[1] //从响应头中获取文件名
        var filename = decodeURI(defaultFileName) //解码
        //判断浏览器类型
        const uA = window.navigator.userAgent
        const isIE = /msie\s|trident\/|edge\//i.test(uA) && !!('uniqueID' in document || 'documentMode' in document || 'ActiveXObject' in window || 'MSInputMethodContext' in window)
        const blob = new Blob([data], { type: data.type })
        if (isIE) {
          navigator.msSaveBlob(blob, filename) // 兼容IE
        } else {
          const a = document.createElement('a')
          const url = window.URL.createObjectURL(blob)
          a.href = url
          a.download = filename
          a.click()
          window.URL.revokeObjectURL(url)
        }
      }
    }
  }
  xhr.onerror = function () {
    alert('下载失败')
  }
  // 发送ajax请求
  xhr.send(JSON.stringify(data)) // 数据格式，看具体接口情况决定
}
```

### 方式二：

```javascript
var xhr = new XMLHttpRequest()
xhr.open('get', '请求url')
//设置请求头
xhr.setRequestHeader(window.AUTH_HEADER, window.localStorage.getItem(window.TOKEN_NAME))
//设置响应类型
xhr.responseType = 'blob'
xhr.onload = function (e) {
  if (this.status == 200) {
    var filename = xhr.getResponseHeader('Content-disposition').slice(9)
    var blob = this.response
    var a = document.createElement('a')
    var url = URL.createObjectURL(blob)
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
  }
}
xhr.send()
```
