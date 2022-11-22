import { defineStore } from 'pinia';
import { IBreadcrumb } from '@/types/setting';

const useSetting = defineStore('setting', {
  state: () => {
    return {
      breadcrumbs: [] as IBreadcrumb[]
    };
  },
  actions: {
    setBreadcrumbs(value: IBreadcrumb[]) {
      this.breadcrumbs = value;
    }
  }
});

export default useSetting;
