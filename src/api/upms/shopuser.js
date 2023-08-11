import request from '@/router/axios'

export function getPage(query) {
  return request({
    url: '/upms/shopuser/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/upms/shopuser',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/upms/shopuser/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/upms/shopuser/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/upms/shopuser',
    method: 'put',
    data: obj
  })
}

export function editPassword(obj) {
  return request({
    url: '/upms/user/password',
    method: 'put',
    data: obj
  })
}
