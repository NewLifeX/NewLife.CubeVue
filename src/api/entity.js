import request from '@/utils/request'
import urls from './constant'

function getEntityFields(path, kind) {
  let params = {
    kind,
  }
  return request({
    url: path + urls.getEntityFields,
    method: 'get',
    params,
  })
}

export function getDetailFields(path) {
  return getEntityFields(path, 'Detail')
}
export function getEditFormFields(path) {
  return getEntityFields(path, 'EditForm')
}
export function getAddFormFields(path) {
  return getEntityFields(path, 'AddForm')
}
export function getListFields(path) {
  return getEntityFields(path, 'List')
}

export function getDataList(path, page) {
  return request({
    url: path + urls.getDataList,
    method: 'post',
    data: page,
  })
}

export function getData(path, id) {
  let params = {
    id,
  }
  return request({
    url: path + urls.getData,
    method: 'get',
    params,
  })
}

export function deleteById(path, id) {
  let params = {
    id,
  }
  return request({
    url: path + urls.deleteById,
    method: 'get',
    params,
  })
}

export function add(path, entity) {
  return request({
    url: path + urls.add,
    method: 'post',
    data: entity,
  })
}

export function edit(path, entity) {
  return request({
    url: path + urls.edit,
    method: 'post',
    data: entity,
  })
}
