# 解决 img 标签的白边

### 出现的原因：**由于img元素默认为inline元素，而inline元素的vertical-align属性的默认值为baseline文字基线对齐，正好图片底部的留白就是baseline和bottom之间的距离**



#### 方法1：img 元素的 css 添加 display:block; 将其变为块级元素，无默认基线问题

#### 方法2：img 元素的 css 添加 vertical-align:middle; 改变基线对齐方式

#### 方法3：img 父级 div 元素 css 添加 font-size:0; 清除缝隙

#### 方法4：父元素添加overflow属性

#### 方法5：设置图片的浮动或者定位属性，原理和方法1一样，将 img 变成块级元素



```
// 打开注释其中一个
div {
  width: 100px;
  height: 30px;
  // font-size: 0;
  // overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    // vertical-align: middle;
    // display: block;
  }
}

```

