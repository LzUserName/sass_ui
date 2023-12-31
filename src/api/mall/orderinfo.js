/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
import request from '@/router/axios'

export function getPage(query) {
  return request({
    url: '/mall/orderinfo/page',
    method: 'get',
    params: query
  })
}

export function getCount(query) {
  return request({
    url: '/mall/orderinfo/count',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/mall/orderinfo',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/mall/orderinfo/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/mall/orderinfo/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/mall/orderinfo',
    method: 'put',
    data: obj
  })
}

export function editPrice(obj) {
  return request({
    url: '/mall/orderinfo/editPrice',
    method: 'put',
    data: obj
  })
}

export function orderCancel(id) {
  return request({
    url: '/mall/orderinfo/cancel/' + id,
    method: 'put'
  })
}

export function takeGoods(id) {
  return request({
    url: '/mall/orderinfo/takegoods/' + id,
    method: 'put'
  })
}

export function getStatistics(query) {
  return request({
    url: '/mall/orderinfo/statistics',
    method: 'get',
    params: query
  })
}

export function getStatisticsByColumn(column, query) {
  return request({
    url: '/mall/orderinfo/statistics/'+column,
    method: 'get',
    params: query
  })
}

export function delivery(obj) {
  return request({
    url: '/mall/orderinfo/delivery',
    method: 'put',
    data: obj
  })
}
