import request from '@/utils/request'
import urls from './constant'

//获取可用数据库连接列表
export function getDbList(path) {
  return request({
    url: path + urls.getDbList,
    method: 'post', 
  })
}