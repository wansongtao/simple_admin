<script lang="ts" setup>
import lay_header from './components/header.vue';
import side_bar from './components/sideBar.vue';
</script>

<template>
  <div class="layout">
    <lay_header />
    <section class="layout_container">
      <side_bar />
      <div class="layout_main">
        <ant-breadcrumb />
        <div class="layout_main_content">
          <router-view v-slot="{ Component }">
            <transition name="fade">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  min-width: 1200px;
}

.layout_container {
  overflow: hidden;
  display: flex;
  height: calc(100vh - var(--headerhg));

  .layout_main {
    display: flex;
    flex-direction: column;
    margin: 10px 0 0 var(--mainmargin);
    height: calc(100vh - var(--headerhg) - 10px);
  }

  .layout_main_content {
    flex: 1;
    box-sizing: border-box;
    width: calc(100vw - var(--sidewd) - var(--mainmargin));
    min-width: calc(1200px - var(--sidewd) - var(--mainmargin));
    height: calc(100vh - var(--headerhg) - 42px);
    background-color: var(--mainbgcolor);
    border-top-left-radius: 8px;
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-from {
  transform: translateX(-30px);
}

.fade-enter-to,
.fade-leave-to {
  transform: translateX(30px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
</style>
