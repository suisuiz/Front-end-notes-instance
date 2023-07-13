# 将数组里的对象中相同的值提取出来进行分组，以该字段相同的为一组

### 方法一、

```javascript
let _set = new Set()
let _arr = []

let oldArr = [
  {
    name: '123456',
    id: 1,
    roomid: 1,
    letter: '#'
  },
  {
    name: 'H',
    id: 2,
    roomid: 2,
    letter: 'H'
  },
  {
    name: '158325',
    id: 3,
    roomid: 3,
    letter: '#'
  },
  {
    name: '好',
    id: 4,
    roomid: 4,
    letter: 'H'
  }
]

oldArr.forEach((olditem) => {
  _set.add(olditem.letter)
})
;[..._set].forEach((key) => {
  _arr.push({
    letter: key,
    list: []
  })
})

<!-- letter 为比较的值 -->
_arr.forEach((item) => {
  oldArr.forEach((olditem) => {
    if (olditem.letter == item.letter) {
      delete olditem.letter
      item.list.push(olditem)
    }
  })
})

console.log(' oldArr', oldArr)
console.log(' _arr', _arr)
```

### 方法二、

```javascript
let oldArr = [
  {
    category: '咖啡',
    contentid: 'f5f3054e938c586f2a33d63e6d8575e7',
    info: { price: '20' },
    name: '美式1'
  },
  {
    category: '零食',
    contentid: 'f5f3054e938c586f2a33d63e623475e0',
    info: { price: '20' },
    name: '曲奇'
  },
  {
    category: '零食',
    contentid: 'f5f3054e938c586f2a33d63e623475e1',
    info: { price: '20' },
    name: '曲奇2'
  },
  {
    category: '咖啡',
    contentid: 'f5f3054e938c586f2a33d63e6d8575e8',
    info: { price: '20' },
    name: '美式2'
  },
  {
    category: '零食',
    contentid: 'f5f3054e938c586f2a33d63e623475e2',
    info: { price: '20' },
    name: '曲奇3'
  }
]

function classify(arr, name, key, key2) {
  let map = {}
  let myArr = []
  for (var i = 0; i < arr.length; i++) {
    if (!map[arr[i][name]]) {
      myArr.push({
        [key]: arr[i][name],
        [key2]: [arr[i]]
      })
      map[arr[i][name]] = arr[i]
    } else {
      for (var j = 0; j < myArr.length; j++) {
        if (arr[i][name] === myArr[j][key]) {
          myArr[j][key2].push(arr[i])
          break
        }
      }
    }
  }
  return myArr
}
/*
    oldArr 原数组
    'category' 提取的key
    'text'  动态的key1
    'list'  动态的key2
*/
let goods = classify(oldArr, 'category', 'text', 'list')
console.log(' oldArr', oldArr)
console.log(' _arr', goods)
```
