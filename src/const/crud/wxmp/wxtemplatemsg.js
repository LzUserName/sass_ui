/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
import {attributeDicData} from '@/const/crud/wxma/wxtemplatemsg'

export const tableOption = {
  dialogDrag: false,
  border: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  dialogWidth: '80%',
  menuType: 'text',
  searchShow: false,
  excelBtn: true,
  printBtn: true,
  addBtn: false,
  viewBtn: true,
  column: [
    {
      label: '是否启用',
      prop: 'enable',
      type: 'radio',
      search: true,
      sortable: true,
      span: 8,
      rules: [{
        required: true,
        message: '请选择启用状态',
        trigger: 'blur'
      }],
      dicData: [{
        label: '关闭',
        value: '0'
      },{
        label: '启用',
        value: '1'
      }]
    },
    {
      label: '用途',
      prop: 'useType',
      type: 'select',
      search: true,
      sortable: true,
      formslot: true,
      span: 12,
      rules: [{
        required: true,
        message: '请选择用途',
        trigger: 'blur'
      }],
      dicData: [{
        label: '订单提交成功',
        value: '1'
      },{
        label: '订单支付成功',
        value: '2'
      },{
        label: '订单发货提醒',
        value: '3'
      }]
    },
    {
      label: '模板ID',
      prop: 'priTmplId',
      span: 8,
      rules: [{
        required: true,
        message: '请输入模板ID',
        trigger: 'blur'
      }],
    },
    {
      label: '模版标题',
      prop: 'title',
      span: 8,
      rules: [{
        required: true,
        message: '请输入模版标题',
        trigger: 'blur'
      }],
    },

    {
      label: '模版预览',
      hide: true,
      prop: 'preview',
      span: 8,
    },
    {
      label: '模版内容',
      prop: 'content',
      type: 'dynamic',
      hide: true,
      span: 16,
      rules: [{
        required: true,
        message: '请输入模版内容',
        trigger: 'blur'
      }],
      children: {
        align: 'center',
        headerAlign: 'center',
        height: '340px',
        column: [{
          label: '名称',
          prop: 'name',
          rules: [{
            required: true,
            message: '请输入模版标题',
            trigger: 'blur'
          }]
        },
        //  微信新版模板消息不支持颜色
        //   {
        //   label: '颜色',
        //   prop: 'color',
        //   type: 'color',
        //   colorFormat: 'hex',
        //   showAlpha: false
        // },
          {
          label: '对应属性（可直接输入固定信息）',
          prop: 'attribute',
          type: 'select',
          filterable: true,
          allowCreate: true,
          rules: [{
            required: true,
            message: '请选择对应属性',
            trigger: 'blur'
          }],
          dicData: attributeDicData
        }
        ]
      }
    },
    {
      label: '小程序',
      prop: 'maAppId',
      type: 'select',
      hide: true,
      props: {
        label: 'name',
        value: 'id'
      },
      filterable: true,
      dicUrl: '/weixin/wxapp/list?appType=1',
      tip: '用户点击模板信息将跳转到该小程序的相应页面（该小程序appid必须与发模板消息的公众号是绑定关联关系）'
    },
  ]
}

export const tableOption2 = {
  dialogDrag: false,
  border: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  menuType: 'text',
  searchShow: false,
  addBtn: false,
  viewBtn: true,
  column: [
    {
      label: '模板ID',
      prop: 'templateId',
      rules: [{
        required: true,
        message: '请输入模板ID',
        trigger: 'blur'
      }],
    },
    {
      label: '跳转链接',
      prop: 'url',
      tip: '模板跳转链接（海外帐号没有跳转能力）'
    },
    {
      label: '模版内容',
      prop: 'data',
      type: 'dynamic',
      hide: true,
      span: 24,
      rules: [{
        required: true,
        message: '请输入模版内容',
        trigger: 'blur'
      }],
      children: {
        align: 'center',
        headerAlign: 'center',
        column: [{
          label: '名称',
          prop: 'name',
          rules: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }]
        },{
          label: '颜色',
          prop: 'color',
          type: 'color',
          colorFormat: 'hex',
          showAlpha: false
        },{
          label: '对应值',
          prop: 'value',
          rules: [{
            required: true,
            message: '请输入对应值',
            trigger: 'blur'
          }]
        }
        ]
      }
    },
    {
      label: '小程序',
      prop: 'appid',
      bind: 'miniProgram.appid',
      type: 'select',
      props: {
        label: 'name',
        value: 'id'
      },
      dicUrl: '/weixin/wxapp/list?appType=1',
      tip: '用户点击模板信息将跳转到该小程序的相应页面（该小程序appid必须与发模板消息的公众号是绑定关联关系）'
    },
    {
      label: '小程序页面',
      prop: 'pagePath',
      bind: 'miniProgram.pagePath',
      tip: '所需跳转到小程序的具体页面路径，支持带参数,（示例pages/order/order-detail/index?id=88），要求该小程序已发布，暂不支持小游戏'
    },
    {
      label: '用户',
      prop: 'toUser',
      span: 24,
      slot: true
    },
  ]
}
