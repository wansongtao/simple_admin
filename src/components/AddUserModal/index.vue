<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import type { FormInstance } from 'ant-design-vue';

interface IUserAdd {
  cardId: string;
  // name: string;
  // sex: 0 | 1;
  // job: string;
  // department: string;
}
const rules: Record<keyof IUserAdd, Rule[]> = {
  cardId: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入工号'
    }
  ]
  // name: [
  //   {
  //     required: true,
  //     trigger: 'blur',
  //     message: '请输入姓名'
  //   }
  // ],
  // sex: [
  //   {
  //     required: true,
  //     trigger: 'blur',
  //     message: '请选择性别'
  //   }
  // ],
  // job: [
  //   {
  //     required: true,
  //     trigger: 'blur',
  //     message: '请输入职位'
  //   }
  // ],
  // department: [
  //   {
  //     required: true,
  //     trigger: 'blur',
  //     message: '请输入部门'
  //   }
  // ]
};

const emits = defineEmits<{
  (event: 'update:visible', value: boolean): void;
  (event: 'confirmAdd', value: IUserAdd): void;
}>();
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '新建'
  }
});

const userInfo = reactive<IUserAdd>({
  cardId: ''
  // name: '',
  // sex: 1,
  // job: '',
  // department: ''
});
const formElement = ref<FormInstance>();

const onCancel = () => {
  emits('update:visible', false);
};
const onAdd = () => {
  formElement.value?.validate().then((value) => {
    emits('confirmAdd', value as IUserAdd);
  });
};

watch(
  () => props.visible,
  (val) => {
    if (!val) {
      formElement.value?.resetFields();
    }
  }
);
</script>

<template>
  <a-modal :visible="visible" :title="title" @cancel="onCancel" @ok="onAdd">
    <a-form ref="formElement" :model="userInfo" :rules="rules">
      <a-form-item has-feedback label="工号：" name="cardId">
        <a-input
          v-model:value="userInfo.cardId"
          placeholder="请输入工号"
          :maxlength="50"
          allow-clear />
      </a-form-item>
      <!-- <a-form-item has-feedback label="姓名：" name="name">
        <a-input
          v-model:value="userInfo.name"
          placeholder="请输入姓名"
          :maxlength="50"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="性别：" name="sex">
        <a-select
          v-model:value="userInfo.sex"
          :options="[
            { value: 0, label: '女' },
            { value: 1, label: '男' }
          ]"
          style="width: 100%; text-align: left"
        >
        </a-select>
      </a-form-item>
      <a-form-item has-feedback label="职位：" name="job">
        <a-input
          v-model:value="userInfo.job"
          placeholder="请输入职位"
          :maxlength="50"
          allow-clear
        />
      </a-form-item>
      <a-form-item has-feedback label="部门：" name="department">
        <a-input
          v-model:value="userInfo.department"
          placeholder="请输入部门"
          :maxlength="50"
          allow-clear
        />
      </a-form-item> -->
    </a-form>
  </a-modal>
</template>

<style lang="scss" scoped></style>
