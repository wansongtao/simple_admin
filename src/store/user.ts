import { defineStore } from 'pinia';
import { tokenKey } from '@/config/index';
import { setStorage, getStorage, removeStorage } from '@/utils/storage';

const useUser = defineStore('user', {
  state: () => {
    return {
      token: '',
      name: '管理员',
      avatar: ''
    };
  },
  actions: {
    getToken() {
      const token = getStorage<string>(tokenKey);
      this.token = token || '';

      return this.token;
    },
    setToken(value: string) {
      this.token = value;

      setStorage({ key: tokenKey, value });
    },
    removeToken() {
      this.token = '';
      removeStorage(tokenKey);
    }
  }
});

export default useUser;
