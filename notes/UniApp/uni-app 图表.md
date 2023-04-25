# uni-app 图表

## 一、ucharts

> 官网 https://www.ucharts.cn/v2
>
> 插件市场 https://ext.dcloud.net.cn/plugin?id=271
>
> 文档  https://www.ucharts.cn/v2/#/document/index

```vue
<qiun-data-charts type="line" :opts="lineOpts" :chartData="chartData" :ontouch="true" />

<qiun-data-charts type="column" :opts="colOpts" :chartData="chartData" :ontouch="true" />

<qiun-data-charts type="ring" :opts="ringOpts" :chartData="chartData" />
```



## 二、echarts

> 官网  https://echarts.apache.org/zh/index.html
>
> 插件市场 https://ext.dcloud.net.cn/plugin?id=1207
>
> 
>
> 案例
>
> https://blog.csdn.net/sd1sd2/article/details/129213827
>
> https://blog.csdn.net/qq_37565670/article/details/118085702

```vue
<view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="echarts" class="echarts"></view>
```

```javascript
<script module="echarts" lang="renderjs">
let myChart
export default {
	mounted() {
		if (typeof window.echarts === 'function') {
			this.initEcharts()
		} else {
			// 动态引入较大类库避免影响页面展示
			const script = document.createElement('script')
			// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
			script.src = 'static/echarts.js'
			script.onload = this.initEcharts.bind(this)
			document.head.appendChild(script)
		}
	},
	methods: {
		initEcharts() {
			myChart = echarts.init(document.getElementById('echarts'))
			// 观测更新的数据在 view 层可以直接访问到
			myChart.setOption(this.option)
		},
		updateEcharts(newValue, oldValue, ownerInstance, instance) {
			// 监听 service 层数据变更
			myChart.setOption(newValue)
		},
		onClick(event, ownerInstance) {
			// 调用 service 层的方法
			ownerInstance.callMethod('onViewClick', {
				test: 'test'
			})
		}
	}
}
</script>
```

