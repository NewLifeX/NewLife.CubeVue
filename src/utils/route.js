/**
 * 将菜单转化成路由
 * @param {*} routes 请求返回菜单
 */
export function formatRoutes(files, routes, depth = 0) {
  const fileKeys = files.keys()
  routes.forEach((router) => {
    router.path = router.url
    router.name = router.name

    // 第一层使用布局模板
    if (depth === 0) {
      router.component = (resolve) => {
        require(['@/views/layout/index.vue'], resolve)
      }
    } else {
      // 目前只按照两层处理
      const path = `.${router.path}/list.vue`
      router.component = (resolve) => {
        // 先尝试加载自定义视图，不存在使用默认视图
        if (fileKeys.includes(path)) {
          resolve(files(path))
        } else {
          resolve(files('./common/list.vue'))
        }
      }

      // 添加、编辑页路由
      routes.push(getEditRoute(files, router, router.path))
    }

    let children = router.children
    if (children && children instanceof Array) {
      children = formatRoutes(files, children, depth + 1)
    }

    router.children = children
  })

  return routes
}

function getEditRoute(files, router, path) {
  const fileKeys = files.keys()
  // 添加、编辑页路由
  const r = {
    hidden: true,
    path: `${path}/:type(Edit|Add|Detail)/:id?`,
    // path: `User/Edit/:id?`,
    name: router.name,
    component: (resolve) => {
      // 先尝试加载自定义视图，不存在使用默认视图
      path = `.${path}/form.vue`
      if (fileKeys.includes(path)) {
        resolve(files(path))
      } else {
        resolve(files('./common/form.vue'))
      }
    },
  }

  return r
}
