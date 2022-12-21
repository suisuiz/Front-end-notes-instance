# 正则匹配 替换

案例：

把 字符串里的 `水果` 替换成 `fruit`

```
let str = '说起水果，苹果和橘子都属于水果。'
let a = '水果'
let newStr = str.replace(new RegExp(a, 'gm'), 'fruit')
console.log(newStr)
```

>  *g 全局匹配*	*m 执行多行匹配*
