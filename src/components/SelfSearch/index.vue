<script lang="ts" setup>
import { ref, watch } from 'vue';
import messageNotice from '@/utils/message';
import { throttle } from '@/utils/index';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

interface IProps {
  type?: 'default' | 'datetime';
  placeholder?: string;
  content?: string;
  maxLength?: number;
  duration?: number;
}

const props = withDefaults(defineProps<IProps>(), {
  placeholder: '请输入工号/姓名',
  maxLength: 50,
  duration: 1000,
  type: 'default'
});
const emits = defineEmits<{
  (e: 'onSearch', value: string): void;
  (e: 'onReset'): void;
}>();
const disabledDate = (current: Dayjs) => {
  return current > dayjs();
};

const searchContent = ref(props.content);
watch(
  () => props.content,
  (val) => {
    if (!val || val === searchContent.value) {
      return;
    }

    searchContent.value = val;
  }
);

const onSearch = throttle(() => {
  if (!searchContent.value) {
    messageNotice({
      type: 'warning',
      content: '请先输入您需要搜索的内容！'
    });
    return;
  }

  emits('onSearch', searchContent.value);
}, props.duration);
const onReset = throttle(() => {
  searchContent.value = '';
  emits('onReset');
}, props.duration);
</script>

<template>
  <div class="flexbox search_box">
    <a-input
      v-if="type === 'default'"
      v-model:value="searchContent"
      :placeholder="placeholder"
      :maxlength="maxLength"
      allow-clear
    >
      <template #prefix>
        <div class="flex_center">
          <svg-icon name="search_icon" color="#666" />
        </div>
      </template>
    </a-input>
    <template v-if="type === 'datetime'">
      <div class="flex_center icon">
        <svg-icon name="search_icon" color="#666" />
      </div>
      <a-date-picker
        v-model:value="searchContent"
        :placeholder="placeholder"
        :disabled-date="disabledDate"
        :show-time="{ format: 'HH:mm:ss' }"
        valueFormat="YYYY-MM-DD HH:mm:ss"
      />
    </template>

    <div class="btn">
      <AButton type="primary" block @click="onSearch">搜索</AButton>
    </div>
    <div class="btn">
      <AButton type="dashed" block @click="onReset">重置</AButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search_box {
  position: relative;
  width: 440px;

  :deep(.ant-picker) {
    padding-left: 30px;
    width: 100%;
  }

  .icon {
    position: absolute;
    z-index: 99;
    left: 14px;
  }
}

.btn {
  margin-left: 10px;
}
</style>
