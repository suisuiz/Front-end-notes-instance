# vue img 使用动态 src



在vue项目中使用，动态的src，需要注意的是：

###     在引用的文件目录的前面加上require



```
 <img :src="require('../../assets/images/company_indicator/company' + (index) + '.png')" />
```



### 三元表达式的用法：

```
 <img :src="100 >=0? require('../../assets/images/monitor/fold.png'):require('../../assets/images/monitor/unfold.png')"/>
```

