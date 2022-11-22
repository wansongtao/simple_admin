import { ref } from 'vue';

const useTableSelection = () => {
  const checkedKeys = ref<(string | number)[]>([]);
  const rowSelection = ref({
    checkStrictly: false,
    onChange: (keys: (string | number)[]) => {
      checkedKeys.value = keys;
    }
  });

  return {
    checkedKeys,
    rowSelection
  };
};

export default useTableSelection;
