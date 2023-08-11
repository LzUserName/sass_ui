/**
 * Copyright (C) 2018-2022
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
/**
 * 商城用户在线统计管理
 *
 * 客户端类型：小程序，普通H5，微信H5（公众号），PC，APP
 * clientType: "MA";"H5";"H5-WX";"H5-PC";"APP";
 */
import request from '@/router/axios'

/**
 * 获取指定商城端在线用户的数量
 * @param clientType "MA";"H5";"H5-WX";"H5-PC";"APP";
 * @returns {*}
 */
export function getCount(clientType) {
  return request({
    url: `/mall/useronline/count/${clientType}`,
    method: 'get',
  })
}

/**
 * 获取指定商城端用户的最后在线时间
 * @param clientType "MA";"H5";"H5-WX";"H5-PC";"APP";
 * @param clientType userId
 * @returns {*}
 */
export function getCountByUserId(clientType, userId) {
  return request({
    url: `/mall/useronline/score/${clientType}/${userId}`,
    method: 'get',
  })
}
