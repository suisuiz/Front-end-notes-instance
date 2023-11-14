# 解决 nvue 页面冒泡事件、点击穿透

> 目前官方未解决 .stop 阻止不了冒泡事件
> e.stopPropagation() 来阻止

```vue
<template>
  <view @click="parent($event)">
    <view @click="child($event)"> </view>
  </view>
</template>

<script>
export default {
  methods: {
    parent(e) {
      e.stopPropagation()
      console.log('父级')
    },
    child(e) {
      e.stopPropagation()
      console.log('子')
    }
  }
}
</script>
```
