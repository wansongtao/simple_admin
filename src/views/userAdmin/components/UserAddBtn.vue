<script lang="ts" setup>
import { ref } from 'vue';
import { IUserAdd } from '@/api/user';

const emits = defineEmits<{
  (e: 'addSuccess'): void
}>();

const visible = ref(false);
const onOpenModal = () => {
  visible.value = true;
};
const onAdd = (data: IUserAdd) => {
  // 调用接口添加用户
  visible.value = false;
};
</script>

<template>
  <div class="add_container">
    <AButton type="primary" block @click="onOpenModal">增加人员</AButton>

    <AddUserModal v-model:visible="visible" @confirm-add="onAdd" />
  </div>
</template>

<style lang="scss" scoped>

</style>