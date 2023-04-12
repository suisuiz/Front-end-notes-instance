# `VUE2` 组件通信

> **父传子、子传父、兄弟通信**

## 一、父子传值

### 1、父传子

> 父组件是通过 `props` 属性给子组件通信的
> 数据是单向流动 父—>子 （子组件中修改 `props` 数据，是无效的，会有一个红色警告）

#### 父组件	`:xxx='值'`

```vue
<template>
	<div class="parent">
        <!-- 父向子组件传值 show  -->
        <!-- 子组件绑定 show 变量  -->
        <topMask :show="isShow"></topMask>
    </div>
</template>
 <script>
 import topMask from './topMask' //引入子组件
 export default {
   name: 'parent',
   components: {
       topMask
   },
   data () {
     return {
       msg: '父组件',
     }
   },
 }
 </script>
```

#### 子组件接收	`props[xxx]`

> 子组件不能直接修改 props 值 需要处理   1、赋值  2、计算属性
>
> ```vue
> 1、
> props: ['childCom']
> 
> 2、
> props: {
>  	childCom: String //这里指定了字符串类型，如果类型不一致会警告的哦
> }
> 
> 3、
> props: {
>      childCom: {
>          type: String,
>          default: '默认值' 
>      }
> }
> ```

```vue
<script>
	export default {
        // 接收父组件传值
        props: {
            // 接收的值与父一致 show
            show: {
                type: Boolean,
                default: true
            }
        },
		data() {
			return {
                // 处理后可修改
				isShow: this.show
			}
		},
        watch:{
            // 监听数据变更
            show(newVal){
                this.isShow = newVal
            }
        },
		methods: {
			
		}
	}
</script>
```



### 2、子传父

> 通过绑定事件然后及 `$emit` 传值

#### 子组件	`$emit`

> 子组件通过 `$emit` 触发父组件上的自定义事件，发送参数

```vue
<template>
	<button @click='xxx'>点击传值</button>
</template>

<script>
	export default {
		methods: {
			// 点击事件
            xxx() {
                // 通过 $emit 向父传值，事件 childTap 需要和父对应
                this.$emit('childTap', false)
            }
		}
	}
</script>
```



#### 父组件	`@xxx='xxx($event)'`

> 父组件通过绑定自定义事件，接受子组件传递过来的参数

```vue
<template>
	<!-- 父接通过 $event 接收子组件传值， childTap 事件对应  -->
	<topMask @childTap="childTap($event)"></topMask>
</template>

<script>
	export default {
		methods: {
			// 接收传值
            childTap(e) {
                console.log(e);
            }
		}
	}
</script>
```



## 二、非父子传参 （事件总线）

假设你有两个 `Vue` 组件需要通信： A 和 B ，A组件按钮上面绑定了点击事件，发送一则消息，B组件接收。

### **1. 初始化，全局创建$bus**

直接在项目中的 main.js 初始化 $bus :

```javascript
// main.js
window.$bus = new Vue();
```

注意，这种方式初始化一个 `全局的事件总线` 。

### **2. 发送事件**

`$bus.$emit("aMsg", '来自A页面的消息');`

```vue
<!-- A.vue -->
<template>
   <button @click="sendMsg()">-</button>
</template>

<script> 
//import $bus from "../bus.js";
export default {
 methods: {
   sendMsg() {
     $bus.$emit("aMsg", '来自A页面的消息');
   }
 }
}; 
</script>
```

接下来，我们需要在 B页面 中接收这则消息。

### **3. 接收事件**

`$bus.$on("事件名",callback)`

```vue
<!-- IncrementCount.vue -->
<template>
 <p>{{msg}}</p>
</template>

<script> 
//import $bus  from "../bus.js";
export default {
 data(){
   return {
     msg: ''
   }
 },
 mounted() {
   $bus.$on("aMsg", (msg) => {
     // A发送来的消息
     this.msg = msg;
   });
 }
};
</script>
```



## 三、扩展

### **事件总线推荐下面写法:**

集中式的事件中间件就是 Bus。我习惯将bus定义到全局：
`app.js`

```javascript
var eventBus = {
    install(Vue,options) {
        Vue.prototype.$bus = vue
    }
};
Vue.use(eventBus);
```

然后在组件中，可以使用`$emit， $on， $off` 分别来`分发、监听、取消监听事件`：
**分发事件的组件**

```vue
// ...
methods: {
  todo: function () {
    this.$bus.$emit('todoSth', params);  //params是传递的参数
    //...
  }
}
```

**监听的组件**

```vue
// ...
created() {
  this.$bus.$on('todoSth', (params) => {  //获取传递的参数并进行操作
      //todo something
  })
},
// 最好在组件销毁前
// 清除事件监听
beforeDestroy () {
  this.$bus.$off('todoSth');
}
```

如果需要监听多个组件，只需要更改 `bus` 的 `eventName:`

```vue
// ...
created() {
  this.$bus.$on('firstTodo', this.firstTodo);
  this.$bus.$on('secondTodo', this.secondTodo);
},
// 清除事件监听
beforeDestroy () {
  this.$bus.$off('firstTodo', this.firstTodo);
  this.$bus.$off('secondTodo', this.secondTodo);
}
```



## 四、直接访问组件实例

### parent/children

- 子组件通过 $parent 获得父组件实例
- 父组件通过 $children 获得子组件实例数组

```vue
<template>
  <div>我是子组件</div>
</template>

<script>
export default{
  name:"Son",
  data(){
    return{
      sonTitle: '我是子组件的数据'
    }
  },
  methods:{
    sonHandle(){
      console.log('我是子组件的方法')
    }
  },
  created(){
    console.log(this.$parent)
    console.log(this.$parent.fatherTitle) // => 我是父组件的数据
    this.$parent.fantherHandle() // => 我是父组件的方法
  }
}
</script>
```

```vue

<template>
  <div>
    <Son>我是父组件</Son>
  </div>
</template>

<script>
import Son from './son.vue'

export default{
  name: 'father',
  components:{
    Son
  },
  data(){
    return{
      fatherTitle: '我是父组件的数据'
    }
  },
  methods:{
    fantherHandle(){
      console.log('我是父组件的方法')
    }
  },
  mounted(){
    console.log(this.$children)
    console.log(this.$children[0].sonTitle) // => 我是子组件的数据
    this.$children[0].sonHandle() // => 我是子组件的方法
  }
}
</script>
```

