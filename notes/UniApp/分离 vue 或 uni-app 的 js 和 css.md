# 分离 vue 或者 uni-app 的 js 和 css



## 方法

挺简单的，就是利用下 `ES6` 的 `import` 和 `export`

`index.vue`  基础代码

```
<!--界面代码-->
<template>
  <div class="mockDataTestView">
    <div>内容</div>
    
    <!-- 引入的子组件 -->
    <doc-detail :doc-data="item" :page-obj="pageObj" from-type="chat"></doc-detail>
  </div>
</template>
 
<!--这里引入分离的业务js代码-->
<script>
import indexjs from './index.js'
import docDetail from '@/components/chat-room/item/DocDetail.vue'
export default {
  components: { docDetail },
  ...indexjs,
}
</script>
 
<!--这里引入分离的界面样式代码-->
<style lang="scss" scoped>
@import './index.scss';
</style>
```



## css正常写； index.js 基础代码

```
export default {
  name: 'mockDataTestView',
  data() {
    return {
 
    }
  },
  mounted() {
  },
  created() {},
  methods: {
  },
  watch: {
  }
}
```

拓展
上述是针对 `vue2、js、scss` 的方式，`vue3、typescript` 也是可以的