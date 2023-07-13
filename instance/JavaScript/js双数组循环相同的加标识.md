# js 双数组循环相同的加标识 为 true

```javascript
let aa = [{ contentid: 1 }, { contentid: 2 }, { contentid: 5 }]
let bb = [
  { value: 1, contentid: 1, checked: false },
  { value: 2, contentid: 2, checked: false },
  { value: 3, contentid: 3, checked: false },
  { value: 4, contentid: 4, checked: false },
  { value: 5, contentid: 5, checked: false }
]

let obj = bb.filter((item) => {
  return aa.some((its) => its.contentid === item.contentid)
})
obj.map((item) => {
  // this.$set(item, 'checked', true)
  item.checked = true
})
console.log(aa)
console.log(bb)
console.log(obj)


```
