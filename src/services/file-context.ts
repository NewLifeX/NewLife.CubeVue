// const map = state.files.map || {}
// files.keys().forEach((key: any) => {
//   map[key] = files(key)
// })
// state.files = function(req: any) {
//   return map[req]
// }
// state.files.map = map
// state.files.keys = function() {
//   return Object.keys(map)
// }

// { "./src/views/account/login.vue": VueComponet }
const map: any = {};

function context(id: string) {
  // console.log('获取文件', id)
  //   console.log(__webpack_require__)
  //   return __webpack_require__(id)
  const req = resolve(id);
  if (!req) {
    throw new Error('找不到模块：' + id);
  }
  return map[req];
}

const keys = function fileContextKeys() {
  return Object.keys(map);
};

const addFiles = function fileContextAddFiles(files: any) {
  files.keys().forEach((value: any) => {
    // 在本地调试的时候“files.resolve(value)”获取的id是“./src”开头的路径
    // 打包后运行获取到的是一个4位长的编码
    // const id = files.resolve(value)
    map[value] = files(value);
  });
};

/**
 * 解析组件，id传值路径规则：src目录为起始目录
 * 例如：./App.vue
 */
const resolve = (id: any) => {
  if (id.startsWith('@/')) {
    id = id.replace('@/', './');
  }

  if (keys().includes(id)) {
    return id;
  } else {
    return null;
  }
};

context.addFiles = addFiles;
context.id = 'fileContext';
context.keys = keys;
context.resolve = resolve;

export const fileContext = context;
export default fileContext;
