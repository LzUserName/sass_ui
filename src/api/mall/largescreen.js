/**
 * Copyright (C) 2022-2025
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
import request from '@/router/axios'
//查询统计
export function statistics(query) {
  return request({
    url: '/mall/largescreen/statistics',
    method: 'get',
    params: query
  })
}
// 订单数量分析
export function ordercount(query) {
  return request({
    url: '/mall/largescreen/statistics/ordercount',
    method: 'get',
    params: query
  })
}
// 销售金额分析
export function saleamount(query) {
  return request({
    url: '/mall/largescreen/statistics/saleamount',
    method: 'get',
    params: query
  })
}
// 商品销量分析
export function spusale(query) {
  return request({
    url: '/mall/largescreen/statistics/spusale',
    method: 'get',
    params: query
  })
}

