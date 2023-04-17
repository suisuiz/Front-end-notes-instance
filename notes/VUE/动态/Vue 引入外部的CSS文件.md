# Vue 引入外部的CSS文件

在项目的src文件下，新建一个style文件夹，存放css文件。

### 1、全局引入

将外部的css文件放到style文件下，引入外部文件只需在main.js文件中

```
import '@/style/reset.css'
```

### 2、局部引入相对路径

```
<style scoped>
  @import '../../assets/iconfont/iconfont.css';这个分号一定要写，要不会报错
</style>
```

### 3、局部引入绝对路径

```
<style scoped>
 @import '@/styles/scroll-bar.scss';这个分号一定要写，要不会报错
</style>
```

使用 @import 引入样式文件，就算加 scoped，其它没有引入的模块还是可以访问到你的样式，如果某个组件的类名一致，则就会被污染到。
如果不想被污染，修改引入方式

```
<style src="@/style/reset.css"  scoped></style>
```

要是在写新的样式，要重新写一个新的`style`标签

```
<style src="@/style/reset.css"  scoped></style>
<style src="@/style/page.scss" lang="scss" scoped></style>

<style lang="scss" scoped>
  // 新的css样式
</style>
```

