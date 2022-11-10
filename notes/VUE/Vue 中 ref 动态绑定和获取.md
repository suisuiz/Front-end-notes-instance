# vue 中 ref 的动态绑定与获取

```
// 数据
export default {
  data() {
    return {
      list: [
        '今天要修复一百个bug',
        '今天要修复一百个bug',
        '今天要修复一百个bug',
        '今天要修复一百个bug',
        '今天要修复一百个bug',
        '今天要修复一百个bug',
      ],
    };
  },
}
 
// 循环数据
// :ref="'msg' + 变量"
<div v-for="(item,index) in list" :key="index" class="text_wrap">
  <div> 
    <span :ref="'msg' + index">{{item}}</span>
  </div>
</div>
 
 
// 获取数据
// this.$refs[`msg${index}`] 是个数组
fun(index){
  if(this.$refs[`msg${index}`][0].className==''){
    this.$refs[`msg${index}`][0].className = 'current';
  }else{
    this.$refs[`msg${index}`][0].className = '';
  }
}
```

