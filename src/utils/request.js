import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import urls from '@/api/constant'

const service = axios.create({
  timeout: 50000,
})

// 是否正在弹窗
let isLoginTimeout = false

service.interceptors.request.use(
  (config) => {
    // api 的 base_url
    // 在此处设置baseURL，避免直接依赖store，如果放在上面create方法，store为空
    config.baseURL = urls.baseUrl

    // 所有请求默认是json格式，除了上传文件，不用表单
    config.headers['Content-Type'] = 'application/json; charset=UTF-8'

    if (store.getters.token) {
      // 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
      config.headers['Authorization'] = store.getters.token
    }

    return config
  },
  (error) => {
    console.log(error)
    // Message({
    //   message: error,
    //   type: 'error',
    //   duration: 5 * 1000,
    // })
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    console.log(response)
    const res = response
    if (res.status && res.status !== 200) {
      if (res.status >= 500) {
        // Message({
        //   message: '后端服务错误',
        //   type: 'error',
        //   duration: 5 * 1000,
        // })
        return Promise.reject('服务异常')
      } else if (res.status === 401) {
        // 请自行在引入 MessageBox
        // import { Message, MessageBox } from 'element-ui'
        // 如果已弹窗，不重复弹窗
        if (!isLoginTimeout) {
          isLoginTimeout = true
          // 如果当前就是login、页面则不作处理
          if (location.pathname.indexOf('/login') > 0) {
            return response
          }
          //   MessageBox.confirm(
          //     '你已被登出或者登陆失效，可以取消继续留在该页面，或者重新登录',
          //     '确定登出',
          //     {
          //       confirmButtonText: '重新登录',
          //       cancelButtonText: '取消',
          //       type: 'warning',
          //     }
          //   ).then(() => {
          //isLoginTimeout = false
          store.dispatch('Logout').then(() => {
            isLoginTimeout = false
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
          //   })
        } else {
          return response
        }
      } else {
        // Message({
        //   message: res.Msg,
        //   type: 'error',
        //   duration: 5 * 1000,
        // })
        return Promise.reject(res.data.message)
      }
    } else {
      return response
    }
  },
  (error) => {
    // console.log('err' + error) // for debug
    // Message({
    //   message: '请求错误',
    //   type: 'error',
    //   duration: 5 * 1000,
    // })
    return Promise.reject(error)
  }
)

export default service
