# `nvue` 页面中 `scrollview` 不能实现横向滚动

直接在 `scrollview` 中编写 `flex` ，`scrollview` 里的内容直接就是所有循环内容 

```
<template>
  <view class="memo_wrap" :style="{ width: 110 * memoList.length + 'rpx' }">
    <scroll-view class="memo_types" :show-scrollbar="false" scroll-x>
      <view class="memo_box_wrap">
        <view class="memo_box" :style="{ background: item.color }" v-for="(item, index) in memoList" :key="index">
          <image class="memo_image" :src="item.image" mode="aspectFill"></image>
          <text class="memo_text">{{ item.content }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
```

```
<style>
  .memo_wrap {
    overflow: hidden;
  }

  .memo_types {
    max-width: 330rpx;
    overflow: hidden;
    white-space: nowrap;
    flex-direction: row;
  }

  .memo_box_wrap {
    flex-direction: row;
  }

  .memo_box {
    position: relative;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 102rpx;
    height: 102rpx;
    box-shadow: 0 6rpx 6rpx -2rpx rgba(0, 0, 0, 0.5);
  }
</style>
```

