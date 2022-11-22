<script lang="ts" setup>
import { ref, watch } from 'vue';
import messageNotice from '@/utils/message';

const emits = defineEmits<{
  (event: 'update:visible', value: boolean): void;
  (event: 'confirmUpdate', value: string): void;
}>();
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  value: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入备注内容'
  },
  label: {
    type: String,
    default: '备注：'
  },
  title: {
    type: String,
    default: '备注详情'
  }
});

const onCancel = () => {
  emits('update:visible', false);
};

const remark = ref(props.value);
watch(
  () => props.visible,
  (val) => {
    if (!val) {
      return;
    }

    remark.value = props.value;
  }
);

const onUpdateRemark = () => {
  if (remark.value === '') {
    messageNotice({
      type: 'warning',
      content: props.placeholder
    });
    return;
  }

  if (remark.value === props.value) {
    messageNotice({
      type: 'warning',
      content: '您没有修改任何内容'
    });
    return;
  }

  emits('confirmUpdate', remark.value);
};
</script>

<template>
  <a-modal
    :visible="visible"
    :title="title"
    @cancel="onCancel"
    @ok="onUpdateRemark">
    <div class="content">
      <div class="label">{{ label }}</div>
      <div class="content_main">
        <a-textarea
          v-model:value="remark"
          :placeholder="placeholder"
          :rows="4"
          :maxlength="500"
          showCount />
      </div>
    </div>
  </a-modal>
</template>

<style lang="scss" scoped>
.content {
  display: flex;

  .label {
    flex-shrink: 0;
    padding-right: 10px;
  }

  .content_main {
    flex: 1;
  }
}
</style>
