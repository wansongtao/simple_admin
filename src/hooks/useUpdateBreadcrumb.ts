import { RouteRecordNormalized, useRouter } from 'vue-router';
import useSetting from '@/store/setting';

/**
 * 如果面包屑中没有父页面（进入此页面的入口页面）的历史时，添加进面包屑中
 * @returns
 */
const useUpdateBreadcrumb = () => {
  const router = useRouter();
  const breadcrumbs = router.currentRoute.value.matched.map((val) => {
    return {
      name: val.meta?.title || val.name || '',
      path: val.path
    };
  });

  const findRoute = (routes: RouteRecordNormalized[], path: string) => {
    return routes.find((value) => {
      if (value.path === path) {
        return true;
      }

      // special route processing, example: '/user/:id'
      if (value.path.search(/\/:[0-9a-z]+$/gi) !== -1) {
        const reg = new RegExp(
          `^${value.path.replace(/\/:[0-9a-z]+$/gi, '/[0-9a-z]+')}$`
        );

        if (reg.test(path)) {
          return true;
        }
      }
    });
  };
  const prevPath = router.options.history.state.back as string;
  const prevRoute = findRoute(router.getRoutes(), prevPath);
  if (!prevRoute) {
    return;
  }

  if (breadcrumbs.some((val) => val.path === prevPath)) {
    return;
  }

  // add the historical route to the breadcrumbs
  breadcrumbs.splice(breadcrumbs.length - 1, 0, {
    name: prevRoute.meta?.title || (prevRoute.name as string),
    path: prevPath
  });
  const settingStore = useSetting();
  settingStore.setBreadcrumbs(breadcrumbs);
};

export default useUpdateBreadcrumb;
