# `nvue`下设置背景图不起作用

目前暂不支持，解决方案： 节点下放个 `<image>`



```vue
<view style="position: relative; width: 200px; height: 100px;">  
    <image style="position: absolute; left: 0; top: 0; right: 0; bottom: 0;" src="/static/logo.png"></image>  
</view>
```

