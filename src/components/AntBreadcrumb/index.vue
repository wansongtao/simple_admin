<script lang="ts" setup>
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { IBreadcrumb } from '@/types/setting';
import useSetting from '@/store/setting';

const list = ref<IBreadcrumb[]>([]);
const route = useRoute();
watch(
  () => route.matched,
  (routes) => {
    const arr = routes.map((val) => {
      return {
        name: val.meta?.title || val.name || '',
        path: val.path
      };
    });

    list.value = arr;
  },
  { immediate: true }
);

const store = useSetting();
watch(
  () => store.breadcrumbs,
  (breadcrumbs) => {
    if (!breadcrumbs.length) {
      return;
    }

    list.value = breadcrumbs;
  }
);
</script>

<template>
  <div class="breadcrumb" v-if="list.length">
    <a-breadcrumb separator="/">
      <a-breadcrumb-item v-for="(item, index) in list" :key="item.name">
        <router-link
          :to="item.path"
          v-if="item.path && index !== list.length - 1">
          {{ item.name }}
        </router-link>
        <template v-else>
          {{ item.name }}
        </template>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb {
  flex-shrink: 0;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}
</style>
