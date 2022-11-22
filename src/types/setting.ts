import { RouteRecordName } from 'vue-router';

export interface IBreadcrumb {
  name: RouteRecordName;
  path?: string;
}
