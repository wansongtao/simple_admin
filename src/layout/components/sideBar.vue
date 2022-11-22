<script lang="ts" setup>
import type { MenuProps } from 'ant-design-vue';
import subMenu from './subMenu.vue';
import { ref, watch } from 'vue';
import useMenus from '@/hooks/useMenus';
import { useRouter, RouteLocationRaw, RouteRecordRaw } from 'vue-router';

const menus = useMenus(false);
const selectedKeys = ref<string[]>([menus[0].path]);

const router = useRouter();
const handleClick: MenuProps['onClick'] = (e) => {
  router.push(e.key as RouteLocationRaw);
};

/**
 * 通过当前路由和菜单，获取当前选中的菜单项
 * @param path
 * @param menu
 */
const getSelectedKey = (path: string, menu: RouteRecordRaw[]) => {
  if (!path || !menu.length) {
    return '';
  }

  // 当前路由拆分，例如：/user/index => ['/user', '/index']
  const paths = path.match(/\/[a-z0-9]+/g);
  if (!paths || !paths.length) {
    return '';
  }

  let key = '';
  let parentRoute: RouteRecordRaw | undefined = undefined;
  for (let i = 0; i < paths.length; i++) {
    const url = paths[i];

    // 查询当前路由属于哪个一级菜单
    if (i === 0) {
      parentRoute = menu.find((val) => val.path === url);

      // 当前路由不在菜单中
      if (!parentRoute) {
        break;
      }

      key = url;
      continue;
    }

    // 继续寻找是否有匹配的子菜单(parentRoute.children.length > 1  => 因为只有一个子菜单时，只会渲染父菜单)
    if (
      parentRoute &&
      parentRoute.children &&
      parentRoute.children.length > 1
    ) {
      parentRoute = parentRoute.children.find((val) => val.path === url);
      if (!parentRoute) {
        break;
      }

      key += url;
    }
  }

  return key;
};

watch(
  () => router.currentRoute.value.path,
  (path) => {
    if (selectedKeys.value[0] === path) {
      return;
    }

    const key = getSelectedKey(path, menus);
    if (!key) {
      return;
    }

    selectedKeys.value[0] = key;
  },
  { immediate: true }
);

const version = __VITE_VERSION__;
</script>

<template>
  <div class="side_box">
    <a-menu
      v-model:selectedKeys="selectedKeys"
      style="
        width: var(--sidewd);
        height: calc(100vh - var(--headerhg));
        background-color: var(--sidebgcolor);
      "
      mode="inline"
      theme="dark"
      @click="handleClick">
      <template v-for="item in menus" :key="item.name">
        <template v-if="!item.children || !item.children.length">
          <a-menu-item :key="item.path">
            <template v-if="item.meta?.icon" #icon>
              <svg-icon :name="(item.meta?.icon as string)" />
            </template>
            {{ item.meta?.title || item.name }}
          </a-menu-item>
        </template>
        <!-- 只有一个子菜单时，直接显示。不采用父菜单嵌套子菜单。 -->
        <template v-if="item.children?.length === 1">
          <a-menu-item :key="item.path">
            <template
              v-if="item.meta?.icon || item.children[0].meta?.icon"
              #icon>
              <svg-icon
                :name="item.children[0].meta?.icon || (item.meta?.icon as string)" />
            </template>
            {{ item.meta?.title || item.children[0].meta?.title || item.name }}
          </a-menu-item>
        </template>
        <template v-if="item.children && item.children.length > 1">
          <sub-menu :key="item.name" :menu-info="item" />
        </template>
      </template>
    </a-menu>

    <div class="version">{{ version }}</div>
  </div>
</template>

<style lang="scss" scoped>
.side_box {
  overflow: hidden;
  position: relative;
  width: var(--sidewd);

  .icons-list :deep(.anticon) {
    margin-right: 6px;
    font-size: 24px;
  }

  .version {
    position: absolute;
    bottom: 5px;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #999;
  }
}
</style>
