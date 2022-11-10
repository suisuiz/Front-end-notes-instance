## Vue 用 js 改变 Scss 的值

```
calc（）函数
```

`vue2`

```
<template>
	<div class="page" :style="{ '--rem_size': remSize }"></div>
</template>

<style lang="scss" scoped>
// $rem: 0.55rem;
$rem: var(--rem_size);

.box {
    margin: calc(#{$rem} * 0.5rem);
}
</style>
```







```
https://www.thinbug.com/q/54207243
```

