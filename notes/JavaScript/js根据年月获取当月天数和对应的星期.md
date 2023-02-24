# js根据年月获取当月天数和对应的星期

```
let date = new Date()
let year = date.getFullYear() // 获取完整的年份(4位)
let month = date.getMonth() + 1 // 获取当前月份(0-11,0代表1月)
let dataList = []

function getMonthDays(year, month) {
  let stratDate = new Date(year, month - 1, 1),
    endData = new Date(year, month, 1)
  let days = (endData - stratDate) / (1000 * 60 * 60 * 24)
  let list = []
  for (let i = 1; i <= days; i++) {
    // const day = i
    const day = i > 9 ? i : '0' + i
    // const date = month + '-' + day
    const week =
      new Date(month + '/' + i + '/' + year).getDay() == 0
        ? '周日'
        : new Date(month + '/' + i + '/' + year).getDay() == 1
        ? '周一'
        : new Date(month + '/' + i + '/' + year).getDay() == 2
        ? '周二'
        : new Date(month + '/' + i + '/' + year).getDay() == 3
        ? '周三'
        : new Date(month + '/' + i + '/' + year).getDay() == 4
        ? '周四'
        : new Date(month + '/' + i + '/' + year).getDay() == 5
        ? '周五'
        : new Date(month + '/' + i + '/' + year).getDay() == 6
        ? '周六'
        : ''
    list.push({
      // date,
      week,
      day
    })
  }
  dataList = list
  return dataList
}
console.log(getMonthDays(2023, 1))
```

