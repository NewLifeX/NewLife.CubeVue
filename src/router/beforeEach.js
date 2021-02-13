import router from '@/router'
import store from '@/store'
// import { Message } from 'element-ui'
import { getToken } from '@/utils/token' // getToken from cookie

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

export default (to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next({
        path: '/',
      })
    } else {
      if (!store.getters.userInfo) {
        // 判断当前用户是否已拉取完user_info信息
        store
          .dispatch('GetUserInfo')
          .then(() => {
            store.dispatch('GenerateRoutes').then(() => {
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              next({
                ...to,
                replace: true,
              }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })
          })
          .catch((err) => {
            console.log(err)
            store.dispatch('Logout').then(() => {
              //   Message.error(err || 'Verification failed, please login again')
              next({
                path: '/',
              })
            })
          })
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
}
