// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import routeProps from './routeProps.js';

if (process.env.NODE_ENV === 'development') {
  Object.entries(routeProps).forEach(([key, value]) => {
    const internalProps = ['path', 'id', 'parentId', 'isLayout', 'isWrapper', 'layout', 'clientLoader'];
    Object.keys(value).forEach((prop) => {
      if (internalProps.includes(prop)) {
        throw new Error(
          `[UmiJS] route '${key}' should not have '${prop}' prop, please remove this property in 'routeProps'.`
        )
      }
    })
  })
}


export async function getRoutes() {
  const routes = {"index":{"path":"/","id":"index","parentId":"@@/global-layout"},"docs":{"path":"docs","id":"docs","parentId":"@@/global-layout"},"@@/global-layout":{"id":"@@/global-layout","path":"/","isLayout":true}} as const;
  return {
    routes,
    routeComponents: {
'index': () => import(/* webpackChunkName: "src__pages__index" */'../../../src/pages/index.vue'),
'docs': () => import(/* webpackChunkName: "src__pages__docs" */'../../../src/pages/docs.vue'),
'@@/global-layout': () => import(/* webpackChunkName: "layouts__index" */'E:/Src/osproj/X/newlife-cube-vueui/src/layouts/index.vue'),
},
  };
}
