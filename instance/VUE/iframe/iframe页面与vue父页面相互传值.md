## 传值

### **1、iframe页面向vue父页面传值**

#### **iframe**	发消息

```javascript
window.parent.postMessage(code,"*");
```

#### **vue**	收消息

```vue
mounted() {
    let that = this;
    window.addEventListener("message", function (e) {
      console.log(e.data)
    });
  },
```



### **2、vue页面向iframe页面传值**

#### **vue**	发消息

```
mounted() {
    this.iframe = this.$refs.iframe
    this.iframeWindow = this.iframe.contentWindow
    let message = 1
    this.iframeWindow.postMessage(message, '*')
},
```

#### **iframe**	收消息

```javascript
window.addEventListener('message', function (e) {
	console.log(e.data)
}
```

