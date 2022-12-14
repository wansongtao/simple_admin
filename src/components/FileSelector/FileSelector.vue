<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
  /**
   * @description 是否允许选择多个文件
   */
  multiple: {
    type: Boolean,
    default: false
  },
  /**
   * @description 唯一文件类型说明符，请参考w3c
   */
  accept: String,
  /**
   * @description 最大允许选择文件个数
   */
  limit: {
    type: Number,
    validator(value: number) {
      return value > 0 && Number.isInteger(value);
    }
  },
  /**
   * @description 是否启用拖拽获取文件信息
   */
  drag: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits<{ (event: 'change', files: File[]): void }>();

const disabled = ref(false);
const fileEle = ref<HTMLInputElement | null>(null);

const onOpenFileDialog = () => {
  if (!fileEle.value) {
    return;
  }

  if (disabled.value) {
    return;
  }

  fileEle.value.click();
};

const files = ref<File[]>([]);
const saveFileInfo = (checkedFiles: File[]) => {
  if (!checkedFiles.length) {
    return;
  }

  // 单选
  if (!props.multiple) {
    if (files.value.length >= 1) {
      return;
    }

    disabled.value = true;
    files.value = checkedFiles;
    emit('change', files.value);
    return;
  }

  // 多选未限制个数
  if (props.multiple && !props.limit) {
    files.value.push(...checkedFiles);
    emit('change', files.value);
    return;
  }

  // 多选，限制了个数
  if (files.value.length >= (props.limit as number)) {
    return;
  }
  const total = files.value.length + checkedFiles.length;
  if (total >= (props.limit as number)) {
    disabled.value = true;
  }
  const all = [...files.value, ...checkedFiles];
  all.splice(props.limit as number);
  files.value = all;
  emit('change', files.value);
  return;
};

const deleteFile = (idx: number) => {
  if (idx < 0 || idx >= files.value.length) {
    return;
  }

  files.value.splice(idx, 0);

  if (disabled.value) {
    disabled.value = false;
  }
};

const clearFiles = () => {
  disabled.value = false;
  files.value = [];
};

const onSelectFile = (e: Event) => {
  const checkedFiles = (e.target as HTMLInputElement).files;
  if (!checkedFiles) {
    return;
  }

  saveFileInfo(Array.from(checkedFiles));
};
const onDragFile = (e: DragEvent) => {
  const checkedFiles = e.dataTransfer!.files;
  saveFileInfo(Array.from(checkedFiles));
};

defineExpose({
  onOpenFileDialog,
  deleteFile,
  clearFiles
});
</script>

<template>
  <input
    ref="fileEle"
    type="file"
    name="files"
    title="upload"
    :multiple="multiple"
    :accept="accept"
    class="file_input"
    @change="onSelectFile"
  />
  <div
    class="file_btn"
    :class="disabled ? 'file_btn--stop' : ''"
    @click="onOpenFileDialog"
    v-if="!drag"
  >
    <slot :disabled="disabled"><div class="default_btn">选择文件</div></slot>
  </div>
  <div
    class="file_btn"
    :class="disabled ? 'file_btn--stop' : ''"
    @click="onOpenFileDialog"
    @dragenter.prevent
    @dragover.prevent
    @drop.prevent="onDragFile"
    v-if="drag"
  >
    <slot :disabled="disabled">
      <div class="default_btn">选择文件</div>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.file_input {
  display: none;
}
.file_btn {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.file_btn--stop:hover {
  cursor: not-allowed;
}

.default_btn {
  width: 80px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border: 1px solid #999;
}
</style>
