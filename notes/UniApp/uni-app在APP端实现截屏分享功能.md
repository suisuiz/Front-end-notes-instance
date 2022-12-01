# uni-app在APP端实现截屏分享功能



### 方法一：[html2canvas.js](https://cdn.bootcss.com/html2canvas/0.5.0-beta4/html2canvas.js)

- 这种方法需要获取DOM节点，app端获取不到。如果可以获取DOM节点，可以尝试使用此方法。

### 方法二：[5+api](http://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewDrawOptions)

```JavaScript
let pages = getCurrentPages();  
let page = pages[pages.length - 1];  
let ws = page.$getAppWebview();  
let bitmap = new plus.nativeObj.Bitmap('drawScreen');  
// 将webview内容绘制到Bitmap对象中  
ws.draw(bitmap, () => {  
  // 保存图片到本地  
  bitmap.save("_doc/drawScreen.jpg", {  
    overwrite: true  
  }, res => {  
    console.log(res.target); // 图片地址  
    bitmap.clear(); // 清除Bitmap对象  
  }, error => {  
    console.log(JSON.stringify(error)); // 保存失败信息  
    bitmap.clear(); // 清除Bitmap对象  
  });  
  // bitmap.clear(); // 清除Bitmap对象  
}, error => {  
  console.log(JSON.stringify(error)); // 绘制失败  
}, {  
  check: true, // 设置为检测白屏  
});
```

#### 注意

- 血的教训：之前能用，后面突然发现返回的路径一直是file://null，原来是 bitmap.save和 bitmap.clear的时间差的问题，一定要把bitmap.clear放在成功回调函数或者失败函数里面。
- 在获取本地对象时，如果使用plus.webview.currentWebview()获取本地对象，有可能截屏时出现黑屏现象。

```JavaScript
复制代码let ws= plus.webview.currentWebview();
```

- 在APP端使用app端获取方法

```JavaScript
复制代码// 因为这里只做app端，所以没有加上条件编译，如果多端的话加上APP的条件编译  
let pages = getCurrentPages();  
let page = pages[pages.length - 1];  
let ws = page.$getAppWebview();
```

## 分享

- 使用uni-app的方法[uni.share(OBJECT)](https://uniapp.dcloud.io/api/plugins/share?id=share)