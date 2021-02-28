import stroe from '@/store'

export function getMenu() {
  const request = stroe.getters.request
  const urls = stroe.getters.urls
  return request({
    url: urls.getMenu,
    method: 'get',
  })
}
