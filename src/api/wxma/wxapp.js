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
    url: '/weixin/wxapp/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/weixin/wxapp',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/weixin/wxapp/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/weixin/wxapp/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/weixin/wxapp',
    method: 'put',
    data: obj
  })
}

export function getList(query) {
  return request({
    url: '/weixin/wxapp/list',
    method: 'get',
    params: query
  })
}

export function createQrCode(obj) {
  return request({
    url: '/weixin/wxapp/qrCode',
    method: 'post',
    data: obj
  })
}

export function clearQuota(obj) {
  return request({
    url: '/weixin/wxapp/quota',
    method: 'put',
    data: obj
  })
}

export function getAccessToken(query) {
  return request({
    url: '/weixin/wxapp/access-token',
    method: 'get',
    params: query
  })
}

export function getUserSummary(query) {
  return request({
    url: '/weixin/wxapp/usersummary',
    method: 'get',
    params: query
  })
}

export function getUserCumulate(query) {
  return request({
    url: '/weixin/wxapp/usercumulate',
    method: 'get',
    params: query
  })
}

export function getInterfaceSummary(query) {
  return request({
    url: '/weixin/wxapp/interfacesummary',
    method: 'get',
    params: query
  })
}

export function getAuthorizerInfo(id) {
  return request({
    url: '/weixin/open/api/authorizer-info/' + id,
    method: 'get'
  })
}

export function getCodeTemplateList() {
  return request({
    url: '/weixin/open/ma/code/template/list',
    method: 'get'
  })
}

export function commitCode(obj) {
  return request({
    url: '/weixin/open/ma/code/'+obj.appId+'/commit',
    method: 'post',
    data: obj
  })
}

export function getMaPage(appId) {
  return request({
    url: '/weixin/open/ma/code/'+appId+'/page',
    method: 'get'
  })
}

export function submitCode(obj) {
  return request({
    url: '/weixin/open/ma/code/'+obj.appId+'/submit',
    method: 'post'
  })
}

export function getLatestAuditstatus(appId) {
  return request({
    url: '/weixin/open/ma/code/'+appId+'/auditstatus',
    method: 'get'
  })
}

export function undoCodeAudit(appId) {
  return request({
    url: '/weixin/open/ma/code/'+appId+'/undocodeaudit',
    method: 'get'
  })
}

export function getQrCode(appId) {
  return request({
    url: '/weixin/open/ma/code/'+appId+'/qrcode',
    method: 'get'
  })
}

export function getScreenShot(appId, mediaId) {
  return request({
    url: '/weixin/open/ma/code/'+appId+'/screenshot/'+mediaId,
    method: 'get'
  })
}

export function releaseCode(appId,auditId) {
  return request({
    url: '/weixin/open/ma/code/'+appId+'/'+auditId+'/release',
    method: 'post'
  })
}

export function serverAddressGet(obj) {
  return request({
    url: '/weixin/open/ma/settings/'+obj.appId+'/serveraddress',
    method: 'get'
  })
}

export function serverAddressSet(obj) {
  return request({
    url: '/weixin/open/ma/settings/'+obj.appId+'/serveraddress',
    method: 'post',
    data: obj
  })
}

export function getWxMaCodeAudit(query) {
  return request({
    url: '/weixin/wxmacodeaudit/one',
    method: 'get',
    params: query
  })
}

export function getMaCode(obj) {
  return request({
    url: '/weixin/wxqrcode/unlimited',
    method: 'post',
    data: obj
  })
}

export function privacySettingGet(query) {
  return request({
    url: '/weixin/wxmaprivacysetting/get/'+query.appId,
    method: 'get',
    params: query
  })
}

export function privacySettingSet(obj) {
  return request({
    url: '/weixin/wxmaprivacysetting/set/'+obj.appId,
    method: 'post',
    data: obj
  })
}
export function getMaMedia(appId, mediaId) {
  return request({
    url: '/weixin/wxmamedia/' + appId + '/' + mediaId,
    method: 'get',
  })
}
