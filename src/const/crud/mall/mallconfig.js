/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
export const tableOption = {
  dialogDrag: false,
  border: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  menuType: 'text',
  searchShow: false,
  viewBtn: true,
  searchMenuSpan: 6,
  labelWidth: 200,
  column: [
    {
      label: '回调地址域名',
      prop: 'notifyHost',
      span: 24,
      display: true,
      rules: [
        {
          required: true,
          message: '请输入回调地址域名',
          trigger: 'blur'
        },
        {
          max: 200,
          message: '长度在不能超过200个字符'
        },
      ],
      labelTip: '支付、物流回调地址，即后台的外网地址，要保证外网能访问'
    },{
      label: '快递100授权key',
      prop: 'logisticsKey',
      span: 24,
      display: true,
      rules: [
        {
          required: true,
          message: '请输入快递100授权key',
          trigger: 'blur'
        },
        {
          max: 200,
          message: '长度在不能超过200个字符'
        },
      ],
      labelTip: '快递100授权key'
    },{
      label: '商城用户默认头像',
      prop: 'userDefaultAvatar',
      span: 24,
      display: true,
      slot: true,
      rules: [
        {
          required: true,
          message: '请输入用户默认头像',
          trigger: 'blur'
        },
        {
          max: 200,
          message: '长度在不能超过1000个字符'
        },
      ],
      labelTip: '商城用户默认头像'
    }
  ]
}
