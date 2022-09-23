# js 修改对象数组的 key 值不变

### 

## 一、修改 对象

```
let data = {
	a: "sddfa",
	b: 1,
	c: [1, 2, 3],
	d: {
		ac: 11
	},
	e: true
};
var keyMap = {
	a: "字符串",
	b: "数字",
	c: "数组"
};

let data2 = Object.keys(data).reduce((newData, key) => {
	let newKey = keyMap[key] || key;
	newData[newKey] = data[key];
	return newData;
}, {});

console.log("XXXXXXXXXXXXXXXXXXXXX", data);
console.log("XXXXXXXXXXXXXXXXXXXXX", data2);
```



## 二、修改对象数组

```
https://blog.csdn.net/weixin_47978760/article/details/124379119

方法一：使用map循环，

方法二：使用map循环 + replace替换

方法三：使用forEach循环 + for循环，通过Object.keys()来改变属性key；
```

