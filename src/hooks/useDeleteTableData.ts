import { Ref } from 'vue';

/**
 * 根据选中项删除对应的表格数据
 * @param checkedKeys 
 * @param data 
 * @param tableData 
 * @returns 删除失败返回false，需要主动请求刷新数据
 */
const useDeleteTableData = (
  checkedKeys: Ref<(string | number)[]>,
  data: Ref<{ page: number; size: number; total: number }>,
  tableData: Ref<{id: number | string}[]>
) => {
  const delLength = checkedKeys.value.length;
  const total = data.value.total;

  // 删除了所有数据
  if (delLength === total) {
    tableData.value = [];
    checkedKeys.value = [];
    data.value.total = 0;
    return true;
  }

  let page = data.value.page;
  const size = data.value.size;
  const maxPage = Math.ceil(total / size);

  // 需要重新请求数据
  if (page < maxPage) {
    return false;
  }

  const lastPageSize = total - (maxPage - 1) * size;

  // 删除了最后一页的部分数据，不重新请求，直接移除相关数据
  if (page === maxPage && delLength < lastPageSize) {
    tableData.value = tableData.value.filter(
      (val) => !checkedKeys.value.includes(val.id)
    );
    data.value.total -= delLength;
    checkedKeys.value = [];
    return true;
  } else {
    // 删除了最后一页所有数据，页码减一
    data.value.page -= 1;
    return false;
  }
};

export default useDeleteTableData;
