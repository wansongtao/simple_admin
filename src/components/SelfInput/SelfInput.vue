<script lang="ts" setup>
import { ref, watch } from 'vue';
import vDebounce from '@/directive/vDebounce';

const emits = defineEmits<{ (event: 'changevalue', value: string): void }>();

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  maxLength: {
    type: Number,
    default: 50
  },
  delay: {
    type: Number,
    default: 200
  },
  value: {
    type: String,
    default: ''
  }
});

const inputVal = ref(props.value);
const onChangeValue = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  emits('changevalue', value);
};

watch(() => props.value, (val) => {
  if (inputVal.value === val) {
    return;
  }

  inputVal.value = val;
});
</script>

<template>
  <div class="self_input">
    <div class="self_input_label" v-if="label">{{ label }}</div>
    <div class="self_input_main">
      <a-input
        v-model:value="inputVal"
        :placeholder="placeholder"
        :maxlength="maxLength"
        allow-clear
        v-debounce:[delay]="onChangeValue"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.self_input {
  display: flex;
  align-items: center;
  height: 40px;

  .self_input_label {
    flex-shrink: 0;
    padding-right: 10px;
  }

  .self_input_main {
    flex: 1;
  }
}
</style>
