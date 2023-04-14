# Vue 动态组件 切换

## 一、页面

### component 使用场景： 多个组件之间进行切换

```
<component :is="child_component"></component>
```

## 二、实现

#### 正常的组件引入大家都知道：

```
import InnerTab from "component/inner-tab";
```

### 动态 import 引入就是：

```
// 根据数据路径来定义

// 通过定义一个函数的方式来引入，传入一个参数，返回组件。
const loadComponent = (value) => import(`@/components/${value}`)

// 上面的简写如果有看不懂的，就看下面这个，就是定义一个函数！
const loadComponent  = (value) => {
  return import(`@/components/${value}`); 
}
```

#### 定义一个变量，监控这个变量的变化

```
data() {
     return {
        activePage:'child1', // 变量
        child_component:null  // 定义组件
    }
},
```

#### 当变量变化的时候：

```
// 监控某个变量的变化，来调用引入组件的函数
watch: {
    activePage:{
        handler(value){
            loadComponent(value).then( component => {
                this.child_component = component.default;
            } );
        },
        immediate: true
    }
},
```

#### 赋值

```
onSelect(item) {
    let that = this
    that.activePage = item.page
},
```

