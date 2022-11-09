## `uni-app` 页面全屏

```
// 全屏
plus.navigator.setFullscreen(true)

// 取消全屏
plus.navigator.setFullscreen(false)
```



### 页面全屏

```
 onShow() {
     let that = this
     setTimeout(() => {
    	plus.navigator.setFullscreen(true)
     }, 1200)
 },
```

### 页面取消全屏

```
onHide() {
	plus.navigator.setFullscreen(false)
},
```

