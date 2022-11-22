<script lang="ts" setup>
import messageNotice from '@/utils/message';
import showConfirm from '@/utils/confirm';

const onDownload = () => {
  showConfirm({ title: '提示', content: '确定下载所有人员信息表格？' })
    .then(() => {
      console.log('download');
    })
    .catch(() => {});
};
</script>

<template>
  <AButton type="primary" block @click="onDownload">下载表格</AButton>
</template>

<style lang="scss" scoped></style>
