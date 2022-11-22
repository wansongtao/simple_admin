<script lang="ts" setup>
const props = defineProps<{title: string}>();
</script>

<template>
  <div class="self_title">
    {{title}}
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.self_title {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  font-size: 16px;
  font-weight: 600;
}
</style>