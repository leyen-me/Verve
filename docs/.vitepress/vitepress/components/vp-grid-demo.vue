<script setup lang="ts"></script>

<template>
  <ul>
    <slot name="items" />
  </ul>
</template>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin: 0 auto;
}

/* 确保最多显示3列 */
@media (min-width: 768px) {
  ul {
    grid-template-columns: repeat(auto-fit, minmax(calc(50% - 10px), 1fr));
  }
}

/* 小屏幕显示单列 */
@media (max-width: 480px) {
  ul {
    grid-template-columns: 1fr;
  }
}
</style>
