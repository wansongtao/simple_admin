import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import legacy from '@vitejs/plugin-legacy';

const version = require('./build/getVersion');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      // dirs: [], // 指定自己的组件位置，设置为空数组可以不自动引入自己的组件
      resolvers: [AntDesignVueResolver()]
    }),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'icon-[dir]-[name]'
    }),
    legacy({
      targets: ['defaults']
    })
  ],
  server: {
    open: true,
    host: '0.0.0.0',
    proxy: {
      '/tc-api': {
        target: 'https://mock.apifox.cn/m1/1367036-0-default',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/people-api/, '')
      }
    }
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
    extensions: ['.js', '.json', '.ts'] // 使用路径别名想省略的后缀名
  },
  define: {
    __VITE_VERSION__: JSON.stringify(version)
  },
  build: {
    target: 'es2015',
    outDir: './docker/dist'
  },
  base: '/mfb/'
});
