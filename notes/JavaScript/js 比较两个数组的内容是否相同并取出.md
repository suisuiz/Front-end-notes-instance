# js 比较两个数组的内容是否相同并取出

### 方法一

```
// 找出相同的内容
var arr1 = [1, 2, 3] //原数组
var arr2 = [1, 2, 3, 4] //新数组
// 首先循环新数组
let list = arr2.filter((items) => {
  // 循环拿到新数组的值 使用includes函数去原数组中查找
  if (!arr1.includes(items)) {
    // 判断结构为true进入判断 并把内容返回给新数组
    return items
  }
})
console.log(list) //[4]
// 找出相同的内容把不等于“！”去除即可
```

### 方法二

```
let arr1 = [],
  arr2 = [1, 2, 3, 4, 5], //原数组
  arr3 = [7, 5, 8, 9] //新数组
// 同样是循环新数组，拿到每一个值
arr1 = arr3.filter((item) => {
  let arrList = arr2.map((it) => it)
  return !arrList.includes(item)
})
console.log(arr1)
```



### 解析

#### 1、includes()

```
方法用于判断字符串是否包含指定的子字符串如果找到返回true，否则返回false

语法:
string.includes(searchvalue, start)
```



|    参数     |            描述            |
| :---------: | :------------------------: |
| searchvalue |    必须，要查找的字符串    |
|    start    | 可选，设置那个位置开始查找 |

#### 2、filter

- filter创建一个新的数组，新数组的元素是通过检查指定数组中符合所有条件的元素
- filter不会对空数组进行检测
- filter不会改变原数组

```
arr.filter((item, index, arr) => {
  return item > num
}, thisValue)
```



|   参数    |                             描述                             |
| :-------: | :----------------------------------------------------------: |
|   item    |                       必须当前元素的值                       |
|   index   |                    可选。当前元素的索引值                    |
|    arr    |                 可选。当前元素属于的数组对象                 |
| thisValue | 可选。对象作为该执行回调时使用，传递给函数，用作 "this"的值。如果省略了 thisValue ，“this” 的值为 “undefined” |