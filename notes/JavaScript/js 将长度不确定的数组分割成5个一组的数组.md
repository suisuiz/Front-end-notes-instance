# js 将长度不确定的数组分割成5个一组的数组

### 定义

```
let activeIndex = 0
let sliceLength = 5
let allImgList = ['法国', '澳大利亚', '智利', '新西兰', '西班牙', '加拿大', '阿根廷', '美国', '巴基斯坦', '朝鲜', '波多黎各', '英国', '比利时', '德国', '意大利', '意大利']
for (let index = 0; index < allImgList.length; index++) {
  const element = allImgList[index]
  allImgList[index] = { index, img: element }
}
console.log(allImgList.length)
```

### 方案 1

```
// 方案 1
let result1 = []
for (let i = 0, len = allImgList.length; i < len; i += sliceLength) {
  result1.push(allImgList.slice(i, i + sliceLength))
}
console.log(result1)
```

### 方案2

```
// 方案2
let arr = []
let result2 = allImgList.reduce(function (pre, item, index, allImgList) {
  let begin = index * sliceLength
  let end = begin + sliceLength
  let res = allImgList.slice(begin, end)
  if (res.length != 0) arr[index] = res
  return arr
}, [])
console.log(result2)
```

### 结果

```
let activeArrIndex = 0
let selsctIndex = activeIndex + 1
activeArrIndex = Math.ceil(selsctIndex / sliceLength)
console.log(activeArrIndex)

console.log(result1[activeArrIndex - 1])
console.log(result2[activeArrIndex - 1])
```

### 知识点

>reduce方法：
>reduce(function(pre,item,index,arr){},第一次回调函数初始值)
>参数：回调函数和第一次回调函数的初始值
>回调函数参数：
>pre 上一次回调函数执行的返回值
>item 数组元素
>index 数组下标
>arr 数组
>1.如果没有第二个参数，且回调函数没有返回值。
>第一次pre为数组的第一个元素，item为数组的第二个元素；第二次pre为undefined，item为数组第三个元素…
>2.如果没有第二个参数，但是有返回值。
>第一次pre为数组的第一个元素，item为数组的第二个元素；第二次pre为第一次回调函数返回值，item为数组第三个元素
>3.如果有第二个参数，也回调函数有返回值。
>第一次pre为第二个参数，item为数组第一个元素；第二次pre为第一次回调函数的返回值，item为数组的第二次元素…



> slice方法
> 含义：从beginIndex下标开始，截取number个元素组成新数组。【不会改变原数组】
> 参数：
> 一个参数：从beginIndex截取到最后一个元素
> 两个参数：beginIndex[开始数组的下标]，number[元素个数]
> 返回值：截取出的新数组，如果没有截取到元素则返回空数组。