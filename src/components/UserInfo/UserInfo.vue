<script lang="ts" setup>
import useUser from '@/store/user';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUser();
const name = computed(() => userStore.name);

const router = useRouter();
const onToHome = () => {
  router.push('/');
};

const onLogout = () => {
  userStore.removeToken();
  router.push('/login');
};
</script>

<template>
  <a-popover trigger="hover">
    <template #content>
      <div class="user_btn" @click="onToHome">返回主页</div>
      <div class="user_btn" @click="onLogout">退出登录</div>
    </template>
    <div class="user_info">
      <div class="user_name">{{ name }}</div>
      <div class="ani_icon">
        <svg-icon name="triangle" color="#555" />
      </div>
    </div>
  </a-popover>
</template>

<style lang="scss" scoped>
.user_info {
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover .ani_icon {
    transform: rotate(180deg);
  }
}

// .avatar {
//   width: 40px;
//   height: 40px;
// }

.user_name {
  margin-left: 10px;
  font-size: 16px;
}

.user_btn {
  padding: 5px 0;
  cursor: pointer;
}

.ani_icon {
  padding: 0 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.6s;
}
</style>
