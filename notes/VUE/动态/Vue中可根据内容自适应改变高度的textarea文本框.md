# `Vue`中可根据内容自适应改变高度的`textarea`文本框

如图所示，当`textarea`里的内容超过一行后，会出现滚动条并隐藏前一行的内容，特别是在移动端使用到`textarea`多行文本输入的话，这样显示其实是很不友好的。所以要做一个可根据内容改变高度的`textarea`的组件。

![img](https:////upload-images.jianshu.io/upload_images/7016617-d411168fc0306f32.gif?imageMogr2/auto-orient/strip|imageView2/2/w/684/format/webp)



饿了么组件的源码`github`地址：[`github` 地址](https://github.com/ElemeFE/element/blob/dev/packages/input/src/calcTextareaHeight.js)

```
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



![img](https://upload-images.jianshu.io/upload_images/7016617-a2441f7af6e7abd8.gif?imageMogr2/auto-orient/strip|imageView2/2/w/684/format/webp)

无论是单个输入或删减，还是一段输入或删减，都能立刻自适应改变高度

