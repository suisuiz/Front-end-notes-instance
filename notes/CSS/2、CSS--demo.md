# 案例

## 1、box-shadow

```css
<div class="box"></div>
.center {
    width: 100px;
    height: 100px;
    background-color: transparent;
    box-shadow: 0px 0px 4px 0px black;
}
```

![image-20210717010423896](C:\Users\SUI\AppData\Roaming\Typora\typora-user-images\image-20210717010423896.png)

## 2、Transform: skewX 

```css
transform: skewX(-45deg);
```

![image-20210717002608574](C:\Users\SUI\AppData\Roaming\Typora\typora-user-images\image-20210717002608574.png)

## 3、::after   ::before   心形图案

```html
<div class="heart"></div>
```

```css
.heart {
  margin: 50px;
  background-color: red;
  height: 50px;
  width: 50px;
  // 旋转45°
  transform: rotate(-45deg);
}
.heart::after {
  background-color: red;
  content: "";
  border-radius: 50%;
  position: absolute;
  width: 50px;
  height: 50px;
  top: 0px;
  left: 25px;
}
.heart::before {
  content: "";
  background-color: red;
  border-radius: 50%;
  position: absolute;
  width: 50px;
  height: 50px;
  top: -25px;
  left: 0px;
}
```

![image-20210717012413203](C:\Users\SUI\AppData\Roaming\Typora\typora-user-images\image-20210717012413203.png)

## 4、无限的动画计数制作 CSS 心跳

```html
<div class="back"></div>
<div class="heart"></div>
```

```css
.back {
    position: fixed;
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    animation-name: backdiv;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }

  .heart {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: pink;
    height: 50px;
    width: 50px;
    transform: rotate(-45deg);
    animation-name: beat;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }
  .heart:after {
    background-color: pink;
    content: "";
    border-radius: 50%;
    position: absolute;
    width: 50px;
    height: 50px;
    top: 0px;
    left: 25px;
  }
  .heart:before {
    background-color: pink;
    content: "";
    border-radius: 50%;
    position: absolute;
    width: 50px;
    height: 50px;
    top: -25px;
    left: 0px;
  }

  @keyframes backdiv {
    50% {
      background: #ffe6f2;
    }
  }

  @keyframes beat {
    0% {
      transform: scale(1) rotate(-45deg);
    }
    50% {
      transform: scale(0.6) rotate(-45deg);
    }
  }
```

![hert](C:\Users\SUI\Pictures\hert.gif)

## 5、transform 案例

[transform 链接](https://c.runoob.com/codedemo/3391)

## 6、transform + animation 案例

[transform + animation ](http://www.webzsky.com/?p=561)

## 7、案例合集

[菜鸟教程案例合集](https://c.runoob.com/examples)

## 8、css图片闪烁效果  呼吸

#### animation

```html
<image class="position_active" src="/static/chat/icon/active.png"></image>
```

```css
.position_active {
    animation: breathe 2s ease-out infinite alternate;
}

@keyframes breathe {

    0%,
    30% {
        opacity: .5
    }

    85%,
    100% {
        opacity: 1
    }
}
```

