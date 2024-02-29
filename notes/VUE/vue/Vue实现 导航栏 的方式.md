# Vue 实现 导航栏 的方式.md

> 利用 router-link 实现

```vue
<template>
  <div>
    <div class="xl-flex">
      <router-link class="title_change" to="/">
        <span class="titleSpan">首页</span>
      </router-link>
      <router-link class="title_change" to="/project-detail-all">
        <span class="titleSpan">项目</span>
      </router-link>
      <router-link class="title_change" to="/evaluate">
        <span class="titleSpan">个人</span>
      </router-link>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'headerVue'
}
</script>
```
