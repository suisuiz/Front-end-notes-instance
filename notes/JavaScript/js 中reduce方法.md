# reduce 实例

#### 计算总数

```
let products = [
  { price: 43, count: 6, checked: false, name: '苹果' },
  { price: 65, count: 15, checked: false, name: '香蕉' },
  { price: 10, count: 7, checked: true, name: '橙子' },
  { price: 45, count: 1, checked: true, name: '柚子' },
  { price: 56, count: 2, checked: true, name: '火龙果' }
]
let countPrice = products.reduce((total, value) => {
  return total + value.price * value.count * value.checked
}, 0)
console.log(countPrice) //227
```

#### 购物车算数量

```
totalNum() {
    let num = this.cartlist.reduce((total, value) => {
    return total + value.car_num
    }, 0)
    return num
}
```

#### 购物车算总金额

```
totalPrice() {
    let price = this.cartlist.reduce((total, value) => {
    return total + value.info.price * value.car_num
    }, 0)
    return price.toFixed(2)
},
```





> reduce()方法可以搞定的东西，for循环，或者forEach方法有时候也可以搞定，那为啥要用reduce()？这个问题，之前我也想过，要说原因还真找不到，唯一能找到的是：通往成功的道路有很多，但是总有一条路是最捷径的，亦或许reduce()逼格更高...

### 1、语法

```
arr.reduce(callback,[initialValue])
```

reduce 为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素，接受四个参数：初始值（或者上一次回调函数的返回值），当前元素值，当前索引，调用 reduce 的数组。

```
callback （执行数组中每个值的函数，包含四个参数）
 
    1、previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
    2、currentValue （数组中当前被处理的元素）
    3、index （当前元素在数组中的索引）
    4、array （调用 reduce 的数组）
 
initialValue （作为第一次调用 callback 的第一个参数。）
```

### 2、实例解析 `initialValue` 参数

先看第一个例子：

```
var arr = [1, 2, 3, 4];
var sum = arr.reduce(function(prev, cur, index, arr) {
    console.log(prev, cur, index);
    return prev + cur;
})
console.log(arr, sum);
```

> 打印结果：
> 1 2 1
> 3 3 2
> 6 4 3
> [1, 2, 3, 4] 10

这里可以看出，上面的例子index是从1开始的，第一次的prev的值是数组的第一个值。数组长度是4，但是reduce函数循环3次。

再看第二个例子：

```
var  arr = [1, 2, 3, 4];
var sum = arr.reduce(function(prev, cur, index, arr) {
    console.log(prev, cur, index);
    return prev + cur;
}，0) //注意这里设置了初始值
console.log(arr, sum);
```

> 打印结果：
> 0 1 0
> 1 2 1
> 3 3 2
> 6 4 3
> [1, 2, 3, 4] 10

这个例子index是从0开始的，第一次的prev的值是我们设置的初始值0，数组长度是4，reduce函数循环4次。

结论：`如果没有提供initialValue，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供initialValue，从索引0开始。`

注意：如果这个数组为空，运用reduce是什么情况？

```
var  arr = [];
var sum = arr.reduce(function(prev, cur, index, arr) {
    console.log(prev, cur, index);
    return prev + cur;
})
//报错，"TypeError: Reduce of empty array with no initial value"
```

但是要是我们设置了初始值就不会报错，如下：

```
var  arr = [];
var sum = arr.reduce(function(prev, cur, index, arr) {
    console.log(prev, cur, index);
    return prev + cur;
}，0)
console.log(arr, sum); // [] 0
```

**所以一般来说我们提供初始值通常更安全**

### 3、reduce的简单用法

当然最简单的就是我们常用的数组求和，求乘积了。

```
var  arr = [1, 2, 3, 4];
var sum = arr.reduce((x,y)=>x+y)
var mul = arr.reduce((x,y)=>x*y)
console.log( sum ); //求和，10
console.log( mul ); //求乘积，24
```

### 4、reduce的高级用法

#### （1）计算数组中每个元素出现的次数

```
let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
 
let nameNum = names.reduce((pre,cur)=>{
  if(cur in pre){
    pre[cur]++
  }else{
    pre[cur] = 1 
  }
  return pre
},{})
console.log(nameNum); //{Alice: 2, Bob: 1, Tiff: 1, Bruce: 1}
```

#### （2）数组去重

```
let arr = [1,2,3,4,4,1]
let newArr = arr.reduce((pre,cur)=>{
    if(!pre.includes(cur)){
      return pre.concat(cur)
    }else{
      return pre
    }
},[])
console.log(newArr);// [1, 2, 3, 4]
```

#### （3）将二维数组转化为一维

```
let arr = [[0, 1], [2, 3], [4, 5]]
let newArr = arr.reduce((pre,cur)=>{
    return pre.concat(cur)
},[])
console.log(newArr); // [0, 1, 2, 3, 4, 5]
```

#### （4）将多维数组转化为一维

```
let arr = [[0, 1], [2, 3], [4,[5,6,7]]]
const newArr = function(arr){
   return arr.reduce((pre,cur)=>pre.concat(Array.isArray(cur)?newArr(cur):cur),[])
}
console.log(newArr(arr)); //[0, 1, 2, 3, 4, 5, 6, 7]
```

#### （5）对象里的属性求和

```
var result = [
    {
        subject: 'math',
        score: 10
    },
    {
        subject: 'chinese',
        score: 20
    },
    {
        subject: 'english',
        score: 30
    }
];
 
var sum = result.reduce(function(prev, cur) {
    return cur.score + prev;
}, 0);
console.log(sum) //60
```

