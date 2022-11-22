<script lang="ts" setup>
import messageNotice from '@/utils/message';
import showConfirm from '@/utils/confirm';
// import { delUsers } from '@/api/user';

interface IProps {
  checkedKeys: (string | number)[];
}
const props = withDefaults(defineProps<IProps>(), {});

const emits = defineEmits<{
  (event: 'delSuccess'): void;
}>();

const onDelete = () => {
  if (!props.checkedKeys || !props.checkedKeys.length) {
    messageNotice({
      type: 'warning',
      content: '请先选择需要删除的项'
    });
    return;
  }

  showConfirm({ title: '提示', content: '此操作将删除选中的人员信息，是否继续？' })
    .then(() => {
      emits('delSuccess');
      // delUsers(props.checkedKeys as number[]).then(() => {
      //   messageNotice({
      //     type: 'success',
      //     content: '删除成功'
      //   });

      //   emits('delSuccess');
      // });
    })
    .catch(() => {});
};
</script>

<template>
  <AButton type="primary" danger block @click="onDelete">删除选中</AButton>
</template>

<style lang="scss" scoped></style>
