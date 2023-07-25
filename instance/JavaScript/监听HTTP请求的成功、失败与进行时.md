# 监听HTTP请求的成功、失败与进行时

**1.** 监听请求成功: **`xhr.onload`**

**2.** 监听请求失败: **`xhr.onerror`**

**3.** 监听请求数据下载中: **`xhr.onprogress`**

```javascript
xhr.onload = function() {
 var responseText = xhr.responseText;
 console.log(responseText);
 // process the response.
};

xhr.onabort = function () {
  console.log('The request was aborted');
};

xhr.onprogress = function (event) {
  console.log(event.loaded);
  console.log(event.total);
};

xhr.onerror = function() {
  console.log('There was an error!');
};
```

> **注意: `xhr.onprogress`**是其中仅有的一个具有事件参数的事件监听属性, **`e.loaded`**表示下载了多少数据, **`e.total`**表示数据总量, **`e.lengthComputable`** 表示加载进度是否可计算.