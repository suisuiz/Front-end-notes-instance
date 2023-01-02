# 将数组里的对象中相同的值提取出来进行分组，以该字段相同的为一组



```
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

