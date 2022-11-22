<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
</script>

<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>

<style>
@import url('./styles/base.css');
@import url('./styles/common.css');
@import url('./styles/variable.css');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100vw;
  min-width: 1200px;
  height: 100vh;
  background: var(--appbgcolor);
}
</style>
