# Vue父组件传子组件数据中，Vue监听不到数据改变



## 一、正常监听

#### 父组件

```
<template>
  <div>
    <button @click="handleSumbit">点击数值改变</button>
    <child :testArray="testArray"></child>
  </div>
</template>

<script>
import Vue from 'vue'
import child from './child.vue'
export default {
  components: { child },
  data() {
    return {
      testArray: [1, 2, 3, 4, 5, 6, 7]
    }
  },
  methods: {
    handleSumbit() {
      this.testArray.push(8)
    }
  }
}
</script>
```

#### 子组件

```
<template>
  <div>{{ testArray_ }}{{ testArray_.length }}</div>
</template>

<script>
export default {
  props: {
    testArray: {
      type: Array
    }
  },
  data() {
    return {
      testArray_: []
    }
  },
  watch: {
    // 普通监听 直接获取
    xxx(val) {
      console.log(val)
      this.xxx = val
    },
    // 普通监听 新旧数据
    xxx(val, old) {
      // console.log('刷新', val)
      if (!(Object.entries(val).toString() === Object.entries(old).toString())) {
        this.xxx(val)
      }
    },
    // 深度监听
    testArray: {
      handler(newData) {
        this.testArray_ = newData
      },
      // 初次监听即执行、该回调将会在侦听开始之后被立即调用
      immediate: true,
      // 深度监听、该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
      deep: true
    }
  }
}
</script>
```



## 二、监听不到

> 官方文档说明（引用来自官网）
> 检测变化的注意事项
>
> 由于 `JavaScript` 的限制，`Vue` 不能检测数组和对象的变化。尽管如此我们还是有一些办法来回避这些限制并保证它们的响应性。
>
> 对象：`Vue` 无法检测 `property` 的添加或移除。
>
> 数组：
>
> 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
> 当你修改数组的长度时，例如：`vm.items.length = newLength`

### 用 `Vue.set`  或者  `this.$set`

### 1、对象

#### 子组件：

```
<template>
  <div>{{ testArray_ }}</div>
</template>

<script>
export default {
  props: {
    testArray: {
      type: Object
    }
  },
  data() {
    return {
      testArray_: {}
    }
  },
  watch: {
    testArray: {
      handler(newData) {
        this.testArray_ = newData
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
```

#### 父组件

```
<template>
  <div>
    <button @click="handleSumbit">点击数值改变</button>
    <child :testArray="testArray"></child>
  </div>
</template>

<script>
import Vue from 'vue'
import child from './child.vue'
export default {
  components: { child },
  data() {
    return {
      testArray: { name: 'll', sex: '女' }
    }
  },
  methods: {
    handleSumbit() {
      // 监听不到
      // this.testArray.like = "打游戏"
      // 监听到
      Vue.set(this.testArray, 'like', '打游戏')
      // this.$set(this.testArray, 'like', '打游戏')
    }
  }
}
</script>
```

### 2、数组

#### 子组件：

```
<template>
  <div>{{ testArray_ }}{{ testArray_.length }}</div>
</template>

<script>
export default {
  props: {
    testArray: {
      type: Array
    }
  },
  data() {
    return {
      testArray_: []
    }
  },
  watch: {
    testArray: {
      handler(newData) {
        this.testArray_ = newData
      },
      // 该回调将会在侦听开始之后被立即调用
      immediate: true,
      //该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
      deep: true
    }
  }
}
</script>
```

#### 父组件

```
<template>
  <div>
    <button @click="handleSumbit">点击数值改变</button>
    <child :testArray="testArray"></child>
  </div>
</template>

<script>
import Vue from 'vue'
import child from './child.vue'
export default {
  components: { child },
  data() {
    return {
      testArray: [1, 2, 3, 4, 5, 6, 7]
    }
  },
  methods: {
    handleSumbit() {
      // 监听不到
      // this.testArray[2] =100
      // 修改后可以监听到
      Vue.set(this.testArray, 2, 100)
      // this.$set(this.testArray, 2, 100)
    }
  }
}
</script>
```

