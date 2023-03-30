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

