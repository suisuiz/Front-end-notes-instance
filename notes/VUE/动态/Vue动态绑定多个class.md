# vue动态绑定多个class

# 且是多个条件判断的问题

绑定多个 `class`  用 `[]`  中间用  `,`  分割开

```
:class="[show ? 'border' : '' , bol ? 'red' : '']"
```



### 例子

```
<template>
	<div class="app"  :class="[show===true ? 'border' : '' , background_red=== true ? 'red' : '']" >
	</div>
</template>

<script>
	export default {
		data(){
			return {
				show: true
				background_red：true
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.app{
		width: 100%;
	}
	.red{
   		background-color: red;
   	}
   	.border{
		border: 1px solid red;
	}
</style>
```

