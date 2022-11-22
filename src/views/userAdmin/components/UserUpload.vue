<script lang="ts" setup>
import { ref } from 'vue';
import messageNotice from '@/utils/message';
import FileSelector from '@/components/FileSelector/FileSelector.vue';
// import { uploadUserInfo } from '@/api/file';

const emits = defineEmits<{
  (event: 'uploadSuccess'): void;
}>();

const inputEle = ref<InstanceType<typeof FileSelector> | null>(null);
const file = ref<File | null>();
const onUpload = (files: File[]) => {
  if (files.length === 0) {
    messageNotice({
      type: 'warning',
      content: '请先选择文件'
    });
    return;
  }

  file.value = files[0];
  emits('uploadSuccess');
  // uploadUserInfo(file.value).then(() => {
  //   messageNotice({
  //     type: 'success',
  //     content: '上传成功'
  //   });

  //   inputEle.value?.clearFiles();
  //   file.value = null;
  //   emits('uploadSuccess');
  // });
};
</script>

<template>
  <FileSelector ref="inputEle" accept=".xls, .xlsx" @change="onUpload">
    <template v-slot:default="{ disabled }">
      <AButton type="primary" block :disabled="disabled">导入表格</AButton>
    </template>
  </FileSelector>
</template>

<style lang="scss" scoped></style>
