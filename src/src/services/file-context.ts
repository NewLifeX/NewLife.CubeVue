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
const map: any = {}

function fileContext(id: string) {
  if (id.startsWith('@/')) {
    id = id.replace('@/', './src/')
  }
  console.log('获取文件', id)
  //   console.log(__webpack_require__)
  //   return __webpack_require__(id)

  if (!Object.keys(map).includes(id)) {
    throw new Error('找不到模块：' + id)
  }
  return map[id]
}

fileContext.keys = function fileContextKeys() {
  return Object.keys(map)
}

fileContext.addFiles = function fileContextAddFiles(
  files: __WebpackModuleApi.RequireContext
) {
  files.keys().forEach((value) => {
    const id = files.resolve(value)
    map[id] = files(value)
  })
}

export default fileContext
