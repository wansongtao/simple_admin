<script lang="ts" setup>
import { RouteRecordRaw } from 'vue-router';

interface Props {
  menuInfo: RouteRecordRaw;
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
  <a-sub-menu :key="menuInfo.name">
    <template v-if="menuInfo.meta?.icon" #icon
      ><svg-icon :name="(menuInfo.meta?.icon as string)"
    /></template>
    <template #title>{{ menuInfo.meta?.title || menuInfo.name }}</template>
    <template v-for="item in menuInfo.children" :key="item.name">
      <template v-if="!item.children || !item.children.length">
        <a-menu-item :key="menuInfo.path + item.path">
          <template v-if="item.meta?.icon" #icon>
            <svg-icon :name="(item.meta?.icon as string)" />
          </template>
          {{ item.meta?.title || item.name }}
        </a-menu-item>
      </template>
      <!-- 只有一个子菜单时，直接显示。不采用父菜单嵌套子菜单。 -->
      <template v-if="item.children?.length === 1">
        <a-menu-item :key="item.path">
          <template v-if="item.meta?.icon || item.children[0].meta?.icon" #icon>
            <svg-icon
              :name="item.children[0].meta?.icon || (item.meta?.icon as string)" />
          </template>
          {{ item.meta?.title || item.children[0].meta?.title || item.name }}
        </a-menu-item>
      </template>
      <template v-if="item.children && item.children.length > 1">
        <sub-menu :menu-info="item" :key="item.name" />
      </template>
    </template>
  </a-sub-menu>
</template>

<style lang="scss" scoped></style>
