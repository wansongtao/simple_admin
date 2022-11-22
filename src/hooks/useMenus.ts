import { RouteRecordRaw } from 'vue-router';
import adminRoutes from '@/router/adminRoutes';

/**
 * 获取需要渲染的路由菜单
 * @param isOneMerge 只存在一个子路由时，是否合并到父路由
 * @returns 
 */
const useMenus = (isOneMerge = true): RouteRecordRaw[] => {
  const children = adminRoutes.children;
  if (children === undefined || children.length === 0) {
    return [];
  }

  const getMountMenu = (value: RouteRecordRaw[]) => {
    return value.filter((val) => {
      if (val.children && val.children.length) {
        val.children = getMountMenu(val.children);
      }

      return !val.meta?.hidden;
    });
  };
  // 过滤掉不需要渲染的路由菜单
  const simpleMenus = getMountMenu(children);

  // 为需要渲染的路由菜单添加公共路径
  const commonPath = adminRoutes.path;
  const menus = simpleMenus.map((val) => {
    return {
      ...val,
      path: `${commonPath}${val.path}`
    };
  });

  const addPathPrev = (path: string) => {
    if (path && path.indexOf('/') !== 0) {
      return `/${path}`;
    }

    return path;
  };

  /**
   * 去除路径上的参数，例如：/user/:id => /user
   * @param path 
   */
  const getRealPath = (path: string) => {
    if (!path) {
      return path;
    }

    const idx = path.indexOf('/:');
    if (idx === -1) {
      return path;
    }

    return path.substring(0, idx);
  };

  const realMenu = (menu: RouteRecordRaw[], isPrev = false) => {
    return menu.map((val) => {
      if (val.children && val.children.length) {
        // 如果父路由的路径是‘/’，则不用为子路由添加前缀'/'
        if (val.path === '/') {
          val.children = realMenu(val.children, true);
        } else {
          val.children = realMenu(val.children);
        }

        // 只有一个需要渲染的子路由则合并
        if (isOneMerge && val.children.length === 1) {
          const item = val.children[0] as RouteRecordRaw;

          const backVal = {
            ...val,
            path: val.path + item.path,
            meta: {
              ...val.meta,
              ...item.meta
            }
          };

          delete backVal.children;
          return backVal;
        }
      }

      const path = isPrev ? getRealPath(val.path) : getRealPath(addPathPrev(val.path));
      return {
        ...val,
        path
      };
    });
  };

  return realMenu(menus);
};

export default useMenus;
