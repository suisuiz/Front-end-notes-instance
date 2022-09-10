# CSS

## CSS 样式

```
// 显示x行内容
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
word-break: break-all;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;

// 英文字母换行
word-wrap: break-word;
word-break: break-all;

// 文字换行
white-space: pre-wrap;
```



## CSS 变量

```css
:root {
    titleColor: #fff;
}

.title {
    color: var(--titleColor);
}
```



## CSS 阴影 box-shadow

```css
box-shadow: offset-x offset-y blur-radius spread-radius color;

  offset-x 阴影的水平偏移量；
  offset-y 阴影的垂直偏移量；
  blur-radius 模糊半径；	--可选
  spread-radius 阴影扩展半径；  --可选
  color

box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
```



## CSS text-transform  给文本添加效果

```
text-transform: uppercase;
```

|      值      |  效果  |                结果                |
| :----------: | :----: | :--------------------------------: |
| `lowercase`  |  小写  |           "transform me"           |
| `uppercase`  |  大写  |           "TRANSFORM ME"           |
| `capitalize` |  驼峰  |           "Transform Me"           |
|  `initial`   |  默认  |             使用默认值             |
|  `inherit`   | 父元素 | 使用父元素的 `text-transform` 值。 |
|    `none`    | 不改变 |      **Default:**不改变文字。      |



## CSS 线性渐变

```css
background: linear-gradient(gradient_direction, color 1, color 2, color 3, ...);

第一个参数指定了颜色过渡的方向——它的值是角度，90deg 表示垂直渐变（从左到右），45deg 表示沿对角线渐变（从左下方到右上方）。 
其他参数指定了渐变颜色的顺序：
background: linear-gradient(90deg, red, yellow, rgb(204, 204, 255));
```

### CSS 线性渐变创建条纹元素

```css
repeating-linear-gradient() 函数和 linear-gradient() 很像，主要区别是前者会重复指定的渐变。 repeating-linear-gradient() 有很多参数

角度就是渐变的方向。 色标代表渐变颜色及发生渐变的位置，由百分比或者像素值表示。

在代码编辑器的例子里，渐变开始于 0 像素位置的 yellow，然后过渡到距离开始位置 40 像素的 blue。 由于下一个渐变颜色的起始位置也是 40 像素，所以颜色直接渐变成第三个颜色值 green，然后过渡到距离开始位置 80 像素的 red。

0px [yellow -- blend -- blue] 40px [green -- blend -- red] 80px
如果每对起止渐变颜色值的颜色都是相同的，由于是在两个相同的颜色间过渡，那么中间的过渡色也为同色，接着就是同色的过渡色和下一个起止颜色，最终产生的效果就是条纹。
使用 repeating-linear-gradient() 函数创建一个渐变角度为 45deg 的条纹，然后设置第一对渐变颜色为 yellow，第二对渐变颜色为 black。

background: repeating-linear-gradient(90deg, yellow 0px, blue 40px, green 40px, red 80px);
```



## CSS transform 

### 1、scale 属性可以更改元素的大小

```css
scale 大小缩放到原来的两倍
div {
    transform: scale(2);
}
配合 hover	悬停时缩放
div:hover {
    transform: scale(2);
}
```

### 2、skewX 属性沿X轴倾斜元素	3、skewY 属性沿Y轴倾斜元素

```css
skewX 沿着X轴翻转指定角度;			skewY 沿着Y轴翻转指定角度;
transform: skewX(-45deg);
效果类似平行四边形状
```

### 3、案例

[transform 链接](https://c.runoob.com/codedemo/3391)



## CSS animation 动画

### 属性介绍

|          属性名           |                 值                 |                    介绍                    |
| :-----------------------: | :--------------------------------: | :----------------------------------------: |
|      animation-name       |                name                | 设置动画的名称，在 `@keyframes` 里的名称。 |
|    animation-duration     |                3 s                 |            设置动画所花费的时间            |
|    animation-fill-mode    |              forwards              | 指定了在动画结束时元素的样式 forwards 高亮 |
| animation-iteration-count |          数字 / infinite           |  数字是次数，infinite 代表了动画永不停止   |
| animation-timing-function | ease / ease-out / ease-in / linear |            来定义动画的速度曲线            |

> **animation-timing-function**  默认值是 `ease`，动画以低速开始，然后加快，在结束前变慢。 其它常用的值包括 `ease-out`：动画以高速开始，以低速结束；`ease-in`，动画以低速开始，以高速结束；`linear`：动画从头到尾的速度是相同的。

```css
 #rect {
    animation-name: rainbow;
    animation-duration: 4s;
    animation-fill-mode: forwards;
    // 动画不停止
    animation-iteration-count: infinite;
  }
  @keyframes rainbow {
    0% {
      top: 0px;
      left: 0px;
      width: 50px;
      background-color: blue;
    }
    50% {
      top: 50px;
      left: 25px;
      width: 100px;
      background-color: green;
    }
    100% {
      top: 0px;
      left: -25px;
      width: 200px;
      background-color: yellow;
    }
  }
```



## CSS 贝塞尔曲线

```css
cubic-bezier(x1, y1, x2, y2);
cubic-bezier(0.3, 0.4, 0.5, 1.6);
```



## CSS 媒体查询 @media

```css
// 当设备宽度小于或等于 100px 时返回内容
@media (max-width: 100px) { /* CSS Rules */ }

// 当设备高度大于或等于 350px 时返回内容：
@media (min-height: 350px) { /* CSS Rules */ }
```



## CSS flex 布局

### 1、flex-direction

- **横向排列 row **
- **横向排列  反转（左右调换位置）row-reverse**
- **竖向排列   column**

```css
flex-direction: row;
flex-direction: row-reverse;
flex-direction: column;
```

### 2、justify-content

> 横向/左右排列样式

- **flex-start**  左对齐
- **flex-end**  右对齐
- **center**  居中
- **space-between**  左右紧贴
- **space-around**  左右有缝隙
- **space-evenly**  左右有缝隙

```css
justify-content: flex-start;
justify-content: flex-end;
justify-content: center;
justify-content: space-between;
justify-content: space-around;
justify-content: space-evenly;
```

### 3、align-items

> 竖向/上下排列样式

- **flex-start**  上对齐
- **flex-end**  下对齐
- **center**  居中
- **stretch**  拉伸项目，填满 flex 容器
- **baseline**  沿基线对齐

```css
align-items: flex-start;
align-items: flex-end;
align-items: center;
align-items: stretch;
align-items: baseline;
```

### 4、flex-wrap

> 换行样式

- **nowrap**  默认不换行
- **wrap**  换行
- **wrap-reverse** 换行上下交换

```css
flex-wrap: nowrap;
flex-wrap: wrap;
flex-wrap: wrap-reverse;
```

### 5、flex-shrink  设置元素的收缩规则

### 6、flex-grow  设置元素的增长系数

### 7、flex-basis  设置元素的初始大小

### 8、order 属性重新排列子元素

### 9、align-self 自己设置属性

> 自己设置属性和其他元素互不干扰  属性值和 align-items 一致



## CSS grid 网格 

> 设置网格布局    display: grid;

### 1、grid-template-columns

> 网格容器设置三个列，每列宽度均为 100px  **几列就写几个**

```css
.container {
    display: grid;
    grid-template-columns: 100px 100px 100px;
}
```

### 2、grid-template-rows

> 网格容器设置2行，每行高度均为 50px   **几行就写几个**

```css
grid-template-rows: 50px 50px;
```

### 3、grid-column-gap

> 创建多列之间的间距 中间间距 10px

```css
grid-column-gap: 10px;
```

### 4、grid-row-gap

> 创建多行之间的间距 中间间距 10px

```css
grid-row-gap: 10px;
```

### 5、grid-gap

> 为网格添加间距  第一个值行间距、第二个值列间距

```css
grid-gap: 10px 20px;
```
