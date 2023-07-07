# `CSS` 字体设置小于`12px`

> 谷歌浏览器机制问题，默认的`css`字体大小最小为`12px`，要想小于需要以下操作

```css
<style> 
.title {
    font-size: 10px; 
    transform: scale(0.83333); 
    transform-origin: 0 0;
}
</style>
```



> font-size: `12px`，给文本设置字体`12px`，并设置缩放值为 `10/12=0.83333`，也就是`transform:scale(0.83)`；
> 如果要设置`8px`，那就是`8/12=0.66666`；
> `transform-origin：0 0`；默认缩放中心点是在盒子的正中心，所以如果我们需要文本左对齐，就需要改变中心点，也就是`transform-origin：0 0`；该值有两个参数值，第一个是水平方位值，第二个是垂直方位值，对应的如果需要右对齐、或者是有缩进，那就改变对应的参数值即可。



> 要想让缩放的字体居中，需要改变 `transform-origin`

```css
<style> 
.title {
    font-size: 10px; 
    transform: scale(0.83333); 
    transform-origin: center;
}
</style>
```

