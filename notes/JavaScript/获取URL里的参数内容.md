## 获取URL里的参数内容

```javascript
	// url 完整路径
	const url = new URL(window.location.href)
	// console.log(url)
	const urlParams = url.searchParams
	// console.log(urlParams)
	let paramsObj = {}
	for (const [key, value] of urlParams.entries()) {
		paramsObj[key] = value
	}
	if (this.$route) {
		const routeQueryObj = this.$route.query
		paramsObj = Object.assign(paramsObj, routeQueryObj)
	}
	// url 参数对象
	console.log(paramsObj)
	console.log(paramsObj.xxx)
```