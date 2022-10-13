## 一、调用函数

### 1、Vue 中调用 iframe 方法

```vue
<template>
  <div>
    <button @click="reportPrint">点击调用iframe中的方法</button>
    <iframe ref="iframe" :src="urlPath" class="iframe" frameborder="0" scrolling="yes" name="iframe" seamless>您的浏览器版本过低，无法显示报表内容！建议升级浏览器或更换浏览器！</iframe>
  </div>
</template>

<script>
export default {
  methods: {
    reportPrint() {
      // this.$refs.是ref值.contentWindow.函数名()
      // this.$refs.iframeName.contentWindow.FunctionName()
      this.$refs.iframe.contentWindow.Print()
    }
  }
}
</script>
```

## 二、iframe 调用 它父页面的方法

### 1、方法一

#### 父页面

```html
<body>
  <h1>我是父页面</h1>
  <iframe src="http://127.0.0.1:5050" frameborder="0" style="height: 100%;width: 100%"></iframe>
  <script>
    function fatherFunction() {
      	alert('我是父页面中的方法！')
    }
    window.addEventListener('message', function(e){
         console.log(e) //{data:'params'}
         fatherFunction()
    })
  </script>
</body>
```

#### 子页面

```vue
<template>
  <div class="weather-app" :class="currentWeatherBG">
    <button @click="test">我是子页面按钮，点击调用父页面方法</button>
  </div>
</template>

<script>
export default {
  methods: {
      test() {
      window.parent.postMessage({
        data :"params"
      },'*');
    },
 }
}
</script>
```



可以看到，这里关键是子页面通过postMessage方法实现的通信，[postMessage的使用方法](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)为：

```javascript
otherWindow.postMessage(message, targetOrigin, [transfer]);
```

message为需要传递的信息，
targetOrigin为指定哪些窗口能接收到消息事件，可以为’*’，但是这样很不安全，建议根据实际项目精确匹配。

而父页面则只需要添加事件监听器，在回调中执行需要执行方法或者使用参数。

```javascript
window.addEventListener('message', function(e){
     console.log(e) //{data:'params'}
     fatherFunction()
})
```



### 2、方法二

#### 问题

在实际的开发中遇到一个需求，就是 `iframe` 子页面需要调用父页面的方法，起初百度使用了 `window.parent.vm*` 来调用父页面的方法，后来发现在iframe的纯 htm l页面中根本取不到 vm，遂推测应该是两个 vue 工程页面之间的调用可以用这个；接着又使用了 `window.parent.getElementId(‘xxx’)` ，这种方法理论上来说应该是可行的，但是我懒且不喜欢这种调用方式，就没有深究，放弃了这种方法的尝试。所以找到了 `postMessage` 这种方法，感觉还不错，就选择了这个。

#### 解决方案

postMessage的使用还是很简单的，也能够实现跨域间的通信，感觉很好用，下面就是使用方法：

```javascript
window.parent.postMessage(data, '*');
```



“*”代表所有的地址都能接收到信息，这个地方其实是目标路径，可以根据自己的实际路径进行更改；这里有一块需要注意的地方，在第一次使用的时候，我使用了 `window.postMessage`，但不知道什么原因，接收不到信息，改为 `window.parent.postMessage` 之后就可以了；
接收端：

```javascript
window.addEventListener('message', (ev) => {
      var data = ev.data;
	  //下面可以调用我们html页面js中的方法，使用传递的数据进 行操作了
	  console.log(data);
}, false);
```

