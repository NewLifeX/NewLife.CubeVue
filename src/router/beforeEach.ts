import { getToken } from '@/utils/token' // getToken from cookie

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

export default (to: any, from: any, next: any) => {
  if (getToken()) {
    // 有token，又去登录页，跳回主页
    if (to.path === '/login') {
      next({
        path: '/'
      })
    } else {
      next()
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
