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
  labelWidth: 150,
  column: [
    {
      label: 'mailSmtpHost',
      prop: 'mailSmtpHost',
      rules: [{
        required: true,
        message: 'mailSmtpHost不能为空',
        trigger: 'blur'
      }]
    },{
      label: 'mailSmtpUsername',
      prop: 'mailSmtpUsername',
      rules: [{
        required: true,
        message: 'mailSmtpUsername不能为空',
        trigger: 'blur'
      }]
    },{
      label: 'mailSmtpPassword',
      prop: 'mailSmtpPassword',
      rules: [{
        required: true,
        message: 'mailSmtpPassword不能为空',
        trigger: 'blur'
      }]
    },{
      label: 'siteName',
      prop: 'siteName',
      rules: [{
        required: true,
        message: 'siteName不能为空',
        trigger: 'blur'
      }]
    }
  ]
}
