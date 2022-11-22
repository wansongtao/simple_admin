import axios, { AxiosError, AxiosResponse } from 'axios';
import messageNotice from './message';
import useUser from '@/store/user';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;'
  }
});

instance.interceptors.request.use(
  (config) => {
    // 如果这里的代码出现错误，会触发响应拦截器（不是请求拦截器）的错误事件
    const store = useUser();
    const token = store.token || store.getToken();

    if (token && config.headers) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (
    res: AxiosResponse<
      { code: number; msg: string; data: unknown },
      any
    >
  ) => {
    const data = res.data;

    /**
     * 未登录或token过期
     * @returns 
     */
    const afreshLogin = () => {
      messageNotice({
        content: data.msg,
        type: 'error',
        duration: 2 * 1000
      });

      const store = useUser();
      store.removeToken();

      // 跳转到登录页
      location.href = `${location.origin}/edu/#/login?redirect=${encodeURIComponent(location.href)}`;
      return Promise.reject(new Error(data.msg || 'Error'));
    };

    /**
     * 权限不够，不能进入该系统
     * @returns 
     */
    const noAuth = () => {
      messageNotice({
        content: data.msg,
        type: 'error',
        duration: 2 * 1000
      });

      // 返回上个页面
      window.history.back();
      return Promise.reject(new Error(data.msg || 'Error'));
    };

    const strategy: Record<number, Function> = {
      100101: afreshLogin,
      100108: afreshLogin,
      100100: noAuth,
      100113: noAuth,
      100111: noAuth,
      100112: noAuth
    };

    if (strategy[data.code] instanceof Function) {
      return strategy[data.code]();
    }

    if (data.code !== 0 && data.code !== undefined) {
      messageNotice({
        content: data.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      });

      return Promise.reject(new Error(data.msg || 'Error'));
    }

    return data;
  },
  (error: AxiosError) => {
    // 处理取消请求的错误
    if (error.code === 'ERR_CANCELED') {
      return Promise.reject(error);
    }

    // 超出 2xx 范围的http状态码都会触发该函数
    messageNotice({
      content: error.response?.statusText || error.message,
      type: 'error'
    });

    return Promise.reject(error);
  }
);

export default instance;
