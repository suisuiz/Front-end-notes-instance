# 如何获取`JS`对象的第一个属性的`键`或`值`

## 1、获取`jS`对象的`第一个属性`的`键`

```
var obj = { name: '张三', city: '北京' }
// 获取obj对象第一个属性的键（方法1）
console.log(Object.keys(obj)[0]) // name
// 获取obj对象第一个属性的键（方法2）
var fistKey = null
for (let key in obj) {
  fistKey = key
  break
}
console.log(fistKey) // name
```

## 2、获取`JS`对象的`第一个属性`的`值`

```
var obj = { name: '张三', city: '北京' }
// 获取obj对象第一个属性的值（方法1）
console.log(Object.values(obj)[0]) // 张三
// 获取obj对象第一个属性的值（方法2）
var val = null
for (let key in obj) {
  val = obj[key]
  break
}
console.log(val) // 张三
```



## 3、比较两个对象相等

```
let val = { a: 2 }
let old = { a: 2 }
if (Object.entries(val).toString() === Object.entries(old).toString()) {
  console.log('相等')
} else {
  console.log('不相等')
}
```

