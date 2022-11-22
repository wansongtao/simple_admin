import { reactive, toRefs } from 'vue';

const useRemark = () => {
  const remark = reactive({
    visible: false,
    value: '',
    index: 0
  });

  const updateRemark = ({
    visible = false,
    value = '',
    index = 0
  }) => {
    remark.visible = visible;
    remark.value = value;
    remark.index = index;
  };

  const onOpenRemarkModal = (index: number, value: string) => {
    updateRemark({
      visible: true,
      value,
      index
    });
  };

  return {
    ...toRefs(remark),
    onOpenRemarkModal
  }
};

export default useRemark;