Scss 遍历之批量设置样式

这个指令包含两种格式：@for $var from <start> through <end>，或者 @for $var from <start> to <end>，区别在于 through 与 to 的含义：当使用 through 时，条件范围包含 <start> 与 <end>的值，而使用 to 时条件范围只包含 <start> 的值不包含 <end>的值。

```
@for $var from 1 through 3 {
  $dis: $var * 10 + px;
  .mt-#{$var} {
    margin-top: $dis;
  }
}
```

```
$colors: lightgoldenrodyellow, lightblue, lightgray, lightgreen;

@each $c in $colors {
  $i: index($colors, $c); // 索引
  .box:nth-child(#{$i}) {
    background-color: $c;
  }
}
```

https://blog.csdn.net/z291493823/article/details/124689190

https://blog.csdn.net/ning0_o/article/details/65634171