import router from '@/router/index';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import useUser from '@/store/user';

NProgress.configure({ showSpinner: false });

const whites = ['/login'];
router.beforeEach((to) => {
  NProgress.start();

  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = import.meta.env.VITE_TITLE;
  }

  const store = useUser();
  const token = store.getToken();
  if (to.name === 'Login' && token) {
    return { name: 'Index' };
  }
  if (!whites.includes(to.path) && !token) {
    return { name: 'Login' };
  }
});

router.afterEach(() => {
  NProgress.done();
});
