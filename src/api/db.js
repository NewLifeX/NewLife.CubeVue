import stroe from '@/store'

//获取可用数据库连接列表
export function getDbList(path) {
  const request = stroe.getters.request
  const urls = stroe.getters.urls
  return request({
    url: path + urls.getDbList,
    method: 'post',
  })
}
