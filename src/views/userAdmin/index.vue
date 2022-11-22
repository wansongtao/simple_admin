<script lang="ts" setup>
import { ref, Ref } from 'vue';
import { IUserInfo } from '@/api/user';
import useTableSelection from '@/hooks/useTableSelection';
import useDeleteTableData from '@/hooks/useDeleteTableData';
import useRemark from '@/hooks/useRemark';
import UserDeleteVue from './components/UserDelete.vue';
import UserUploadVue from './components/UserUpload.vue';
import UserAddBtnVue from './components/UserAddBtn.vue';
import DownloadBtnVue from './components/DownloadBtn.vue';

const loading = ref(false);
const requestData = (
  pagData: Ref<{ page: number; size: number; total: number }>,
  tableData: Ref<IUserInfo[]>,
  searchContent?: string
) => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    pagData.value.total = 20;

    const arr: IUserInfo[] = [];
    for (let i = 0; i < pagData.value.size; i++) {
      arr.push({
        id: `${Math.ceil(Math.random() * 1000)}${i}`,
        card: pagData.value.page + '24' + Math.ceil(Math.random() * 10000),
        name: '测/试/员',
        sex: Math.random() > 0.5 ? 0 : 1,
        job: '测试',
        grade: '22.01',
        remark: 'fdsafsaffewdfasdfadfsfedasdf'
      });
    }
    tableData.value = arr;
  }, 1000);
};

const columns = [
  {
    title: '工号',
    dataIndex: 'card'
  },
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '性别',
    dataIndex: 'sex'
  },
  {
    title: '职位',
    dataIndex: 'job'
  },
  {
    title: '最近成绩',
    dataIndex: 'grade'
  },
  {
    title: '教员备注',
    dataIndex: 'remark'
  }
];
const tableData = ref<IUserInfo[]>([]);
const pagData = ref({
  page: 1,
  size: 10,
  total: 0
});

requestData(pagData, tableData);

const onChange = (obj: { page: number; size: number }) => {
  const { page, size } = obj;
  pagData.value.page = page;
  pagData.value.size = size;

  requestData(pagData, tableData);
};

const { checkedKeys, rowSelection } = useTableSelection();
const onDelete = () => {
  const result = useDeleteTableData(checkedKeys, pagData, tableData);
  if (!result) {
    // 请求数据更新
    requestData(pagData, tableData);
  }
};

const onUploadSuccess = () => {};

const searchContent = ref('');
const onSearch = (value: string) => {
  searchContent.value = value;
  requestData(pagData, tableData, searchContent.value);
};
const onReset = () => {
  searchContent.value = '';
  requestData(pagData, tableData);
};

const { visible, value, index, onOpenRemarkModal } = useRemark();
const onUpdateRemark = (value: string) => {
  // const item = tableData.value[index.value];
  visible.value = false;
  // updateUserRemark(item.id, value).then(() => {
  //   item.remark = value;
  //   visible.value = false;

  //   messageNotice({
  //     content: '修改备注成功',
  //     type: 'success'
  //   });
  // });
};
</script>

<template>
  <div class="container">
    <SelfSearch @on-search="onSearch" @on-reset="onReset" />
    <SelfTitle title="人员信息" />
    <div class="flexbox">
      <UserAddBtnVue />
      <div class="margin_rl-20">
        <UserDeleteVue :checked-keys="checkedKeys" @del-success="onDelete" />
      </div>
      <div class="mr-20">
        <DownloadBtnVue />
      </div>
      <UserUploadVue @upload-success="onUploadSuccess" />
    </div>
    <div class="user_table">
      <a-table
        rowKey="id"
        :columns="columns"
        :data-source="tableData"
        :pagination="false"
        :loading="loading"
        :row-selection="rowSelection"
        :scroll="{ y: 'calc(100vh - var(--headerhg) - 300px)' }"
        :row-class-name="
          (_record, index) => (index % 2 === 1 ? 'table-striped' : undefined)
        ">
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.dataIndex === 'sex'">
            {{ record.sex ? '男' : '女' }}
          </template>
          <template v-if="column.dataIndex === 'remark'">
            <div class="table_btn--text">
              <a-button
                type="link"
                block
                @click="onOpenRemarkModal(index, record.remark)"
                >详情</a-button
              >
            </div>
          </template>
        </template>
      </a-table>
    </div>
    <SelfPagination
      :total="pagData.total"
      :curr-page="pagData.page"
      :size="pagData.size"
      @changepag="onChange" />

    <AntModalUpdate
      v-model:visible="visible"
      :value="value"
      @confirm-update="onUpdateRemark" />
  </div>
</template>

<style lang="scss" scoped>
.user_table {
  flex: 1;
  padding: 10px 0px;

  .table_btn--text {
    width: 60px;

    :deep(.ant-btn) {
      padding-left: 0px;
      text-align: left;
    }
  }

  :deep(.ant-table-container > .ant-table-body) {
    // 祖先元素如不设置显式宽度，则开启表格纵向滚动且高度未达到时隐藏滚动条，则表格宽度将不正常。
    overflow-y: auto !important;
  }

  :deep(.table-striped) {
    background-color: #fafafa;
  }
}
</style>
