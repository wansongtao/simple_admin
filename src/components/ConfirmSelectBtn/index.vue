<script lang="ts" setup>
import messageNotice from '@/utils/message';
import showConfirm from '@/utils/confirm';
import { throttle } from '@/utils/index';

interface IProps {
  checkedKeys: (string | number)[];
  btnText: string;
  tips?: string; // 未选中时的提示文本
  confirmTitle?: string; // 确认框标题
  confirmText?: string; // 确认框文本
  danger?: boolean;
  ghost?: boolean;
  delay?: number; // 节流时间
}
const props = withDefaults(defineProps<IProps>(), {
  tips: '请先选中需要操作的项！',
  confirmTitle: '提示',
  confirmText: '确认对选中项进行此操作吗？',
  danger: true,
  ghost: false
});

const emits = defineEmits<{
  (event: 'OnConfirm'): void;
  (e: 'OnCancel'): void;
}>();

const onConfirm = throttle(() => {
  if (!props.checkedKeys || !props.checkedKeys.length) {
    messageNotice({
      type: 'warning',
      content: props.tips
    });
    return;
  }

  showConfirm({
    title: props.confirmTitle,
    content: props.confirmText
  })
    .then(() => {
      emits('OnConfirm');
    })
    .catch(() => {
      emits('OnCancel');
    });
}, props.delay);
</script>

<template>
  <div class="mr-20">
    <AButton
      type="primary"
      :danger="danger"
      :ghost="ghost"
      block
      @click="onConfirm"
      >{{ btnText }}</AButton
    >
  </div>
</template>

<style lang="scss" scoped></style>
