import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import adminRoutes from './adminRoutes';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    icon?: string;
    hidden?: boolean;
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  adminRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/notFound.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
