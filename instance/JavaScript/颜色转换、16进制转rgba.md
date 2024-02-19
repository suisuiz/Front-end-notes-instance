# 颜色转换、16 进制转 rgba

```javascript
// 颜色转换、16进制转rgba
function hexToRgb(hex, alpha) {
  var color = hex.replace('#', '')
  // 分割成红、绿、蓝三部分的16进制颜色值
  var red = parseInt(color.substring(0, 2), 16)
  var green = parseInt(color.substring(2, 4), 16)
  var blue = parseInt(color.substring(4, 6), 16)
  if (alpha) return `rgba(${red}, ${green}, ${blue}, ${alpha})`
  else return `rgb(${red}, ${green}, ${blue})`
}

// hexToRgb(颜色16进制指, 透明度)
console.log(hexToRgb('#05ACB4', 0.1)) // rgba(5, 172, 180, 0.1)
```
