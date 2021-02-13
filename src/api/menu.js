import request from '@/utils/request'
import urls from './constant'

export function getMenu() {
  return request({
    url: urls.getMenu,
    method: 'get',
  })
}
