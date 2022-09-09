#  Vuex 内容

> Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 [devtools extension](https://github.com/vuejs/vue-devtools)，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能

```javascript
new Vue({
  // state
  data () {
    return {
      count: 0
    }
  },
  // view
  template: `
    <div>{{ count }}</div>
  `,
  // actions
  methods: {
    increment () {
      this.count++
    }
  }
})
```

这个状态自管理应用包含以下几个部分：

- **state**，驱动应用的数据源；
- **view**，以声明方式将 **state** 映射到视图；
- **actions**，响应在 **view** 上的用户输入导致的状态变化。



## store.commit 和 store.dispatch 区别

```javascript
this.$store.commit('loginStatus', 1);

this.$store.dispatch('isLogin', true);
```

### 规范使用方式

```javascript
// 以载荷形式
store.commit('increment'，{
  amount: 10   //这是额外的参数
})

// 或者使用对象风格的提交方式
store.commit({
  type: 'increment',
  amount: 10   //这是额外的参数
})
```

### 主要区别：

#### **dispatch**：含有异步操作，数据提交至 **actions** ，可用于向后台提交数据

```javascript
this.$store.dispatch('isLogin', true);
```

#### **commit**：同步操作，数据提交至 **mutations** ，可用于读取用户信息写到缓存里

##### dispatch可以调用vuex中的方法，异步从后台获取数据

```javascript
this.$store.commit('loginStatus', 1);
```





## Vuex  基础

> https://www.jianshu.com/p/b2b634c77502
>
> https://gitee.com/beautzy/mooc/blob/master/mooc-cxy/src/components/pages/Login.vue
