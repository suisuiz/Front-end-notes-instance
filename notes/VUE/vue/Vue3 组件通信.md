# `VUE3` 组件通信

## props和emit

*setup 函数可以接受两个参数, prop 和 context ，其中 context 可以解构出 emit 实例*

```vue
<template>
  <el-button @click="handle">点击测试</el-button>
  <div>我是父组件传过来的数据：{{name}}</div>
</template>

<script>
export default {
  name:"Son",
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  setup(props,{ emit }) {
    console.log(props.name) // => "lalal"
    function handle() {
      emit('handleClick', 'Vue3真棒')
    }
    return {
      handle
    }
  }
}
</script>
```

> *`Vue3` 中没有 this 的概念了，所以就不会有 `this.$emit` 存在，所以可以从 `setup` 传入的 `context` 结构出 `emit` 实例，从而派发事件给父组件*

```vue
<template>
  <Test name="lalal" @handleClick="myClick">点击</Test>
</template>

<script>
import Test from './index.vue'
export default {
  name:"father",
  components: { Test },
  setup() {
    function myClick(name) {
      console.log(name)
    }
    return {
      myClick
    }
  }
}
</script>
```





### [参考文档](https://mp.weixin.qq.com/s/0pH4YioQ1fYQTGBPRLVRwQ)