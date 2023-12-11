## uni-app iOS 端禁用左滑返回手势

### 一、单个页面禁用

#### 1.在 page.json 页面中找到对应页面配置中添加

> "disableSwipeBack": "true",
> "popGesture": "none"

```json
"style": {
  "navigationBarTitleText": "试听详情",
  "navigationStyle": "custom",
  "disableSwipeBack": "true",
  "app-plus": {
    "popGesture": "none"
  }
}
```

#### 2.再去对应页面 onLoad 方法中添加

// ios 侧滑返回功能（关闭）

```javascript
plus.webview.currentWebview().setStyle({
  popGesture: 'none'
})
```

即可处理单个页面左滑禁用

### 二、整个项目禁用

在`manifest.json`页面中添加 `"popGesture": "none"`

```json
"app-plus" : {
  "popGesture": "none", // 侧滑返回功能
}
```
