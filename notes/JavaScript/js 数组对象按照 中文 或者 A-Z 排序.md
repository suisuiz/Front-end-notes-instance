# js 数组对象按照 中文 或者 A-Z 排序

例子

> A - Z 排序

```javascript
var myarray = [
  { letter: 'G', code: '00237' },
  { letter: 'B', code: '0064' },
  { letter: 'E', code: '00682' },
  { letter: 'D', code: '00674' },
  { letter: 'C', code: '00977' },
  { letter: 'F', code: '00683' },
  { letter: 'A', code: '0041' }
]

myarray = myarray.sort((a, b) => a.letter.localeCompare(b.letter))
console.log(myarray)
```

> 中文排序

```javascript
var textArr = [
  { name: '朋友们', letter: 3 },
  { name: '再见', letter: 2 },
  { name: '不错', letter: 2 },
  { name: '未来', letter: 2 }
]

textArr = textArr.sort((a, b) => a.name.localeCompare(b.name))
console.log(textArr)
```



> 普通排序

```javascript
var person = [
  { name: 'Qom', age: 12 },
  { name: 'Wob', age: 22 },
  { name: 'Ea', age: 5 },
  { name: 'Rony', age: 25 }
]

person = person.sort((a, b) => {
  return a.age - b.age
})
console.log(person)
```

