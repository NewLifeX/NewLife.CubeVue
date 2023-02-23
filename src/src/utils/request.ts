import { getApi } from '@/api'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage as message, ElMessageBox as messageBox } from 'element-plus'
import { App } from 'vue'
import { getToken } from './token'
// import JSONbig from 'json-bigint'

// 是否正在弹窗
let isLoginTimeout = false

function handle401() {
  // 如果已弹窗，不重复弹窗
  if (!isLoginTimeout) {
    isLoginTimeout = true
  } else {
    console.log('登录超时，已弹窗，尝试关闭已打开的弹窗')
    try {
      // 关闭所有弹窗
      messageBox.close()
    } catch (error) {}
  }

  messageBox
    .confirm('登陆超时，可以取消继续留在该页面，或者重新登录', '确定登出', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning'
    })
    .then(() => {
      isLoginTimeout = false
      getApi()
        .user.logout()
        .then(() => {
          isLoginTimeout = false
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
    })

  return Promise.reject('登录超时')
}

function handle403(res: any) {
  message({
    message: res.message,
    type: 'warning',
    duration: 5 * 1000
  })
  return Promise.reject('没有权限')
}

const axiosRequestConfig: AxiosRequestConfig = {
  timeout: 50000
  // // 响应拦截处理大数值
  // transformResponse: [
  //   (data) => {
  //     try {
  //       // 使用正则将长整数替换为字符串
  //       data = data.replace(/(\d{16,})/gi, '"$1"')
  //       return JSON.parse(data)
  //       // // 使用json-bigint将大数值转成
  //       // data = JSONbig.parse(data)
  //       // return data
  //     } catch (err) {
  //       return data
  //     }
  //   }
  // ]
}

const interceptorsConfig = {
  request: (
    config: AxiosRequestConfig
  ): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
    // 所有请求默认是json格式，除了上传文件，不用表单
    config.headers['Content-Type'] = 'application/json; charset=UTF-8'

    const token = getToken()
    if (token) {
      // 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
      config.headers.Authorization = token
    }

    return config
  },
  requestError: (error: any): any => {
    console.log(error)
    message({
      message: error,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  },
  response: (
    response: AxiosResponse<any>
  ): AxiosResponse<any> | Promise<AxiosResponse<any>> => {
    // console.log(response)
    // http状态不是200不会到这里
    let res = response.data
    if (typeof res === 'string') {
      res = JSON.parse(res)
    }
    if (res.code !== undefined && res.code !== null) {
      if (res.code >= 500) {
        message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject('后端服务错误')
      } else if (res.code === 401) {
        return handle401()
      } else if (res.code === 403) {
        return handle403(res)
      } else {
        return res
      }
    } else {
      console.log('格式错误', res) // for debug
      message({
        message: '服务端返回格式不正确!!!请联系管理员',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('服务端返回格式不正确')
    }
  },
  responseError: (error: any): any => {
    if (error.message === 'Request failed with status code 401') {
      handle401()
    } else if (error.message === 'Request failed with status code 403') {
      handle403({ message: '没有权限！' })
    } else {
      console.log('err', error, JSON.stringify(error)) // for debug
      message({
        message: '服务请求出错',
        type: 'error',
        duration: 5 * 1000
      })
    }

    return Promise.reject(error)
  }
}

export const createAxios = (
  app: App<Element>,
  options: ((config: AxiosRequestConfig) => void) | undefined = undefined,
  configure:
    | ((config: typeof interceptorsConfig) => void)
    | undefined = undefined
) => {
  if (options) {
    options(axiosRequestConfig)
  }

  if (configure) {
    configure(interceptorsConfig)
  }

  const service = (app.config.globalProperties.$http = axios.create(
    axiosRequestConfig
  ))

  const config = interceptorsConfig
  service.interceptors.request.use(config.request, config.requestError)

  service.interceptors.response.use(config.response, config.responseError)

  return service
}
