import { debounce } from '@/utils';

interface IDebounce {
  global: {
    inputEle: HTMLInputElement | null;
    debounceFn: ((this: any, ...args: any[]) => void) | null;
    compositionstart: (() => void) | null;
    compositionend: ((e: CompositionEvent) => void) | null;
  };
  mounted: (
    el: HTMLElement,
    binding: {
      /**
       * 指令的值：需要防抖的函数
       */
      value: (e: Event) => any;
      modifiers: {
        /**
         * 第一次是否立即执行函数
         */
        immediate?: boolean;
        /**
         * 设置为true，则当用户使用拼音输入法开始输入时停止监听input事件，输入完成后再开始监听input事件并防抖
         */
        stopeditor?: boolean;
      };
      /**
       * 指令的参数：防抖函数的间隔时间，单位毫秒
       */
      arg?: string;
    }
  ) => void;
  beforeUnmount: () => void;
}

const vDebounce: IDebounce = {
  global: {
    inputEle: null,
    debounceFn: null,
    compositionstart: null,
    compositionend: null,
  },
  mounted: (el, binding) => {
    if (!(binding.value instanceof Function)) {
      return;
    }

    let delay: number | undefined = undefined;
    if (binding.arg) {
      const temp = Number(binding.arg);
      if (!isNaN(temp)) {
        delay = temp;
      }
    }

    const global = vDebounce.global;
    if (el.tagName === 'INPUT') {
      global.inputEle = el as HTMLInputElement;
    } else {
      const inputs = el.getElementsByTagName('input');
      if (!inputs.length) {
        console.error('vDebounce: 指令错误，缺少必要元素');
        return;
      }

      global.inputEle = inputs[0];
    }

    const immediate = binding.modifiers.immediate;
    global.debounceFn = debounce(binding.value, delay, immediate);
    global.inputEle.addEventListener('input', global.debounceFn);

    // 当用户使用拼音输入法开始输入时停止监听input事件，输入完成后再开始监听input事件
    if (binding.modifiers.stopeditor) {
      global.compositionstart = () => {
        if (global.inputEle && global.debounceFn) {
          global.inputEle.removeEventListener('input', global.debounceFn);
        }
      };
      global.inputEle.addEventListener('compositionstart', global.compositionstart);

      global.compositionend = (e) => {
        if (global.inputEle && global.debounceFn) {
          // 抛出用户使用拼音输入法输入完成后的事件，据此可获取输入的值
          binding.value(e);
          global.inputEle.addEventListener('input', global.debounceFn);
        }
      };
      global.inputEle.addEventListener('compositionend', global.compositionend);
    }
  },
  beforeUnmount: () => {
    const global = vDebounce.global;
    if (global.inputEle && global.debounceFn) {
      global.inputEle.removeEventListener('input', global.debounceFn);
      
      if (global.compositionstart) {
        global.inputEle.removeEventListener('compositionstart', global.compositionstart);
        global.compositionstart = null;
      }
      if (global.compositionend) {
        global.inputEle.removeEventListener('compositionend', global.compositionend);
        global.compositionend = null;
      }

      global.inputEle = null;
      global.debounceFn = null;
    }
  }
};

export default vDebounce;
