// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import { inject } from 'vue';
import { AppContextKey } from 'E:/Src/osproj/X/newlife-cube-vueui/node_modules/.pnpm/registry.npmmirror.com+@umijs+renderer-vue@4.0.53_xsxatmlnmmg5bcuv3xdnj6fj7y/node_modules/@umijs/renderer-vue';

export function useAppData() {
  const state = inject(AppContextKey);
  if (!state) {
    throw new Error('AppContext is no provide');
  }

  return state;
}
