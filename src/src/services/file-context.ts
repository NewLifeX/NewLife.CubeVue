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
  console.log('获取文件', id)
  //   console.log(__webpack_require__)
  //   return __webpack_require__(id)
  id = resolve(id)
  if (!id) {
    throw new Error('找不到模块：' + id)
  }
  return map[id]
}

const keys = function fileContextKeys() {
  return Object.keys(map)
}

const addFiles = function fileContextAddFiles(
  files: __WebpackModuleApi.RequireContext
) {
  files.keys().forEach((value) => {
    const id = files.resolve(value)
    map[id] = files(value)
  })
}

const resolve = (id: any) => {
  if (id.startsWith('@/')) {
    id = id.replace('@/', './src/')
  }

  if (keys().includes(id)) {
    return id
  } else {
    return null
  }
}

fileContext.addFiles = addFiles
fileContext.id = 'fileContext'
fileContext.keys = keys
fileContext.resolve = resolve

export default fileContext
