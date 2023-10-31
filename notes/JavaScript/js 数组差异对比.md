# js 数组差异对比

例子

> 对比数组，提取出增加的内容和删除的内容

```javascript
let olds = ['111111111111111', '222222222222222', '333333333333333', '444444444444444']
let news = ['555555555555555', '222222222222222', '666666666666666']
let resObj = {
  add: [],
  del: []
}

cenObj = {}
for (let i = 0; i < olds.length; i++) {
  cenObj[olds[i]] = olds[i]
}
for (let j = 0; j < news.length; j++) {
  if (!cenObj[news[j]]) {
    resObj.add.push(news[j])
  } else {
    delete cenObj[news[j]]
  }
}
for (k in cenObj) {
  resObj.del.push(k)
}

console.log(resObj)
```

其他案例

> https://blog.csdn.net/weixin_44982333/article/details/127566177
> https://blog.csdn.net/qq_15509267/article/details/84557303
