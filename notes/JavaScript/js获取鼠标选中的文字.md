## js 获取鼠标选中的文字

相关链接

<!-- 案例 -->

https://blog.csdn.net/wulex/article/details/96573684

<!-- 文档 -->

https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage
https://developer.mozilla.org/zh-CN/docs/Web/API/Selection
https://developer.mozilla.org/zh-CN/docs/Web/API/Range

```
<div @mouseup="mouseup">可选择的内容</div>
```

```javascript
// 鼠标抬起时触发
mouseup(e){
  const selecText = window.getSelection()
  if (selecText.toString()) {
    // console.log('e', e)
    // console.log('X', e.clientX, 'Y', e.clientY)

    console.log(selecText)
    console.log(selecText.rangeCount)
    console.log(selecText.getRangeAt(0))
    // this.selecText = selecText.toString()
    console.log(selecText.toString())
    var activeTextarea = selecText.activeElement
    console.log(activeTextarea)

    const anchorNode = selecText.anchorNode
    console.log(anchorNode)
    console.log(anchorNode.parentNode)
    console.log(anchorNode.parentElement)

    let range = null
    if (selecText.rangeCount && selecText.getRangeAt) {
      range = selecText.getRangeAt(0)
    }
    // console.dir(document)

    // 开启文档编辑
    document.designMode = 'on'
    if (range) {
      selecText.removeAllRanges()
      selecText.addRange(range)
    }
    // document.execCommand('BackColor', false, '#f8e6ab')
    // document.execCommand('BackColor', false, '#e1eaff')
    // document.execCommand('underline')
    document.designMode = 'off'
    // 去掉默认选中的蓝色
    window.getSelection().empty()
    // window.getSelection().removeAllRanges()
  }
}
```
