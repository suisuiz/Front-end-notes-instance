# clip-path 的用法

```
https://blog.csdn.net/weixin_44116302/article/details/98882841

https://blog.csdn.net/sunwanfulove/article/details/127276525
```



```
clip-path 属性指定为下面列出的值的一个或多个值的组合。

取值
<clip-source>

用 url() 引用 SVG 的 <clipPath> 元素

<basic-shape>

一种形状，其大小和位置由 <geometry-box> 的值定义。如果没有指定 <geometry-box>，则将使用 border-box 用为参考框。取值可为以下值中的任意一个：

inset() (en-US)

定义一个 inset 矩形。

circle() (en-US)

定义一个圆形（使用一个半径和一个圆心位置）。

ellipse() (en-US)

定义一个椭圆（使用两个半径和一个圆心位置）。

polygon() (en-US)

定义一个多边形（使用一个 SVG 填充规则和一组顶点）。

path() (en-US)

定义一个任意形状（使用一个可选的 SVG 填充规则和一个 SVG 路径定义）。

<geometry-box>

如果同 <basic-shape> 一起声明，它将为基本形状提供相应的参考框盒。通过自定义，它将利用确定的盒子边缘包括任何形状边角（比如说，被 border-radius 定义的剪切路径）。几何框盒可以有以下的值中的一个：

margin-box

使用 margin box 作为引用框。

border-box

使用 border box 作为引用框。

padding-box

使用 padding box 作为引用框。

content-box

使用 content box 作为引用框。

fill-box

利用对象边界框（object bounding box）作为引用框。

stroke-box

使用笔触边界框（stroke bounding box）作为引用框。

view-box

使用最近的 SVG 视口（viewport）作为引用框。如果 viewBox 属性被指定来为元素创建 SVG 视口，引用框将会被定位在坐标系的原点，引用框位于由 viewBox 属性建立的坐标系的原点，引用框的尺寸用来设置 viewBox 属性的宽高值。

none

不创建剪切路径
```

```
 <div class="main">
   <div class="box">两个切角效果</div>
   <>
   <>
   <div class="box2">两个切角效果</div>
 </div>



.main {
  display: flex;
} 
.box {
   width: 37px;
   height: 150px;
   padding: 10px;
   color: white;
   background: #58a;
  clip-path: polygon(0% 10%, 100% 0%, 100% 100%, 0% 80%);

}
.box2 {
  width: 37px;
  height: 250px;
  padding: 10px;
  color: white;
  background: #58a;
  clip-path: polygon(0% 8%, 100% 0%, 100% 100%, 0% 95%);

}
```

