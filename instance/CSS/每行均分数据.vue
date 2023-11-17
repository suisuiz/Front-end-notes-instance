<!--
 * @Descripttion: 每行均分数据
 * @Author: SUI
-->
<template>
  <view>
    <view class="icon_box">
      <div class="icon_item" :class="keys.checked ? 'check' : ''" v-for="(keys, index) in iconList" :key="'i' + index">
        <image class="icon" mode="aspectFill" :src="keys.icon"></image>
      </div>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      iconList
    }
  },

  onLoad() {
    this.getJson()
  },

  methods: {
    // 获取icon json
    getJson() {
      let that = this
    }
  }
}
</script>

<style scoped lang="scss">
.icon_box {
  display: flex;
  flex-wrap: wrap;
  padding: 0 40px;
  box-sizing: border-box;

  .icon_item {
    position: relative;
    margin-top: 36px;
    overflow: hidden;
    width: 200px;
    height: 200px;
    border-radius: 10px;
    border: dashed 6px rgba(30, 30, 30, 0.4);

    &:not(:nth-child(3n)) {
      margin-right: calc((100% - 204px * 3) / 3);
    }

    .icon {
      width: 100%;
      height: 100%;
    }
  }

  .check {
    border: solid 6px #3e6af3;
  }
}
</style>
