# 计算属性 computed

> https://zhuanlan.zhihu.com/p/491138975
>
> https://blog.csdn.net/m0_46995864/article/details/115211293

#### `html`

```
<template>
  <div class="doc_page">
    <div class="img_mask">
      <img class="img_item" :style="imgStyles(item.index)" />
    </div>
  </div>
</template>
```

#### `js`

##### 没传参数版本

```
export default {
	computed: {
		imgStyles() {
			let style = ''
            if (this.xxx === '1') {
              style = `width: ${this.windowWidth}px; height: ${this.windowHeight}px`
            } else {
              style = `width: 0; height: 0`
            }
            return style
		}
	}
}
```

##### 传参数版本

> return 一个 匿名函数 就可以成功传参啦
>
> ` return (xx) => { return xxx }`

```
computed: {
  // 计算属性 图片样式
  imgStyles() {
    return (index) => {
      let style = ''
      if (this.activeIndex === index) {
        style = `width: ${this.windowWidth}px; height: ${this.windowHeight}px`
      } else {
        style = `width: 0; height: 0`
      }
      return style
    }
  }
},
```

