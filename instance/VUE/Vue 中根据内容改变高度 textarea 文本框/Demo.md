# Vue 中可根据内容自适应改变高度的textarea 文本框



如图所示，当`textarea`里的内容超过一行后，会出现滚动条并隐藏前一行的内容，特别是在移动端使用到textarea多行文本输入的话，这样显示其实是很不友好的。所以要做一个可根据内容改变高度的textarea的组件。

![img](https:////upload-images.jianshu.io/upload_images/7016617-d411168fc0306f32.gif?imageMogr2/auto-orient/strip|imageView2/2/w/684/format/webp)

### 踩坑尝试

利用`rows`属性来改变高度：

![img](https:////upload-images.jianshu.io/upload_images/7016617-4d7fe23427edee5e.png?imageMogr2/auto-orient/strip|imageView2/2/w/841/format/webp)

W3C HTML <textarea> 标签

踩坑时的思路：

- 给`textarea`加上`rows`属性，并双向绑定在`data`的`rows`上。(`<textarea ref="textarea" :rows="rows" v-model="value" class="textarea" ></textarea>`)；
- 获取初始页面时候`textarea`的高度，这就是一行的高度`oneHeight`；
- 通过`vue`的`watch`数据监听，当`textarea`的内容发生变化时触发，获取`textarea`的`scrollHeight`，再除以`oneHeight`求整数然后加一就是`rows`的数量。

踩坑感想：
 这样做是可以实现当内容变多，行数跟着变多的情况的，但是，当内容变少，`scrollHeight`是不会减少的！所以`rows`也不会变，一旦被撑大，就再也缩不回去。。。。显然，这不是我想要的效果。

### 正确姿势

猛然回想起 ElementUI 上就有可根据内容调整高度的组件[ElementUI input](https://links.jianshu.com/go?to=https%3A%2F%2Felement.eleme.cn%2F%23%2Fzh-CN%2Fcomponent%2Finput)！
 然后就去扒源码看看是怎么实现的，结果都已经封装好了，太棒了，直接下载来引用就行了！

饿了么组件的源码github地址：
 [https://github.com/ElemeFE/element/blob/dev/packages/input/src/calcTextareaHeight.js](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2FElemeFE%2Felement%2Fblob%2Fdev%2Fpackages%2Finput%2Fsrc%2FcalcTextareaHeight.js)

下面是引用了`ElementUI`的`input`组件的`calcTextareaHeight`方法的`MyTextarea.vue`：



```xml
<template>
    <div class="my-textarea">
      <textarea ref="textarea" :style="{'height': height}" v-model="value" class="textarea" ></textarea>
    </div>
</template>

<script>
  import calcTextareaHeight from '@/assets/calcTextareaHeight';

  export default {
    name: 'my-textarea',
    data() {
      return {
        // textarea内容
        value: '',
        // 动态高度
        height: '30px'
      }
    },
    watch: {
      value() {
        this.getHeight();
      }
    },
    methods: {
      getHeight() {
        this.height = calcTextareaHeight(this.$refs.textarea, 1, null).height;
      }
    }
  }
</script>

<style scoped>
  .my-textarea .textarea {
    display: inline-block;
    width: 400px;
    /*height: 30px;*/
    line-height: 30px;
    font-size: 30px;
    resize: none;
  }
</style>
```

![img](https:////upload-images.jianshu.io/upload_images/7016617-a2441f7af6e7abd8.gif?imageMogr2/auto-orient/strip|imageView2/2/w/684/format/webp)

无论是单个输入或删减，还是一段输入或删减，都能立刻自适应改变高度