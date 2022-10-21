<!--
 * @Descripttion: 
 * @Author: SUI
 * @Date: 2021-12-20 19:13:06
 * @LastEditors: SUI
 * @LastEditTime: 2022-05-13 21:46:55
 * @FilePath: \undefinedc:\Users\wangy\Desktop\git\instance-hub\instance\VUE\sixth-day.vue
-->
<template>
  <div class="temp-div">
    <section id="logo">
      <div class="item"></div>
      <div class="item"></div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {}
  }
})
</script>

<style scoped lang="scss">
.temp-div {
  border: 1px solid #000;
  margin: 20px auto;
  width: 200px;
  height: 100px;
  #logo {
    // position: relative;
    margin: 20px auto;
    height: 40px;
    width: 40px;
    background: #ccc;
    overflow: hidden;
    display: flex;
    .item {
        position: relative;
        width: 8px;
        left: 10px;
        background-color: #00f;
        transform: rotate(20deg);
        &::after, &::before {
          transform: rotate(-20deg);
          background: #ccc;
          position: absolute;
          content: "";
          width: 12px; // 根据item宽度进行修改
          height: 4px; // 根据旋转角度进行修改
          left: -2px; // 根据item宽度进行修改
        }
        &::after {
          top: -2px;
        }
        &::before {
          bottom: -2px;
        }
        &:nth-child(1) {
          height: 40px;
          margin-right: 6px;
        }
        &:nth-child(2) {
          height: 14px;
          top: 12px;
        }
    }
  }
}
</style>
