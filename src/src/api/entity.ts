export default function(stroe: any) {
  function getEntityFields(path: any, kind: any) {
    const request = stroe.getters.request
    const urls = stroe.getters.urls
    const params = {
      kind
    }
    return request({
      url: path + urls.getEntityFields,
      method: 'get',
      params
    })
  }

  function getDetailFields(path: any) {
    return getEntityFields(path, 'Detail')
  }
  function getEditFormFields(path: any) {
    return getEntityFields(path, 'EditForm')
  }
  function getAddFormFields(path: any) {
    return getEntityFields(path, 'AddForm')
  }
  function getListFields(path: any) {
    return getEntityFields(path, 'List')
  }

  /**
   * 获取表对应的列
   * @param {*} path 基础请求路径
   * @returns
   */
  function getColumns(path: any) {
    const request = stroe.getters.request
    const urls = stroe.getters.urls
    return request({
      url: path + urls.getColumns,
      method: 'get'
    })
  }

  function getDataList(path: any, page: any) {
    const request = stroe.getters.request
    const urls = stroe.getters.urls
    return request({
      url: path + urls.getDataList,
      method: 'post',
      data: page
    })
  }

  function getData(path: any, id: any) {
    const request = stroe.getters.request
    const urls = stroe.getters.urls
    const params = {
      id
    }
    return request({
      url: path + urls.getData,
      method: 'get',
      params
    })
  }

  function getDetailData(path: any, id: any) {
    const request = stroe.getters.request
    const urls = stroe.getters.urls
    const params = {
      id
    }
    return request({
      url: path + urls.getDetailData,
      method: 'get',
      params
    })
  }

  function deleteById(path: any, id: any) {
    const request = stroe.getters.request
    const urls = stroe.getters.urls
    const params = {
      id
    }
    return request({
      url: path + urls.deleteById,
      method: 'get',
      params
    })
  }

  function add(path: any, entity: any) {
    const request = stroe.getters.request
    const urls = stroe.getters.urls
    return request({
      url: path + urls.add,
      method: 'post',
      data: entity
    })
  }

  function edit(path: any, entity: any) {
    const request = stroe.getters.request
    const urls = stroe.getters.urls
    return request({
      url: path + urls.edit,
      method: 'post',
      data: entity
    })
  }

  return {
    getColumns,
    getDetailFields,
    getEditFormFields,
    getAddFormFields,
    getListFields,
    getDataList,
    getData,
    getDetailData,
    add,
    edit,
    deleteById
  }
}
