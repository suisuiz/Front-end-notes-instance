# uni-app 解决 gif 图片只渲染一遍.md

## 解决方案：结尾追个时间戳

```vue
<template>
  <view>
    <image class="gif" mode="aspectFill" :src="'/static/img/guide/' + gifSrc + '.gif?' + time"></image>
  </view>
</template>

<script>
export default {
  data() {
    return {
      gifSrc: '',
      time: ''
    }
  },

  mounted() {
    this.gifName = 'con1'
    this.time = new Date().getTime()
  }
}
</script>
```
