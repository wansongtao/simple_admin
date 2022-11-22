import { onActivated, onDeactivated, ref } from 'vue';
import { updateDuration } from '@/config/index';

/**
 * 在onActivated生命周期定时执行方法，onDeactivated生命周期移除定时器(进入页面也会刷新数据)
 * 页面隐藏时，不执行定时方法
 * @param fn 需要定时执行的函数
 * @param isInitial 在onActivated生命周期是否先执行一遍方法，默认是
 * @param duration 间隔时间，单位秒
 */
const useRegularUpdate = (
  fn: Function,
  isInitial: boolean = true,
  duration: number = updateDuration
) => {
  const timer = ref<NodeJS.Timer | null>(null);

  /**
   * 设置定时器，定时执行方法
   */
  const setTimer = () => {
    if (timer.value) {
      return;
    }

    timer.value = setInterval(() => {
      fn();
    }, duration * 1000);
  };

  /**
   * 移除定时器
   */
  const removeTimer = () => {
    timer.value && clearInterval(timer.value);
    // 释放定时器id
    timer.value = null;
  };

  /**
   * 页面状态改变时，设置/移除定时器
   */
  const pageStateChange = () => {
    const ploy = {
      visible() {
        setTimer();
      },
      hidden() {
        removeTimer();
      }
    };

    const state = document.visibilityState;
    ploy[state]();
  };

  onActivated(() => {
    if (isInitial) {
      // 进入页面时，刷新数据
      fn();
    }

    setTimer();
    document.addEventListener('visibilitychange', pageStateChange);
  });

  onDeactivated(() => {
    removeTimer();
    document.removeEventListener('visibilitychange', pageStateChange);
  });

  return {
    setTimer,
    removeTimer
  };
};

export default useRegularUpdate;
