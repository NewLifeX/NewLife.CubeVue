import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';

const MODULE_ID_ROUTER = 'virtual:router';
const RESOLVED_MODULE_ID_ROUTER = '\0' + MODULE_ID_ROUTER;

export default function vueCubePlugin(): Plugin {
  let config;

  return {
    name: 'vite-plugin-vue-cube',
    configResolved(resolvedConfig) {
      // 存储最终解析的配置
      config = resolvedConfig;
    },
    // 判断是否为需要处理的文件
    resolveId(id, importer, options) {
      //   console.log(config.root, source);
      console.log('resolveId', id);

      if (id === 'vite:app') {
        return 'vite:app';
      } else if (id === MODULE_ID_ROUTER) {
        return RESOLVED_MODULE_ID_ROUTER;
      }

      //   if (source === path.resolve(config.root, './src/app.js')) {
      //     console.log('resolveId', arguments);

      //     return '121212';
      //   }
      //   console.log('resolveId', arguments);

      return null;
    },
    // 根据模块id，加载文件源码
    load(id, options) {
      if (id === 'vite:app') {
        console.log('load', arguments);
        return {
          code: 'export default { a:123 };',
          map: null,
        };
      } else if (id === RESOLVED_MODULE_ID_ROUTER) {
        const code = fs.readFileSync(
          path.resolve(__dirname, './router.js'),
          'utf-8',
        );
        return code;
      }
      //   console.log('load', arguments);

      return null;
    },
    // 处理文件源码
    transform(code, id, options) {
      if (id.includes('vite:app')) {
        console.log('transform', arguments);
        const m = this.getModuleInfo(id);

        console.log('m', m);
      } else if (id.endsWith('router')) {
        console.log('transform ', id, code);
      }

      //   console.log('transform', arguments);
      return code;
    },
    configureServer() {
      //   console.log('configureServer', arguments);
    },
    transformIndexHtml(html) {
      //   console.log('transformIndexHtml', arguments);
      return html;
    },
  };
}
