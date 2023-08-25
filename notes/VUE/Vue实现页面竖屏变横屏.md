# Vue 实现页面竖屏变横屏

设置不同的样式

```css
/* 竖屏状态下 */
@media screen and (orientation: portrait) {
}

/* 横屏状态下 */
@media screen and (orientation: landscape) {
}
```

eg:

```vue
<template>
  <div class="screen_full_page">
    <div>页面数据</div>
  </div>
</template>

<script>
export default {
  name: 'page',
  data() {
    return {}
  },
  mounted() {},
  beforeDestroy() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.screen_full_page {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(234, 234, 234, 0.5);
}

@media screen and (orientation: portrait) {
  // 竖屏状态下
  .screen_full_page {
    position: absolute;
    width: 100vh;
    height: 100vw;
    top: 0;
    left: 100vw;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    transform-origin: 0% 0%;
  }
}

@media screen and (orientation: landscape) {
  // 横屏状态下
  .screen_full_page {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
}
</style>
```
