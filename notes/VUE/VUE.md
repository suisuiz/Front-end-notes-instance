# `VUE` 知识点 

## 一、路由 router

### 1、路由重定向

> 路由都在 `router.js` 里面 配置
>
> path 是路径  `redirect` 是重定向

```javascript
// 路径为 '/' 时候 路由重定向到 '/login'
{ path: '/', redirect: '/login' }
```

### 2、路由导航守卫

#### 如何没有登录直接通过URL访问到特定页面，需要重新导航到登录页面

> beforeEach 函数 三个形参  
>
> ​	to	将要访问的页面路径
>
> ​	from	从哪个路径 跳转来的
>
> ​	next	放行的函数

```javascript
// 为路由对象，添加 beforeEach 导航守卫
router.beforeEach((to, from, next) => {
	// 如果用户访问的登录页，直接放行
	if (to.path === '/login') return next()
	// 从 sessionStorage 中获取到保存的 token 值
	const tokenStr = window.sessionStorage.getItem('token')
	// 如果没有 token 强制跳转登录页
	if (!tokenStr) return next('/login')
	// 有 token ，else 直接放行跳转
	next()
})
```





## 二、发起请求：`axios` 

### 1、配置 `axios` 发起请求

#### ① 页面直接用

> a.vue

```javascript
// 引入axios
import axios from "axios";


// 调接口
let config = { headers: { 'Content-Type': 'application/json' } }
try {
	let { status, data } = await axios.post(`xxxxx`, {xx:xx}, config)
    
} catch (error) {
    console.error(error)
}
```

#### ② main.js 全局挂载

> `main.js` 里边挂载

```
// 引入封装的 axios
import api from "./api/index";
// 统一出口挂载Vue原型上   挂载axios
Vue.prototype.$api = api;
```



### 2、`axios` 拦截器

> 在 `main.js` 接口请求之前通过 `axios` 请求拦截器添加 token，保证拥有获取数据的权限

```javascript
axios.defaults.timeout = 30000
// axios 请求拦截 在 header 里加 token
axios.interceptors.request.use(
  config => {
    // console.log(config);
    let token = window.sessionStorage.getItem('token')
    if (token) config.headers.token = token
    config.headers.common = {
      xxx: 'xxxxxx'
    }
    return config;
  },
  (err) => {
    console.log('error' + err)
    return Promise.reject(err)
  }
);
```

###  3、`vue`项目中封装`axios`

> 参考文档   https://blog.csdn.net/qq_42597536/article/details/89675945?spm=1001.2014.3001.5501



## 三、其他

### 1、`Login` 登录成功操作

> 用户登录成功后在 `storage` 存下 token 然后跳转主页面

```javascript
// 可以存在 sessionStorage 因为 token 只是在当前网站打开期间生效，所以存在 sessionStorage里边
window.sessionStorage.setItem("token", res.data.token)
// 通过编程式导航跳转到主页，地址是 /home
this.$router.push("/home")
```



### 2、解决 `ESLint` 报错

> 在 `src` 目录同级 创建文件 `prettierrc`

![image-20210725131458340](C:\Users\wangy\AppData\Roaming\Typora\typora-user-images\image-20210725131458340.png)

> 双引号变单引号，去分号

![image-20210725131558916](C:\Users\wangy\AppData\Roaming\Typora\typora-user-images\image-20210725131558916.png)



### 3、vue项目中实现局部组件刷新

> 参考文档  https://blog.csdn.net/qq_42597536/article/details/89518241?spm=1001.2014.3001.5501



## 四、路由的跳转方式

### 1、router-link

```javascript
1. 不带参数
 
<router-link :to="{name:'home'}"> 
<router-link :to="{path:'/home'}"> //name,path都行, 建议用name  
// 注意：router-link中链接如果是'/'开始就是从根路由开始，如果开始不带'/'，则从当前路由开始。
 
 
 
2.带参数
 
<router-link :to="{name:'home', params: {id:1}}">  
 
// params传参数 (类似post)
// 路由配置 path: "/home/:id" 或者 path: "/home:id" 
// 不配置path ,第一次可请求,刷新页面id会消失
// 配置path,刷新页面id会保留
 
// html 取参  $route.params.id
// script 取参  this.$route.params.id
 
 
<router-link :to="{name:'home', query: {id:1}}"> 
 
// query传参数 (类似get,url后面会显示参数)
// 路由可不配置
 
// html 取参  $route.query.id
// script 取参  this.$route.query.id

```



### 2、`this.$router.push()` (函数里面调用)

```javascript
1.  不带参数
this.$router.push('/home')
this.$router.push({name:'home'})
this.$router.push({path:'/home'})


2. query传参 
this.$router.push({name:'home',query: {id:'1'}})
this.$router.push({path:'/home',query: {id:'1'}})

// html 取参  $route.query.id
// script 取参  this.$route.query.id


3. params传参
this.$router.push({name:'home',params: {id:'1'}})  // 只能用 name

// 路由配置 path: "/home/:id" 或者 path: "/home:id" ,
// 不配置path ,第一次可请求,刷新页面id会消失
// 配置path,刷新页面id会保留

// html 取参  $route.params.id
// script 取参  this.$route.params.id


4. query和params区别
query类似 get, 跳转之后页面 url后面会拼接参数,类似?id=1, 非重要性的可以这样传, 密码之类还是用params刷新页面id还在

params类似 post, 跳转之后页面 url后面不会拼接参数 , 但是刷新页面id 会消失
```



### 3、`this.$router.replace()` (用法同上,push)

### 4、`this.$router.go(n)`

> 返回第几层

### 区别

```javascript
this.$router.push
跳转到指定url路径，并想history栈中添加一个记录，点击后退会返回到上一个页面
this.$router.replace
跳转到指定url路径，但是history栈中不会有记录，点击返回会跳转到上上个页面 (就是直接替换了当前页面)

this.$router.go(n)
向前或者向后跳转n个页面，n可为正整数或负整数
```



## 五、组件通信



## 基础篇

> https://www.jianshu.com/p/f25d640eee84
