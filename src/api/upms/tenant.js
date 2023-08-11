import request from '@/router/axios'

export function getPage(query) {
  return request({
    url: '/upms/tenant/page',
    method: 'get',
    params: query
  })
}

export function getList(query) {
  return request({
    url: '/upms/tenant/list',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/upms/tenant',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/upms/tenant/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/upms/tenant/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/upms/tenant',
    method: 'put',
    data: obj
  })
}

export function getObjOutSide(id) {
  return request({
    url: '/upms/tenant/outside/' + id,
    method: 'get'
  })
}

export function getPageOutSide(query) {
  return request({
    url: '/upms/tenant/outside/page',
    method: 'get',
    params: query
  })
}

export function putObjStatus(obj) {
  return request({
    url: '/upms/tenant/status',
    method: 'put',
    data: obj
  })
}

export function getListMy(query) {
  return request({
    url: '/upms/tenant/list/my',
    method: 'get',
    params: query
  })
}
